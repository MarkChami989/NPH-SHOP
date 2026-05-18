import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/login.jsx'; 
import AlfaMtc from './pages/alfa-mtc.jsx';
import Printing from './pages/printing.jsx';
import ItSupport from './pages/it-support.jsx';
import Accessories from './pages/accessories.jsx';
import Profile from './pages/Profile.jsx';
import Register from './pages/login.jsx';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/alfa-mtc" element={<AlfaMtc />} />
        <Route path="/printing" element={<Printing />} />
        <Route path="/it-support" element={<ItSupport />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />

      
      </Routes>
    </Router>
  );
}