import { EulerMejorado } from './components/EulerMejorado'
import { NewtonRaphson } from './components/NewtonRaphson'
import { RungeKutta } from './components/RungeKutta'
import 'sweetalert2/dist/sweetalert2.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EulerMejorado />} />
          <Route path='/*' element={<EulerMejorado />} />
          <Route path='/euler-mejorado' element={<EulerMejorado />} />
          <Route path='/newton-raphson' element={<NewtonRaphson />} />
          <Route path='/runge-kutta' element={<RungeKutta />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
