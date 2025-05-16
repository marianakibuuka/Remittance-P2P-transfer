import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './index.css';

import 'react-toastify/dist/ReactToastify.css';

//Base network configuration
const activeChain = {
  chainId: 8453, // Base Mainnet
  rpc: ["https://mainnet.base.org"],
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  shortName: "base",
  slug: "base",
  testnet: false,
  chain: "Base",
};
  
// const activeChain = {
//   chainId: 84532, // Base Sepolia Chain ID
//   rpc: ["https://sepolia.base.org"], // Base Sepolia RPC URL
//   nativeCurrency: {
//     name: "Ethereum",
//     symbol: "ETH",
//     decimals: 18,
//   },
//   shortName: "base-sepolia",
//   slug: "base-sepolia",
//   testnet: true, // Marked as testnet
//   chain: "Base Sepolia", // Updated chain name
// };

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID || ""}
    >
      <BrowserRouter>
        <App />
        <ToastContainer position="bottom-right" theme="dark" />
      </BrowserRouter>
    </ThirdwebProvider>
  </StrictMode>
);
