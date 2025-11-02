import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import Toast from './Toast';
import { Suspense, lazy } from 'react';


const HomePage = lazy(() => import('./HomePage'));
const ArticlesPage = lazy(() => import('./Articles/Articles.jsx'));
const ArticleFormPage = lazy(() => import('./Articles/ArticleForm'));

export default function App() {
    const [token, setToken] = useState(null);
    const [toast, setToast] = useState({ message: '', type: 'success' });

    useEffect(() => {
        const savedToken = localStorage.getItem('token');

        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    return (
        <Router>
            <Navbar token={token} setToken={setToken} />

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: '', type: 'success' })}
            />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage setToken={setToken} />} />
                <Route path="/articles" element={<ArticlesPage token={token} setToast={setToast} />} />

                <Route
                    path="/articles/new"
                    element={
                        <PrivateRoute token={token}>
                            <ArticleFormPage token={token} setToast={setToast} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/articles/:id/edit"
                    element={
                        <PrivateRoute token={token}>
                            <ArticleFormPage token={token} isEdit={true} setToast={setToast} />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}
