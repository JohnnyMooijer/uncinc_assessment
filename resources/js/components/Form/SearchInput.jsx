import {useState, useEffect} from 'react';

export default function SearchInput({value, onChange, placeholder = 'Zoek...'}) {
    const [input, setInput] = useState(value || '');

    useEffect(() => {
        const delay = setTimeout(() => {
            onChange(input);
        }, 300);

        return () => clearTimeout(delay);
    }, [input, onChange]);

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder={placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border rounded px-3 py-2 w-full"
            />
        </div>
    );
}
