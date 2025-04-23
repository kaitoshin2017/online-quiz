import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import { getCurrentUser } from './services/authService';

function App() {
  const PrivateRoute = ({ children }) => {
    const user = getCurrentUser();
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App; 