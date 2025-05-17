import React from 'react';
import { 
  useMetamask, 
  useCoinbaseWallet, 
  useWalletConnect, 
  useDisconnect,
  useAddress
} from '@thirdweb-dev/react';
import { motion } from 'framer-motion';
import { Wallet, AlertCircle } from 'lucide-react';

//added 
interface WalletConnectProps {
  onClick: () => void;
}



  const connectWithMetamask = useMetamask();
  const connectWithCoinbase = useCoinbaseWallet();
  const connectWithWalletConnect = useWalletConnect();
  const disconnect = useDisconnect();
  const address = useAddress();

  const walletOptions = [
    {
      name: 'MetaMask',
      icon: '🦊',
      color: 'from-orange-500 to-yellow-500',
      connectFunction: () => connectWithMetamask()
    },
    {
      name: 'Coinbase Wallet',
      icon: '🔵',
      color: 'from-blue-500 to-blue-600',
      connectFunction: () => connectWithCoinbase()
    },
    {
      name: 'WalletConnect',
      icon: '🔗',
      color: 'from-blue-400 to-indigo-600',
      connectFunction: () => connectWithWalletConnect()
    }
  ];

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  //added
   const WalletConnect: React.FC<WalletConnectProps> = ({ onClick }) => 
  {

  return (
    <div className="glass-card p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">Connect Your Wallet</h2>
      
      {!address ? (
        <>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary-500/10 rounded-full mb-3">
              <Wallet size={24} className="text-primary-400" />
            </div>
            <p className="text-gray-300">
              Connect your wallet to start sending and receiving funds on the Base network.
            </p>
          </div>
          
          <div className="space-y-3">
            {walletOptions.map((wallet) => (
              <motion.button
                key={wallet.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={wallet.connectFunction}
                className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${wallet.color} flex items-center justify-between text-white font-medium`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl">{wallet.icon}</span>
                  <span>Connect with {wallet.name}</span>
                </span>
                <span className="text-white/70">→</span>
              </motion.button>
            ))}
          </div>

          <div className="mt-6 p-3 rounded-lg bg-dark-600 flex items-start gap-3">
            <AlertCircle size={18} className="text-warning-400 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300">
              Always make sure you're connecting to the official site. Never share your recovery phrase with anyone.
            </p>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="mb-4 p-4 bg-success-500/10 rounded-lg inline-block">
            <div className="w-16 h-16 rounded-full bg-success-500/20 flex items-center justify-center mx-auto">
              <span className="text-2xl">✓</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-success-400 mb-2">
            Successfully Connected
          </h3>
          <p className="text-gray-300 mb-4">
            {truncateAddress(address)}
          </p>
          <button
            onClick={() => disconnect()}
            className="btn-secondary w-full"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;