import Swal from "sweetalert2"
import * as math from "mathjs"

export const eulerMejorado = ({ decimales, iteraciones, h, xn, yn, f }) => {
    const results = []
  
    for (let i = 0; i < iteraciones; i++) {
      let xna = xn + h
  
      let fxy = math.evaluate(f, { x: xn, y: yn })
  
      let yna = yn + h * fxy
  
      let fxy2 = math.evaluate(f, { x: xna, y: yna })
  
      let yvar = yn + h * (fxy + fxy2) / 2
  
      xn = parseFloat(xna.toFixed(decimales))
      yn = parseFloat(yvar.toFixed(decimales))

      xn = !xn ? 0 : xn
      yn = !yn ? 0 : yn 
  
      const newResult = {
        x: xn,
        y: yn
      }
      results.push(newResult)
    }
  
    return results
}

export const newtonRaphson = ({ decimales, xn, f }) => {
  const results = [];

  const epsilon = Math.pow(10, -decimales);
  
  const df = math.derivative(f, 'x');

  let error;
  let iter = 0;

  try {
    do {
      const fValue = math.evaluate(f, { x: xn });
      const dfValue = df.evaluate({ x: xn });

      if (dfValue === 0) {
        throw new Error('La derivada es 0, no se puede continuar con el método Newton-Raphson.');
      }

      let x1 = xn - fValue / dfValue;
      error = Math.abs(x1 - xn);
      x1 = !x1 ? 0 : x1;
      results.push(x1);
      xn = x1;
      iter++;
    } while (error > epsilon);

    return results;
  } catch (err) {
    Swal.fire({
      title: 'Error',
      text: err.message,
      icon: 'error'
    })
    return [];
  }
};

export const rungeKutta = ({ decimales, h, xn, yn, xf, f }) => {
    const results = []
  
    while (xn < xf) {
      if (xn + h > xf) {
        h = xf - xn;
      }

      let k1 = h * math.evaluate(f, { x: xn, y: yn })
  
      let k2 = h * math.evaluate(f, { x: xn + h / 2, y: yn + k1 / 2 })
  
      let k3 = h * math.evaluate(f, { x: xn + h / 2, y: yn + k2 / 2 })
  
      let k4 = h * math.evaluate(f, { x: xn + h, y: yn + k3 })
  
      xn = parseFloat(
        (xn + h).toFixed(decimales)
      )

      yn = parseFloat(
        (yn + (k1 + 2 * k2 + 2 * k3 + k4) / 6).toFixed(decimales)
      ) 

      const newResult = {
        x: xn,
        y: yn
      }
      results.push(newResult)
    }
  
    return results
}

export const isValidEquation = (equation) => {
  try {
    const parsed = math.parse(equation);
    const scope = { x: 0, y: 0 };
    parsed.evaluate(scope);

    return true;
  } catch (e) {
    Swal.fire({
      title: 'Error',
      text: `La ecuación no es válida`,
      icon: 'error',
    });

    return false;
  }
};