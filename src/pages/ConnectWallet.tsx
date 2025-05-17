import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddress, useConnectionStatus, useConnect } from '@thirdweb-dev/react';
import { metamaskWallet, coinbaseWallet, walletConnect } from '@thirdweb-dev/react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe } from 'lucide-react';
import { toast } from 'react-toastify';

const ConnectWallet: React.FC = () => {
  const navigate = useNavigate();
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const connect = useConnect();

  React.useEffect(() => {
    if (connectionStatus === "connected" && address) {
      navigate('/send');
    }
  }, [connectionStatus, address, navigate]);

  const handleConnect = async (walletType: string) => {
    try {
      switch(walletType) {
        case 'metamask':
          await connect(metamaskWallet());
          break;
        case 'coinbase':
          await connect(coinbaseWallet());
          break;
        case 'walletconnect':
          await connect(walletConnect());
          break;
        default:
          throw new Error('Unknown wallet type');
      }
      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Failed to connect wallet");
    }
  };

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
          <div className="w-full max-w-md glass-card p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Connect Your Wallet</h2>
            
            {/* MetaMask Button */}
            <button
              onClick={() => handleConnect('metamask')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mb-3"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                alt="MetaMask" 
                className="w-6 h-6"
              />
              Connect with MetaMask
            </button>
            
            {/* Coinbase Wallet Button */}
            {/* <button
              onClick={() => handleConnect('coinbase')}
              className="w-full bg-[#2b66fa] hover:bg-[#2151d5] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mb-3"
            >
              <img 
                src="https://altcoinsbox.com/wp-content/uploads/2023/04/coinbase-wallet-logo.png" 
                alt="Coinbase Wallet" 
                className="w-6 h-6"
              />
              Connect with Coinbase Wallet
            </button>
            
            {/* WalletConnect Button */}
            {/* <button
              onClick={() => handleConnect('walletconnect')}
              className="w-full bg-[#3b99fc] hover:bg-[#2d7dd2] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mb-3"
            >
              <img 
                src="https://altcoinsbox.com/wp-content/uploads/2023/04/walletconnect-logo.png" 
                alt="WalletConnect" 
                className="w-6 h-6"
              />
              Connect with WalletConnect
            </button> */}  

            <button
              onClick={() => handleConnect('coinbase')}
              className="w-full bg-[#2b66fa] hover:bg-[#2151d5] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mb-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#0052FF"/>
                <path d="M14.0002 7.4668L7.4668 14.0002L14.0002 20.5336L20.5336 14.0002L14.0002 7.4668Z" fill="white"/>
                <path d="M14.0002 5.6001L5.6001 14.0002L14.0002 22.4003L22.4003 14.0002L14.0002 5.6001Z" fill="white"/>
                <path d="M14.0002 3.7334L3.7334 14.0002L14.0002 24.267L24.267 14.0002L14.0002 3.7334Z" fill="white"/>
              </svg>
              Connect with Coinbase Wallet
            </button>
            
            {/* WalletConnect Button */}
            <button
              onClick={() => handleConnect('walletconnect')}
              className="w-full bg-[#3b99fc] hover:bg-[#2d7dd2] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mb-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#3B99FC"/>
                <path d="M12.5 10.5C17.5 7.5 23 7 23 7C23 7 24 11.5 21.5 14.5C19.5 17 16 18 16 18C16 18 19 19.5 20.5 22C22.5 25 21 29 21 29C21 29 15.5 28.5 10.5 24.5C5.5 20.5 5 13 5 13C5 13 7.5 13.5 12.5 10.5Z" fill="white"/>
                <path d="M12.5 21.5C14.5 23.5 16 24 16 24C16 24 13.5 22.5 12 20C10.5 17.5 11 14 11 14C11 14 10.5 19.5 12.5 21.5Z" fill="#3B99FC"/>
              </svg>
              Connect with WalletConnect
            </button>
            <p className="text-sm text-gray-400 mt-4 text-center">
              By connecting, you agree to our Terms of Service
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConnectWallet;