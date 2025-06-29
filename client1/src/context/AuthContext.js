import { createContext, useContext, useEffect, useState } from 'react'; import axios from 'axios'; import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); const [token, setToken] = useState(localStorage.getItem('token')); const navigate = useNavigate();

    useEffect(() => { if (token) { axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; fetchUser(); } else { delete axios.defaults.headers.common['Authorization']; } }, [token]);

    const fetchUser = async () => { try { const res = await axios.get('/auth/user'); setUser(res.data); } catch (err) { logout(); } };

    const login = (token) => { localStorage.setItem('token', token); setToken(token); navigate('/'); };

    const logout = () => { localStorage.removeItem('token'); setToken(null); setUser(null); navigate('/login'); };

    return (<AuthContext.Provider value={{ user, token, login, logout }}>
        {children}     </AuthContext.Provider>);
};

export const useAuth = () => useContext(AuthContext);
