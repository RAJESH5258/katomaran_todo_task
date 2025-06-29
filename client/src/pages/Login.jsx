import { Button, Container, Typography } from '@mui/material'; import { Google, GitHub, Facebook } from '@mui/icons-material';

const Login = () => {
    const handleOAuthLogin = (provider) => { window.location.href = `http://localhost:5000/auth/${provider}`; };

    return (<Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>       <Typography variant="h4" gutterBottom>Todo App</Typography>       <Typography variant="body1" gutterBottom>Please sign in to continue</Typography>       <Button variant="contained" color="error" startIcon={<Google />} onClick={() => handleOAuthLogin('google')} sx={{ mt: 2, width: '100%' }}       >         Sign in with Google       </Button>              <Button variant="contained" color="inherit" startIcon={<GitHub />} onClick={() => handleOAuthLogin('github')} sx={{ mt: 2, width: '100%' }}       >         Sign in with GitHub       </Button>              <Button variant="contained" color="primary" startIcon={<Facebook />} onClick={() => handleOAuthLogin('facebook')} sx={{ mt: 2, width: '100%' }}       >         Sign in with Facebook       </Button>     </Container>);
}; export default Login; 