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
  
      results.push({x:xn,y:yn})
    }
  
    return results
}

export const newtonRaphson = ({ decimales,x0, f }) => {
  const results = [];
  let epsilon = Math.pow(10, -decimales);

  let df = math.derivative(f, 'x'); // Calcula la derivada simbólica

  let x1, error, iter = 0,maxIter = 100;

  do {
    let fValue = math.evaluate(f, { x: x0 });
    let dfValue = df.evaluate({ x: x0 });

    if (dfValue === 0) {
      console.log("Derivada cero, método no aplicable.");
      results.push(fValue)
      break
    }

    x1 = x0 - fValue / dfValue;
    error = Math.abs(x1 - x0);

    x0 = x1;
    results.push(x1);

    iter++;
    if (iter >= maxIter) {
      console.log("Número máximo de iteraciones alcanzado.");
      break
    }

  } while (error > epsilon);

  return results;
};

export const rungeKutta = ({ h,n,x0,y0,f }) => {
  let x = x0;
  let y = y0;
  const results = [];

  // Convertir la ecuación en una función evaluable
  const parsedF = math.parse(f);
  const compiledF = parsedF.compile();

  for (let i = 0; i < n; i++) {
    let k1 = math.multiply(h, compiledF.evaluate({ x, y }));
    let k2 = math.multiply(h, compiledF.evaluate({ x: x + h / 2, y: math.add(y, math.multiply(0.5, k1)) }));
    let k3 = math.multiply(h, compiledF.evaluate({ x: x + h / 2, y: math.add(y, math.multiply(0.5, k2)) }));
    let k4 = math.multiply(h, compiledF.evaluate({ x: x + h, y: math.add(y, k3) }));

    let deltaY = math.multiply(1 / 6, math.add(k1, math.multiply(2, k2), math.multiply(2, k3), k4));

    y = math.add(y, deltaY);
    x = math.add(x, h);

    results.push({ x, y });
  }

  return results;
}

export const isValidEquation = (equation) => {
  try {
    const parsed = math.parse(equation); 
    const compiled = parsed.compile();

    const scope = { x: 0, y: 0 };
    compiled.evaluate(scope);

    return true;
  } catch (e) {
    Swal.fire({
      title: 'Error',
      text: `La ecuación no es válida: ${e.message}`,
      icon: 'error',
    });

    return false;
  }
};