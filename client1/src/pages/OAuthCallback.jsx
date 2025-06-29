import { useEffect } from 'react'; import { useLocation, useNavigate } from 'react-router-dom'; import { useAuth } from '../context/AuthContext';

const OAuthCallback = () => {
    const location = useLocation(); const navigate = useNavigate(); const { login } = useAuth();

    useEffect(() => { const params = new URLSearchParams(location.search); const token = params.get('token'); if (token) { login(token); } else { navigate('/login'); } }, [location, login, navigate]);

    return null;
};

export default OAuthCallback;