import React, { useState } from 'react';
//import { useContractEvents } from "thirdweb/react";
import { parseEther, isAddress, formatEther} from 'ethers/lib/utils';
import { 
  useAddress, 
  useContract, 
  useContractWrite, 
  useSDK 
} from '@thirdweb-dev/react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  Send as SendIcon, 
  AlertCircle, 
  ArrowRightCircle, 
  Loader2, 
  CheckCircle2, 
  CopyCheck 
} from 'lucide-react';

const REMITTANCE_CONTRACT_ADDRESS = "0xA669AeCE1A07A89F4BF76079c9CCd86fEA291613";

interface TransactionFormData {
  recipient: string;
  amount: string;
  message: string;
}

const Send: React.FC = () => {
  const address = useAddress();
  const sdk = useSDK();
  const [formData, setFormData] = useState<TransactionFormData>({
    recipient: '',
    amount: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');

  const exchangeRates = {
    USD: 3100,
    EUR: 2900,
    GBP: 2500,
    JPY: 450000
  };

  const { contract } = useContract(
    "0x1d10E2239c95468c5e9154633132C97e0858Fe19",
     [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "PaymentReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "PaymentSent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "sendPayment",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getPaymentCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_paymentId",
				"type": "bytes32"
			}
		],
		"name": "getPaymentDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_start",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_limit",
				"type": "uint256"
			}
		],
		"name": "getUserPayments",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "payments",
		"outputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userPayments",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]);



  const { mutateAsync: sendPayment } = useContractWrite(contract, "sendPayment");

  const validateInputs = (): { amountInEth: number; amountInWei: string } => {
    // Validate recipient address
    if (!isAddress(formData.recipient)) {
      throw new Error("Invalid recipient address");
    }

    // Validate amount
    const amountInEth = parseFloat(formData.amount);
    if (isNaN(amountInEth)) {
      throw new Error("Please enter a valid number");
    }
    if (amountInEth <= 0) {
      throw new Error("Amount must be greater than 0");
    }
    if (amountInEth > 1000) {
      throw new Error("Amount cannot exceed 1000 ETH");
    }

    // Convert to wei
    let amountInWei: string;
    try {
      amountInWei = parseEther(formData.amount).toString();
    } catch (error) {
      throw new Error("Invalid amount format");
    }

    return { amountInEth, amountInWei };
  };

  const handleDirectTransfer = async () => {
    if (!sdk || !address) {
      throw new Error("Wallet not connected");
    }

    setIsLoading(true);
    try {
      const { amountInWei } = validateInputs();
      
      const tx = await sdk.wallet.transfer(
        formData.recipient,
        amountInWei
      );

      setTxHash(tx.receipt.transactionHash);
      setIsSuccess(true);
      toast.success("Payment sent successfully!");
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error(error instanceof Error ? error.message : "Transaction failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleContractPayment = async () => {
    if (!contract || !address) {
      throw new Error("Contract not available");
    }

    setIsLoading(true);
    try {
      const { amountInWei } = validateInputs();
      
      const data = await sendPayment({ 
        args: [formData.recipient, formData.message || ""],
        overrides: {
          value: amountInWei
        }
      });
      
      setTxHash(data.receipt.transactionHash);
      setIsSuccess(true);
      toast.success("Payment sent successfully!");
    } catch (error) {
      console.error("Contract payment error:", error);
      toast.error(error instanceof Error ? error.message : "Contract transaction failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      //checking if wallet has enough balance
    //   const balance = await sdk?.wallet.balance();
    // const amountInEth = parseFloat(formData.amount);
    // ` `
    // if (balance && balance.value.lt(parseEther(formData.amount))) {
    //   throw new Error("Insufficient balance");
    // }

     const { amountInWei } = validateInputs();

     // check balance
     const balance = await sdk?.wallet.balance();
     if (balance) {
      //compare BigNumbers Directly
      if (balance.value.lt(amountInWei)) {
        throw new Error (
          `Insufficient balance. You need ${formData.amount} ETH but only have ${
            formatEther(balance.value)
          } ETH`
        );

      }
     }
      if (contract) {
        await handleContractPayment();
      } else {
        await handleDirectTransfer();
      }
    } catch (error) {
     console.error("Transaction error:", error);
     toast.error(error instanceof Error ? error.message : "Transaction faled");
      // Errors are already handled in the respective functions
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // For amount input, validate it's a proper number
    if (name === 'amount') {
      // Allow empty string or valid numbers
      if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      recipient: '',
      amount: '',
      message: ''
    });
    setIsSuccess(false);
    setTxHash('');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const calculateFiatValue = () => {
    const amountInEth = parseFloat(formData.amount);
    if (isNaN(amountInEth)) return "0.00";
    return (amountInEth * exchangeRates.USD).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">Send Payment</h1>
        <p className="text-gray-300">
          Transfer funds to any wallet address on the Base network
        </p>
      </motion.div>

      {!isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-300 mb-1">
                Recipient Address
              </label>
              <input
                type="text"
                id="recipient"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                placeholder="0x..."
                className="input-field w-full"
                required
                pattern="^0x[a-fA-F0-9]{40}$"
                title="Enter a valid Ethereum address"
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
                Amount (ETH)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  inputMode="decimal"
                  placeholder="0.0"
                  className="input-field w-full pr-20"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-gray-400">ETH</span>
                </div>
              </div>
              {formData.amount && (
                <p className="mt-1 text-sm text-gray-400">
                  ≈ ${calculateFiatValue()} USD
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Add a message for the recipient..."
                className="input-field w-full resize-none h-24"
                maxLength={200}
              />
            </div>

            <div className="p-4 bg-dark-800 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-warning-400 shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300">
                <p className="font-medium text-warning-300 mb-1">Important</p>
                <p>Double-check the recipient address before sending. Blockchain transactions cannot be reversed once confirmed.</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !address}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <SendIcon size={20} />
                  <span>{address ? "Send Payment" : "Connect Wallet"}</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-success-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-success-400" />
            </div>
            <h2 className="text-2xl font-bold text-success-400 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-300">
              Your transaction has been submitted to the network
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-dark-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">Amount</span>
                <span className="font-medium">{formData.amount} ETH</span>
              </div>
              <div className="text-sm text-gray-400">
                ≈ ${calculateFiatValue()} USD
              </div>
            </div>

            <div className="bg-dark-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">Recipient</span>
                <button 
                  onClick={() => copyToClipboard(formData.recipient)}
                  className="text-primary-400 hover:text-primary-300 flex items-center gap-1"
                >
                  <CopyCheck size={14} />
                  <span className="text-xs">Copy</span>
                </button>
              </div>
              <div className="font-mono text-sm break-all">
                {formData.recipient}
              </div>
            </div>

            {txHash && (
              <div className="bg-dark-800 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Transaction Hash</span>
                  <button 
                    onClick={() => copyToClipboard(txHash)}
                    className="text-primary-400 hover:text-primary-300 flex items-center gap-1"
                  >
                    <CopyCheck size={14} />
                    <span className="text-xs">Copy</span>
                  </button>
                </div>
                <div className="font-mono text-sm break-all">
                  {txHash}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <a 
              href={`https://basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <span>View on Base Mainnet</span>
              <ArrowRightCircle size={18} />
            </a>
            <button
              onClick={resetForm}
              className="btn-primary flex-1"
            >
              Send Another
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Send;