import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/login.jsx'; 
import AlfaMtc from './pages/alfa-mtc.jsx';
import Printing from './pages/printing.jsx';
import ItSupport from './pages/it-support.jsx';
import Accessories from './pages/accessories.jsx';
import Profile from './pages/Profile.jsx';
import Register from './pages/Register.jsx';
import Setting from './pages/Setting.jsx';

// 🔒 THE SHIELD: Protected Route cross-refresh session keeper
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const storedUsername = localStorage.getItem('username');
  
  // Eza mānno 3amel login, mechanical back lal login screen gateway
  if (!isLoggedIn || !storedUsername) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// 🔓 Public Route Guard: Prevents logged-in users from seeing login/register again
const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const storedUsername = localStorage.getItem('username');

  // Eza dejà active, kick direct back to Home screen dashboard
  if (isLoggedIn && storedUsername) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        
        {/* 🚀 1. ROUTES L-PROTECTED: Mafi zboun fiyé y-shoufhon aw ye-shteré mennouwiye eza mānno login! */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/alfa-mtc" element={<ProtectedRoute><AlfaMtc /></ProtectedRoute>} />
        <Route path="/printing" element={<ProtectedRoute><Printing /></ProtectedRoute>} />
        <Route path="/it-support" element={<ProtectedRoute><ItSupport /></ProtectedRoute>} />
        <Route path="/accessories" element={<ProtectedRoute><Accessories /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
        
{/* 🔓 3. ROUTES L-PUBLIC: Accessible bass eza l-session is logged out */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* 🔄 4. FALLBACK CATCHER: Dynamic route slip back to core layout */}
        <Route path="*" element={<Navigate to="/" replace />} />
      
      </Routes>
    </Router>
  );
}