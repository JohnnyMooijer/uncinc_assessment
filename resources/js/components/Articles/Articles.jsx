import {useState, useEffect} from 'react';
import axios from 'axios';
import {Edit, Trash2} from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';
import Toast from '../Toast';
import SearchInput from "../Form/SearchInput.jsx";
import ArticlesTable from "./ArticlesTable.jsx";

export default function ArticlesPage( {setToast}) {
    const navigate = useNavigate();

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get('/api/articles', {
                    params: {search: searchTerm},
                    headers: token ? {Authorization: `Bearer ${token}`} : {},
                });
                setArticles(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchArticles();
        }, 300);

        return () => clearTimeout(delayDebounceFn);

    }, [searchTerm, token]);

    const handleEdit = (id) => {
        navigate(`/articles/${id}/edit`);
    };

    const handleDelete = async (id) => {
        if (!confirm('Weet je zeker dat je dit artikel wilt verwijderen?')) return;

        try {
            await axios.delete(`/api/articles/${id}`, {
                headers: token ? {Authorization: `Bearer ${token}`} : {},
            });

            setArticles(prev => prev.filter(a => a.id !== id));

            setToast({message: 'Artikel verwijderd', type: 'success'});
        } catch (err) {
            setToast({
                message: err.response?.data?.message || 'Fout bij verwijderen artikel!',
                type: 'error'
            });
        }
    };

    if (loading) return <p className="text-center mt-10">Laden...</p>;

    return (

        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Artikelen</h1>
                {token && (
                    <button
                        onClick={() => navigate('/articles/new')}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Nieuw Artikel
                    </button>
                )}
            </div>

            <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Zoek op titel..."/>

            <ArticlesTable
                articles={articles}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
}
