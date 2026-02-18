import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Chat from './pages/Chat';
import TrackOrder from './pages/TrackOrder';
import './App.css';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
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
  );
}

export default App;
