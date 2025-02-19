import React from 'react'

export const CustomInput = ({ name, text, type }) => {
    return (
        <label id={name} className="block text-gray-700 text-sm font-bold mb-2">
            {text}
            <input type={type} name={name} step={0.1} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </label>
    )
}
