import z from 'zod';

export const EulerMejoradoSchema = z.object({
    'precision-number': z.number().min(1, { message: "El número de precisión debe ser mayor a 0" }),
    'iteration-number': z.number().min(1, { message: "El número de iteraciones debe ser mayor a 0" }),
    'step-size': z.number().min(1, { message: "El tamaño de paso debe ser mayor a 0" }),
    'initial-value-x': z.number().min(1, { message: "El valor inicial de x debe ser un número mayor a 0" }),
    'initial-value-y': z.number().min(1, { message: "El valor inicial de y debe ser un número mayor a 0" }),
    'function': z.string({ message: "La función debe ser una cadena de texto" })
})