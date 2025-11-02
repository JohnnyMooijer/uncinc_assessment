import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ token, children }) {
    const storedToken = token || localStorage.getItem('token');
    if (!storedToken) return <Navigate to="/login" replace />;
    return children;
}
