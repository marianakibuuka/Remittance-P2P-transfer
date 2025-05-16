import React, { useState, useEffect } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  QrCode, 
  Copy, 
  Share2, 
  Download, 
  CreditCard,
  Wallet
} from 'lucide-react';

const Receive: React.FC = () => {
  const address = useAddress();
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  useEffect(() => {
    // Create payment link when address, amount or message changes
    if (address) {
      let link = `https://baseremit.app/pay?to=${address}`;
      if (amount) link += `&amount=${amount}`;
      if (message) link += `&message=${encodeURIComponent(message)}`;
      setPaymentLink(`URL:${link}`); //ENSURES  QR SCANNERS TREAT IT AS CLICKABLE
    } else {
      setPaymentLink('');
    }
    
  }, [address, amount, message]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Share functionality
  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Remittance Payment Request',
        text: `Send me ${amount ? amount + ' ETH' : 'crypto'} on Base Network${message ? ': ' + message : ''}`,
        url: paymentLink,
      })
      .catch((error) => {
        console.error('Error sharing', error);
        toast.error('Could not share the payment link');
      });
    } else {
      copyToClipboard(paymentLink);
      toast.info('Share not supported, link copied to clipboard instead!');
    }
  };

  // // Download QR code
  // const downloadQRCode = () => {
  //   const canvas = document.querySelector('#qr-code canvas') as HTMLCanvasElement;
  //   if (!canvas) return;

  //   const pngUrl = canvas.toDataURL('image/png');
  //   const downloadLink = document.createElement('a');
  //   downloadLink.href = pngUrl;
  //   downloadLink.download = 'baseremit-payment.png';
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  //   toast.success("QR code downloaded successfully!");
  // };

   const downloadQRCode = () => {
  const svgElement = document.querySelector('#qr-code svg');
  if (!svgElement) return;

  const serializer = new XMLSerializer();
  const svgBlob = new Blob(
    [serializer.serializeToString(svgElement)], 
    { type: 'image/svg+xml' }
  );
  
  const url = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'baseremit-payment.svg'; // Save as SVG
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
  toast.success("QR code downloaded as SVG!");
};

   
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">Receive Payment</h1>
        <p className="text-gray-300">
          Share your wallet address or create a custom payment request
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-primary-400" />
              <span>Payment Details</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="wallet-address" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Wallet Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="wallet-address"
                    value={address || ''}
                    readOnly
                    className="input-field w-full pr-12"
                  />
                  <button
                    onClick={() => address && copyToClipboard(address)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-300"
                    title="Copy address"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
                  Request Amount (Optional)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    step="0.0001"
                    min="0.0001"
                    className="input-field w-full pr-16"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span className="text-gray-400">ETH</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a message for the sender..."
                  className="input-field w-full resize-none h-20"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Share Payment Request</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => address && copyToClipboard(address)}
                className="btn-secondary py-2 px-4 flex items-center gap-2"
              >
                <Copy size={16} />
                <span>Copy Address</span>
              </button>
              
              <button 
                onClick={() => copyToClipboard(paymentLink)}
                className="btn-secondary py-2 px-4 flex items-center gap-2"
              >
                <Copy size={16} />
                <span>Copy Link</span>
              </button>
              
              <button 
                onClick={shareLink}
                className="btn-secondary py-2 px-4 flex items-center gap-2"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 flex flex-col"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"> 
            <QrCode size={20} className="text-primary-400" />
            <span>QR Code</span>
          </h2>

          <div className="flex-1 flex flex-col items-center justify-center">
            {address ? (
              <div id="qr-code" className="bg-white p-4 rounded-lg mb-4">
           0     <QRCodeSVG
                  value={paymentLink}
                  size={200}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                />
              </div>

            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-full bg-dark-600 flex items-center justify-center mb-4">
                  <Wallet size={36} className="text-gray-400" />
                </div>
                <p className="text-gray-300">
                  Connect your wallet to generate a QR code
                </p>
              </div>
            )}
            
            {address && (
              <button 
                onClick={downloadQRCode}
                className="btn-primary flex items-center gap-2"
              >
                <Download size={18} />
                <span>Download QR Code</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card p-6 mt-8"
      >
        <h2 className="text-xl font-semibold mb-4">Payment Instructions</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          <li>Share your wallet address or QR code with the sender</li>
          <li>Sender can scan the QR code or manually enter your address in their wallet</li>
          <li>Once the transaction is confirmed, the funds will appear in your wallet</li>
          {/* <li>You can view the transaction history in the History tab</li> */}
        </ol>
      </motion.div>
    </div>
  );
};

export default Receive;