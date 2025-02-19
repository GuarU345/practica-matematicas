import React from 'react'

export const Navbar = () => {
    return (
        <nav className="bg-green-800 w-screen shadow-md">
            <ul className="flex justify-center gap-4 p-4">
                <li>
                    <a href="/euler-mejorado" className="text-white hover:text-green-400">Euler Mejorado</a>
                </li>
                <li>
                    <a href="/newton-raphson" className="text-white hover:text-green-400">Newthon Raphson</a>
                </li>
                <li>
                    <a href="/runge-kutta" className="text-white hover:text-green-400">Runge Kutta</a>
                </li>
            </ul>
        </nav>
    )
}
