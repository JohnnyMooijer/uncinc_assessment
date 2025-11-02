import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function ArticlesTable({ articles, handleEdit, handleDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="py-2 px-4"></th>
                    <th className="py-2 px-4">Titel</th>
                    <th className="py-2 px-4">Content</th>
                    <th className="py-2 px-4">Datum</th>
                    <th className="py-2 px-4"></th>
                </tr>
                </thead>
                <tbody>
                {articles.map((article) => (
                    <tr key={article.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4 font-medium">
                            <img
                                src={article.image_url || '/images/no-image-found.png'}
                                alt="Preview"
                                className="mb-2 w-40 h-30 object-cover rounded"
                            />
                        </td>
                        <td className="py-2 px-4 font-medium">{article.title}</td>
                        <td className="py-2 px-4">
                            {article.content.length > 50
                                ? article.content.slice(0, 50) + '...'
                                : article.content}
                        </td>
                        <td className="py-2 px-4 text-gray-500">
                            {new Date(article.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4 flex justify-center items-center space-x-3">
                            <button
                                className="text-blue-500 hover:text-blue-700"
                                title="Bewerken"
                                onClick={() => handleEdit(article.id)}
                            >
                                <Edit size={20} />
                            </button>
                            <button
                                className="text-red-500 hover:text-red-700"
                                title="Verwijderen"
                                onClick={() => handleDelete(article.id)}
                            >
                                <Trash2 size={20} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
