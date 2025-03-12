import Swal from "sweetalert2"
import * as math from "mathjs"

export const eulerMejorado = ({ h, x0, y0, xn, f }) => {
    const results = []
  
    while (x0 < xn) {
        let xna = x0 + h;
  
        let fxy = math.evaluate(f, { x: x0, y: y0 });
  
        let yna = y0 + h * fxy;
  
        let fxy2 = math.evaluate(f, { x: xna, y: yna });
  
        let yvar = y0 + h * (fxy + fxy2) / 2;
  
        x0 = parseFloat(xna);
        y0 = parseFloat(yvar);
  
        x0 = !x0 ? 0 : x0;
        y0 = !y0 ? 0 : y0;
  
        results.push({ x: x0, y: y0 });
    }
  
    return results;
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

export const rungeKutta = ({ h, x0, y0, xn, f }) => {
  let x = x0;
  let y = y0;
  const results = [];

  for (let i = 0;i < xn;i++) {
      let k1 = math.multiply(h, math.evaluate(f, { x, y }));
      let k2 = math.multiply(h, math.evaluate(f, { x: x + h / 2, y: math.add(y, math.multiply(0.5, k1)) }));
      let k3 = math.multiply(h, math.evaluate(f, { x: x + h / 2, y: math.add(y, math.multiply(0.5, k2)) }));
      let k4 = math.multiply(h, math.evaluate(f, { x: x + h, y: math.add(y, k3) }));

      let deltaY = math.multiply(1 / 6, math.add(k1, math.multiply(2, k2), math.multiply(2, k3), k4));

      y = math.add(y, deltaY);
      x = parseFloat(x + h);

      results.push({ x, y, k1, k2, k3, k4 });
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