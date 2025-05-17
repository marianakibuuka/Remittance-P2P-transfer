import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { ThirdwebProvider } from '@thirdweb-dev/react';

import { ThirdwebProvider, coinbaseWallet, metamaskWallet, walletConnect } from '@thirdweb-dev/react';

import { ToastContainer } from 'react-toastify';
import App from './App';
import './index.css';

import 'react-toastify/dist/ReactToastify.css';
import { createThirdwebClient } from "thirdweb";
 
// const client = createThirdwebClient({
//   // use `secretKey` for server side or script usage
//   secretKey: process.env.THIRDWEB_SECRET_KEY,

  const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID
  // console.log("ClientId:", import.meta.env.VITE_THIRDWEB_CLIENT_ID);
});




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
       activeChain = { activeChain }
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}

      // clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID || ""}

       clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}
      authConfig={{
        authUrl: "/api/auth", // Needed for embedded wallets
        domain: process.env.VITE_AUTH_DOMAIN || "http://localhost:5173",
      }}
    >
      <BrowserRouter>
        <App />
        <ToastContainer position="bottom-right" theme="dark" />
      </BrowserRouter>
    </ThirdwebProvider>
  </StrictMode>
);