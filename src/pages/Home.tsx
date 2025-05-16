import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Send, 
  QrCode, 
  Globe, 
  Zap, 
  Shield, 
  //Clock, 
  ArrowRight 
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-8 md:py-16 text-center"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-300 to-accent-400"
        >
          Remittances made<br />on Base Network
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
        >
          Send and receive crypto payments globally with minimal fees and 
          lightning-fast transactions. Powered by Base Network.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/send" className="btn-primary flex items-center justify-center gap-2">
            <Send size={20} />
            <span>Send Money</span>
          </Link>
          <Link to="/receive" className="btn-accent flex items-center justify-center gap-2">
            <QrCode size={20} />
            <span>Receive Money</span>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose GoRemit?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our platform offers several advantages over traditional remittance services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Globe className="text-primary-400" size={32} />,
              title: "Global Reach",
              description: "Send money to anyone, anywhere in the world without traditional banking limitations"
            },
            {
              icon: <Zap className="text-warning-400" size={32} />,
              title: "Fast & Low Cost",
              description: "Transactions are processed in seconds with minimal fees on the Base network"
            },
            {
              icon: <Shield className="text-success-400" size={32} />,
              title: "Secure Transfers",
              description: "Blockchain technology ensures your transactions are secure and tamper-proof"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 flex flex-col items-center text-center"
            >
              <div className="p-3 bg-dark-600 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Sending money with GoRemit is simple and straightforward.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Connect Wallet",
              description: "Connect your crypto wallet to get started"
            },
            {
              step: "02",
              title: "Enter Details",
              description: "Specify amount and recipient address"
            },
            {
              step: "03",
              title: "Send Instantly",
              description: "Confirm and complete your transaction in seconds"
            }
          ].map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card p-6">
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-primary-500 to-accent-500 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 mt-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="text-primary-500" size={24} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/connect" className="btn-primary inline-flex items-center gap-2">
            <span>Get Started</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Transaction Stats */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="py-12"
      >
        <div className="glass-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { value: "2.1s", label: "Average Transaction Time" },
              { value: "< $0.01", label: "Average Fee Per Transaction" },
              { value: "100%", label: "Secure Transactions" }
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="py-12 mb-8"
      >
        <div className="glass-card p-8 bg-gradient-to-br from-primary-900/50 to-dark-800">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of users already enjoying fast, secure cross-border payments on the Base network.
            </p>
            <Link to="/connect" className="btn-primary inline-flex items-center gap-2">
              <span>Connect Your Wallet</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;