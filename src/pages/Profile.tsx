import React, { useState } from 'react';
import { useAddress, useDisconnect, useConnectionStatus, useBalance } from '@thirdweb-dev/react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  User,
  Copy,
  ExternalLink,
  LogOut,
  Wallet,
  Cog,
  Download,
  History,
  AlertCircle
} from 'lucide-react';

const Profile: React.FC = () => {
  const address = useAddress();
  const disconnect = useDisconnect();
  const connectionStatus = useConnectionStatus();
  const { data: balance } = useBalance();
  
  const [, setCopied] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Mock connected apps for demo purposes
  const connectedApps = [
    { name: "BaseSwap", url: "https://baseswap.fi", connectedAt: "2025-05-03" },
    { name: "Aerodrome", url: "https://aerodrome.finance", connectedAt: "2025-05-02" }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-300">
          Manage your wallet and preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Wallet Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 col-span-1 md:col-span-1"
        >
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary-500">
              <User size={40} className="text-primary-400" />
            </div>
            <h2 className="text-xl font-bold mb-1">Your Wallet</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm bg-dark-700 px-3 py-1 rounded-full text-gray-300">
                {connectionStatus === "connected" ? "Connected" : "Disconnected"}
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <code className="text-sm font-mono bg-dark-700 px-3 py-1.5 rounded-lg">
                {address ? formatAddress(address) : "Not connected"}
              </code>
              {address && (
                <button 
                  onClick={() => copyToClipboard(address)}
                  className="bg-dark-700 p-1.5 rounded-lg hover:bg-dark-600 transition-colors"
                >
                  <Copy size={16} className="text-primary-400" />
                </button>
              )}
            </div>
            
            {address && (
              <div className="flex flex-col gap-2">
                <a
                  href={`https://basescan.org/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-400 hover:text-primary-300 flex items-center justify-center gap-1"
                >
                  <ExternalLink size={14} />
                  <span>View on BaseScan</span>
                </a>
                <button
                  onClick={() => disconnect()}
                  className="btn-secondary py-2 flex items-center justify-center gap-2 mt-2"
                >
                  <LogOut size={16} />
                  <span>Disconnect Wallet</span>
                </button>
              </div>
            )}
          </div>

          {balance && (
            <div className="bg-dark-700 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Balance</span>
                <span className="font-medium text-lg">{parseFloat(balance.displayValue).toFixed(4)} {balance.symbol}</span>
              </div>
              <div className="bg-dark-600 w-full h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-primary-400 to-accent-400 h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {/* //<h3 className="text-sm font-medium text-gray-300 mb-2">Quick Actions</h3> */}
            {/* <button className="w-full text-left px-4 py-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors flex items-center gap-3">
              <div className="p-1.5 bg-dark-600 rounded-lg">
                <History size={16} className="text-primary-400" />
              </div>
              <span>View Transaction History</span>
            </button> */}
            {/* <button className="w-full text-left px-4 py-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors flex items-center gap-3">
              <div className="p-1.5 bg-dark-600 rounded-lg">
                <Download size={16} className="text-primary-400" />
              </div>
              <span>Export Transaction Data</span>
            </button> */}
            {/* <button className="w-full text-left px-4 py-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors flex items-center gap-3">
              <div className="p-1.5 bg-dark-600 rounded-lg">
                <Cog size={16} className="text-primary-400" />
              </div>
              <span>Settings</span>
            </button> */}
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card p-6 col-span-1 md:col-span-2"
        >
          {/* Connected Apps Section */}
          {/* <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wallet size={20} className="text-primary-400" />
              <span>Connected Applications</span>
            </h2>
            
            {connectedApps.length > 0 ? (
              <div className="space-y-4">
                {connectedApps.map((app, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-dark-700 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium mb-1">{app.name}</h3>
                      <p className="text-sm text-gray-400">Connected on {app.connectedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a 
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-dark-600 rounded-lg hover:bg-dark-500 transition-colors"
                      >
                        <ExternalLink size={16} className="text-primary-400" />
                      </a>
                      <button className="p-1.5 bg-dark-600 rounded-lg hover:bg-error-900 transition-colors">
                        <LogOut size={16} className="text-error-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-dark-700 rounded-lg">
                <p className="text-gray-400">No applications connected to your wallet</p>
              </div>
            )}
          </div> */}

          {/* Security Tips */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield size={20} className="text-primary-400" />
              <span>Security Tips</span>
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  title: "Never Share Your Private Keys",
                  desc: "Keep your recovery phrases and private keys secure. No legitimate service will ever ask for them."
                },
                {
                  title: "Verify Transaction Details",
                  desc: "Always double-check recipient addresses and transaction amounts before confirming."
                },
                {
                  title: "Use Hardware Wallets",
                  desc: "For larger amounts, consider using a hardware wallet for enhanced security."
                }
              ].map((tip, index) => (
                <div 
                  key={index}
                  className="p-4 bg-dark-700 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle size={20} className="text-warning-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-400">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;