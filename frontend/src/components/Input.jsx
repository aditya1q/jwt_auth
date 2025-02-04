import React from 'react';

const Input = ({ label, type, id, value, handleChange, placeholder, error }) => {
    return (
        <div className="mb-4"> {/* Added margin-bottom for spacing */}
            <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-1">
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value || ''}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition
                    ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                required
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default Input;
