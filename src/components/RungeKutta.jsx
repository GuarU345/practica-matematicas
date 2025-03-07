import React from 'react'
import { Layout } from './Layout'
import Swal from 'sweetalert2'
import { CustomInput } from './Input'
import { EditableMathField } from 'react-mathquill'
import { isValidEquation, rungeKutta } from '../utils/functions'
import { convertLatexToAsciiMath } from 'mathlive'

export const RungeKutta = () => {
    const [result, setResults] = React.useState([])
    const [latex, setLatex] = React.useState('')
    const [text, setText] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        const {
            'step-size': stepSize,
            'initial-value-x': initialValueX,
            'initial-value-y': initialValueY,
            'final-value-x': finalValueX
        } = data

        if (stepSize < 0) {
            Swal.fire('Error', 'El tamaño de paso debe de ser un decimal mayor a 0', 'error')
            return
        }

        if (initialValueX < 0) {
            Swal.fire('Error', 'El valor inicial de x debe de ser un decimal mayor a 0', 'error')
            return
        }

        if (initialValueY < 0) {
            Swal.fire('Error', 'El valor inicial de y debe de ser un decimal mayor a 0', 'error')
            return
        }

        const func = convertLatexToAsciiMath(latex)
        const validate = isValidEquation(func)

        if (!validate) return

        const results = rungeKutta({
            h: parseFloat(stepSize),
            x0: parseFloat(initialValueX),
            y0: parseFloat(initialValueY),
            xn: parseFloat(finalValueX),
            f: func
        })

        setResults(results)
        setText('')
        setLatex('')
        e.target.reset()
    }

    return (
        <Layout>
            <div className='p-4'>
                <h1 className='text-center font-bold text-2xl'>Runge Kutta</h1>
                <div className='flex flex-col gap-10 mt-4'>
                    <form className='flex flex-col' onSubmit={handleSubmit}>
                        <CustomInput name='step-size' text='Tamaño de paso' type='number' />
                        <CustomInput name='initial-value-x' text='Valor inicial de x' type='number' />
                        <CustomInput name='initial-value-y' text='Valor inicial de y' type='number' />
                        <CustomInput name='final-value-x' text='Valor final de x' type='number' />
                        <label className="block text-gray-700 text-sm font-bold mb-2">Función</label>
                        <EditableMathField latex={latex} onChange={(mathField) => {
                            setLatex(mathField.latex())
                            setText(mathField.text())
                        }} />
                        <button className='p-4 mt-4 bg-green-400 border rounded' type='submit'>Calcular</button>
                    </form>
                    <section>
                        <table className='border-collapse w-100 bg-white border border-gray-200'>
                            <thead>
                                <tr>
                                    <th className='py-2 px-4 border-b'>Iteración</th>
                                    <th className='py-2 px-4 border-b'>X</th>
                                    <th className='py-2 px-4 border-b'>Y</th>
                                    <th className='py-2 px-4 border-b'>K1</th>
                                    <th className='py-2 px-4 border-b'>K2</th>
                                    <th className='py-2 px-4 border-b'>K3</th>
                                    <th className='py-2 px-4 border-b'>K4</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((result, index) => (
                                    <tr key={index}>
                                        <td className='py-2 px-4 border-b'>{index + 1}</td>
                                        <td className='py-2 px-4 border-b'>{result.x}</td>
                                        <td className='py-2 px-4 border-b'>{result.y}</td>
                                        <td className='py-2 px-4 border-b'>{result.k1}</td>
                                        <td className='py-2 px-4 border-b'>{result.k2}</td>
                                        <td className='py-2 px-4 border-b'>{result.k3}</td>
                                        <td className='py-2 px-4 border-b'>{result.k4}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        </Layout>
    )
}
