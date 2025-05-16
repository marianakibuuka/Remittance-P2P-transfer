// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title BaseRemit
 * @dev A simple remittance contract for Base Network payments
 */
contract BaseRemit {
    // Events
    event PaymentSent(address indexed from, address indexed to, uint256 amount, string message, uint256 timestamp);
    event PaymentReceived(address indexed from, address indexed to, uint256 amount, uint256 timestamp);
    
    // Struct to store payment details
    struct Payment {
        address sender;
        address recipient;
        uint256 amount;
        string message;
        uint256 timestamp;
        bool completed;
    }
    
    // Mapping to track all payments
    mapping(bytes32 => Payment) public payments;
    
    // Array to store all payment IDs for a user
    mapping(address => bytes32[]) public userPayments;
    
    /**
     * @dev Send a payment to a recipient with an optional message
     * @param _recipient The address of the payment recipient
     * @param _message An optional message to include with the payment
     */
    function sendPayment(address _recipient, string memory _message) external payable {
        require(_recipient != address(0), "Invalid recipient address");
        require(msg.value > 0, "Amount must be greater than 0");
        require(_recipient != msg.sender, "Cannot send payment to yourself");
        
        // Generate a unique payment ID
        bytes32 paymentId = keccak256(abi.encodePacked(msg.sender, _recipient, msg.value, block.timestamp));
        
        // Store payment details
        payments[paymentId] = Payment({
            sender: msg.sender,
            recipient: _recipient,
            amount: msg.value,
            message: _message,
            timestamp: block.timestamp,
            completed: false
        });
        
        // Track payment for both sender and recipient
        userPayments[msg.sender].push(paymentId);
        userPayments[_recipient].push(paymentId);
        
        // Complete the payment immediately
        payments[paymentId].completed = true;
        
        // Send funds to recipient
        (bool sent, ) = payable(_recipient).call{value: msg.value}("");
        require(sent, "Failed to send payment");
        
        // Emit events
        emit PaymentSent(msg.sender, _recipient, msg.value, _message, block.timestamp);
        emit PaymentReceived(msg.sender, _recipient, msg.value, block.timestamp);
    }
    
    /**
     * @dev Get payment count for a user
     * @param _user The address of the user
     * @return The number of payments associated with the user
     */
    function getPaymentCount(address _user) external view returns (uint256) {
        return userPayments[_user].length;
    }
    
    /**
     * @dev Get payment details by ID
     * @param _paymentId The unique ID of the payment
     * @return Payment details including sender, recipient, amount, message, timestamp, and completion status
     */
    function getPaymentDetails(bytes32 _paymentId) external view returns (
        address sender,
        address recipient,
        uint256 amount,
        string memory message,
        uint256 timestamp,
        bool completed
    ) {
        Payment memory payment = payments[_paymentId];
        return (
            payment.sender,
            payment.recipient,
            payment.amount,
            payment.message,
            payment.timestamp,
            payment.completed
        );
    }
    
    /**
     * @dev Get a list of payment IDs for a user
     * @param _user The address of the user
     * @param _start The starting index
     * @param _limit The maximum number of IDs to return
     * @return An array of payment IDs
     */
    function getUserPayments(address _user, uint256 _start, uint256 _limit) external view returns (bytes32[] memory) {
        uint256 total = userPayments[_user].length;
        
        if (_start >= total) {
            return new bytes32[](0);
        }
        
        uint256 end = _start + _limit;
        if (end > total) {
            end = total;
        }
        
        uint256 resultLength = end - _start;
        bytes32[] memory result = new bytes32[](resultLength);
        
        for (uint256 i = 0; i < resultLength; i++) {
            result[i] = userPayments[_user][_start + i];
        }
        
        return result;
    }
    
    /**
     * @dev Receive function to accept ETH payments
     */
    receive() external payable {
        emit PaymentReceived(msg.sender, address(this), msg.value, block.timestamp);
    }
}
//contract address..0xA669AeCE1A07A89F4BF76079c9CCd86fEA291613
//contract address..0x1d10E2239c95468c5e9154633132C97e0858Fe19 (mainnet)