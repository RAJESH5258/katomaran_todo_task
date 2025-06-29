import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext'; 
import PrivateRoute from './components/PrivateRoute'; 
import Login from './pages/Login'; 
import Dashboard from './pages/Dashboard'; 
import OAuthCallback from './pages/OAuthCallback';

function App() { 
    return (
    <BrowserRouter>       
    <AuthProvider>         
    <Routes>           
    <Route path="/login" element={<Login />} />           
    <Route path="/oauth" element={<OAuthCallback />} />           
    <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />         
    </Routes>       
    </AuthProvider>     
    </BrowserRouter>); 
    }

export default App;
