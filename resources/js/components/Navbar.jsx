import {Link} from 'react-router-dom';

export default function Navbar({token, setToken}) {
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
                Uncinc Assessment
            </Link>

            <div className="space-x-4">
                {!token && (
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </Link>
                )}
                {token && (
                    <>
                        <Link
                            to="/articles"
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            Artikelen
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
