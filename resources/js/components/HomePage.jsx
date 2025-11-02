import { Link } from 'react-router-dom';

export default function HomePage() {
    const token = localStorage.getItem('token');

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl font-extrabold mb-4 text-gray-800">Uncinc Assessment</h1>
            <p className="text-lg text-gray-600 mb-8">
                Beheer artikelen snel en eenvoudig. Login om artikelen toe te voegen of bewerk ze direct.
            </p>
            <div className="flex gap-4">
                {!token && (
                    <Link
                        to="/login"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
                    >
                        Login
                    </Link>
                )}
                <Link
                    to="/articles"
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700 transition"
                >
                    Bekijk Artikelen
                </Link>
            </div>
        </div>
    );
}
