import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAddress, useDisconnect } from '@thirdweb-dev/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, Send, QrCode, User, Menu, X, LogOut, Wallet } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const address = useAddress();
  const disconnect = useDisconnect();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: <ArrowRightLeft size={20} /> },
    { path: '/send', label: 'Send', icon: <Send size={20} /> },
    { path: '/receive', label: 'Receive', icon: <QrCode size={20} /> },
    //{ path: '/history', label: 'History', icon: <Clock size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-dark-900/80 border-b border-dark-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg">
            <ArrowRightLeft size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
            GoRemit
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 
                ${location.pathname === link.path ? 'bg-primary-500/10 text-primary-400' : 'text-gray-400 hover:text-white'}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Wallet Connection Status */}
        <div className="hidden md:flex items-center gap-2">
          {address ? (
            <div className="flex items-center gap-2">
              <span className="glass-card py-2 px-4 text-sm">
                {formatAddress(address)}
              </span>
              <button 
                onClick={() => disconnect()}
                className="btn-secondary py-2 px-3 flex items-center gap-1"
              >
                <LogOut size={16} />
                <span>Disconnect</span>
              </button>
            </div>
          ) : (
            <Link to="/connect" className="btn-primary flex items-center gap-2">
              <Wallet size={18} />
              <span>Connect Wallet</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-white p-1 rounded-md hover:bg-dark-700"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-800 border-b border-dark-700"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {address ? (
                <div className="flex justify-between items-center py-2 px-4 glass-card mb-2">
                  <span className="text-sm text-gray-300">{formatAddress(address)}</span>
                  <button 
                    onClick={() => disconnect()}
                    className="text-error-400 flex items-center gap-1 text-sm font-medium"
                  >
                    <LogOut size={14} />
                    <span>Disconnect</span>
                  </button>
                </div>
              ) : (
                <Link 
                  to="/connect" 
                  className="btn-primary flex justify-center items-center gap-2 mb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Wallet size={18} />
                  <span>Connect Wallet</span>
                </Link>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 
                    ${location.pathname === link.path ? 'bg-primary-500/10 text-primary-400' : 'text-gray-400 hover:text-white'}`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark-900/80 backdrop-blur-md border-t border-dark-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-1.5 rounded-md">
              <ArrowRightLeft size={16} className="text-white" />
            </div>
            <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
              GoRemit
            </span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
             Next-gen transfers, <span className="text-primary-400">Fueled by</span> Base
            </p>
            <p className="text-xs text-gray-500 mt-1">
              &copy; {new Date().getFullYear()} GoRemit. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;