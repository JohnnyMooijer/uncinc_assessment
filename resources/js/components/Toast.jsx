// Toast.jsx
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => onClose?.(), duration);
        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!message) return null;

    const colors = {
        success: 'bg-green-500',
        info: 'bg-blue-500',
        error: 'bg-red-500',
    };

    return (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow text-white z-50 ${colors[type]}`}>
            {message}
        </div>
    );
}
