import { useState } from 'react'
import { Layout } from './Layout'
import { isValidEquation, newtonRaphson } from '../utils/functions'
import { CustomInput } from './Input'
import { addStyles, EditableMathField } from 'react-mathquill'
import { convertLatexToAsciiMath } from 'mathlive'

addStyles()

export const NewtonRaphson = () => {
    const [result, setResult] = useState([])
    const [latex, setLatex] = useState('')
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        const {
            'precision-number': precisionNumber,
            'initial-value-x': initialValueX,
        } = data

        if (precisionNumber < 0) {
            Swal.fire('Error', 'El número de decimales de precisión debe de ser mayor a 0', 'error')
            return
        }

        if (initialValueX < 0) {
            Swal.fire('Error', 'El valor inicial de x debe de ser un decimal mayor a 0', 'error')
            return
        }

        const func = convertLatexToAsciiMath(latex)
        const validate = isValidEquation(func)

        if (!validate) return

        const results = newtonRaphson(
            {
                decimales: parseInt(precisionNumber),
                xn: parseFloat(initialValueX),
                f: func
            }
        )
        setResult(results)
        setText('')
        setLatex('')
        e.target.reset()
    }

    return (
        <Layout>
            <div className='p-4'>
                <h1 className='text-center font-bold text-2xl'>Newthon Raphson</h1>
                <div className='grid gap-10 grid-cols-2 mt-4'>
                    <form className='flex flex-col' onSubmit={handleSubmit}>
                        <CustomInput name='precision-number' text='Numero de decimales de precisión' type='number' />
                        <CustomInput name='initial-value-x' text='Valor inicial de x' type='number' />
                        <EditableMathField latex={latex} onChange={(mathField) => {
                            setLatex(mathField.latex())
                            setText(mathField.text())
                        }} />
                        <button className='p-4 mt-4 bg-green-400 border rounded' type='submit'>Calcular</button>
                    </form>
                    <section>
                        <table className='border-collapse bg-white border border-gray-200'>
                            <thead>
                                <tr>
                                    <th className='py-2 px-4 border-b'>Iteración</th>
                                    <th className='py-2 px-4 border-b'>X1</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((result, index) => (
                                    <tr key={index}>
                                        <td className='py-2 px-4 border-b'>{index + 1}</td>
                                        <td className='py-2 px-4 border-b'>{result}</td>
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
