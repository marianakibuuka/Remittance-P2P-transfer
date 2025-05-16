import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddress, useConnectionStatus } from '@thirdweb-dev/react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe } from 'lucide-react';
import WalletConnect from '../components/WalletConnect';

const ConnectWallet: React.FC = () => {
  const navigate = useNavigate();
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  
  React.useEffect(() => {
    if (connectionStatus === "connected" && address) {
      navigate('/send');
    }
  }, [connectionStatus, address, navigate]);

  const benefits = [
    {
      icon: <Globe size={24} className="text-primary-400" />,
      title: "Global Remittance",
      description: "Send money across borders without traditional banking limitations"
    },
    {
      icon: <Zap size={24} className="text-warning-400" />,
      title: "Fast & Low Cost",
      description: "Transactions on Base network are quick and have minimal fees"
    },
    {
      icon: <Shield size={24} className="text-success-400" />,
      title: "Secure Transfers",
      description: "All transactions are secured by blockchain technology"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400"
          >
            Borderless Payments Made Simple
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-300 mb-8"
          >
            Connect your wallet to start sending and receiving payments across borders with minimal fees on the Base network.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                className="flex items-start gap-4 p-4 glass-card"
              >
                <div className="bg-dark-600 p-2 rounded-lg">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-medium text-white">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <WalletConnect />
        </motion.div>
      </div>
    </div>
  );
};

export default ConnectWallet;