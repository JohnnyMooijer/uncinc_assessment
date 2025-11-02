import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

export default function ArticleFormPage({token, setToast, isEdit = false, article = {}}) {
    const navigate = useNavigate();
    const {id} = useParams();

    const [title, setTitle] = useState(article.title || '');
    const [content, setContent] = useState(article.content || '');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(article.image_url || null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEdit && id) {
            axios.get(`/api/articles/${id}`)
                .then(res => {
                    setTitle(res.data.title);
                    setContent(res.data.content);
                    setImagePreview(res.data.image_url);
                })
                .catch(err => console.error(err));
        }
    }, [isEdit, id]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        if (isEdit) {
            formData.append('_method', 'PUT');
        }

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const url = isEdit ? `/api/articles/${id}` : '/api/articles';

            const res = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            setToast({
                message: isEdit ? 'Artikel bijgewerkt' : 'Artikel aangemaakt',
                type: 'success',
            });

            setErrors({});

            if (!isEdit && res.data.id) {
                navigate(`/articles/${res.data.id}/edit`);
            }
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors || {});
            } else {
                setToast({
                    message: err.response?.data?.message || err.message || 'Er ging iets mis.',
                    type: 'error',
                });
            }
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-6">
            <button
                onClick={() => navigate('/articles')}
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded mb-12"
            >
                ← Terug naar overzicht
            </button>
            <h1 className="text-3xl font-bold mb-6">{isEdit ? 'Artikel bewerken' : 'Nieuw Artikel'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Titel</label>
                    <input
                        type="text"
                        className={`w-full border rounded px-3 py-2 ${errors.title ? 'border-red-500' : ''}`}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        name="title"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Content</label>
                    <textarea
                        className={`w-full border rounded px-3 py-2 ${errors.content ? 'border-red-500' : ''}`}
                        rows={6}
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        name="content"
                    />
                    {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content[0]}</p>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Afbeelding</label>
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="mb-2 w-40 h-40 object-cover rounded"/>
                    )}
                    <input
                        type="file"
                        className={`w-full ${errors.image ? 'border-red-500' : ''}`}
                        onChange={handleFileChange}
                    />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {isEdit ? 'Opslaan' : 'Maak Artikel'}
                </button>
            </form>
        </div>
    );
}
