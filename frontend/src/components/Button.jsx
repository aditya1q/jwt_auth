import React from 'react'

const Button = ({ name }) => {
    return (
        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {name}
        </button>)
}

export default Button