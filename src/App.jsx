import { Routes, Route, Navigate } from 'react-router-dom';
import { useAddress } from '@thirdweb-dev/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Send from './pages/Send';
import Receive from './pages/Receive';
import Profile from './pages/Profile';
import History from './pages/History';
import ConnectWallet from './pages/ConnectWallet';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const address = useAddress();
  
  if (!address) {
    return <Navigate to="/connect" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/connect" element={<ConnectWallet />} />
        
        {/* Protected routes */}
        <Route path="/send" element={
          <ProtectedRoute>
            <Send />
          </ProtectedRoute>
        } />
                <Route path="/receive" element={
          <ProtectedRoute>
            <Receive />
          </ProtectedRoute>
        } />
        
        {/* <Route path="/history" element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        } /> */}
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;