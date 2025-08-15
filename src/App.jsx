import './App.css'
import Login from './components/Login'
import Registro from './components/Register'
import Fake from './components/fakeStore'
import ProductDetailModal from './components/DetallesModal'
import ModalImg from './components/ModalImg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Registro />} />
          <Route path='/login' element={<Login />} />
          <Route path='/fake' element={<Fake />} />
          <Route path='/detalles' element={<ProductDetailModal />} />
          <Route path='/modalimg' element={<ModalImg />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
