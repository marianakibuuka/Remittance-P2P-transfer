import React, { useState, useEffect } from 'react';
import { useAddress, useSDK } from '@thirdweb-dev/react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ExternalLink, 
  Filter,
  Loader2
} from 'lucide-react';

// Mock transaction data - would be replaced with actual API/SDK calls
interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: string;
  timestamp: number;
  address: string;
  status: 'pending' | 'confirmed' | 'failed';
  txHash: string;
}

const History: React.FC = () => {
  const address = useAddress();
  const sdk = useSDK();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all');

  useEffect(() => {
    if (!address) return;
    
    // Mock API call to fetch transactions
    // In a real implementation, this would be replaced with actual SDK/API calls
    const fetchTransactions = async () => {
      setIsLoading(true);
      
      // Simulating API delay
      setTimeout(() => {
        // Mock data
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            type: 'sent',
            amount: '0.05',
            timestamp: Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
            address: '0x1234...5678',
            status: 'confirmed',
            txHash: '0xabcd1234...'
          },
          {
            id: '2',
            type: 'received',
            amount: '0.1',
            timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
            address: '0x5678...9012',
            status: 'confirmed',
            txHash: '0xefgh5678...'
          },
          {
            id: '3',
            type: 'sent',
            amount: '0.02',
            timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
            address: '0x9012...3456',
            status: 'failed',
            txHash: '0xijkl9012...'
          },
          {
            id: '4',
            type: 'received',
            amount: '0.15',
            timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
            address: '0x3456...7890',
            status: 'confirmed',
            txHash: '0xmnop3456...'
          },
          {
            id: '5',
            type: 'sent',
            amount: '0.08',
            timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
            address: '0x7890...1234',
            status: 'pending',
            txHash: '0xqrst7890...'
          }
        ];
        
        setTransactions(mockTransactions);
        setIsLoading(false);
      }, 1500);
    };
    
    fetchTransactions();
    
    // In a real implementation, you would fetch transaction history from the blockchain
    // This could involve using TheGraph, etherscan API, or directly querying events from the contracts
  }, [address, sdk]);

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
        <p className="text-gray-300">
          View and track all your transactions on the Base network
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-primary-400" />
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
          </div>
          
          <div className="flex items-center gap-2 bg-dark-800 p-1 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${filter === 'all' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('sent')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${filter === 'sent' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Sent
            </button>
            <button
              onClick={() => setFilter('received')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${filter === 'received' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Received
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={40} className="text-primary-400 animate-spin mb-4" />
            <p className="text-gray-300">Loading transaction history...</p>
          </div>
        ) : filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-600">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Address</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <motion.tr 
                    key={tx.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-dark-700 hover:bg-dark-700/50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {tx.type === 'sent' ? (
                          <>
                            <div className="p-1.5 rounded-full bg-warning-500/20">
                              <ArrowUpRight size={14} className="text-warning-400" />
                            </div>
                            <span>Sent</span>
                          </>
                        ) : (
                          <>
                            <div className="p-1.5 rounded-full bg-success-500/20">
                              <ArrowDownLeft size={14} className="text-success-400" />
                            </div>
                            <span>Received</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium">
                      {tx.amount} ETH
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      {formatAddress(tx.address)}
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      {formatDate(tx.timestamp)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`status-badge ${
                        tx.status === 'confirmed' ? 'status-success' : 
                        tx.status === 'pending' ? 'status-pending' : 
                        'status-failed'
                      }`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <a 
                        href={`https://basescan.org/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 flex items-center gap-1"
                      >
                        <ExternalLink size={14} />
                        <span>View</span>
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="p-4 bg-dark-700 rounded-full inline-flex items-center justify-center mb-4">
              <Filter size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No transactions found</h3>
            <p className="text-gray-400">
              {filter === 'all' 
                ? "You don't have any transactions yet" 
                : `You don't have any ${filter} transactions`}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default History;