import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Chat from './pages/Chat';
import TrackOrder from './pages/TrackOrder';
import { ShopProvider } from './context/ShopContext';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import './App.css';

function App() {
  return (
    <ShopProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <QuickViewModal />
        <CartDrawer />
        <WishlistDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/track-order" element={<TrackOrder />} />
          {/* Redirect category routes to shop */}
          <Route path="/skincare" element={<Navigate to="/shop" replace />} />
          <Route path="/makeup" element={<Navigate to="/shop" replace />} />
          <Route path="/haircare" element={<Navigate to="/shop" replace />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/blog" element={<Navigate to="/" replace />} />
          <Route path="/contact" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;
