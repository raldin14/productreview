import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import SingleProductView from './pages/SingleProductView';
function App() {

  return (
    <div className='container py-4'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<CreateProduct/>}/>
        <Route path='/edit/:id' element={<EditProduct/>}/>
        <Route path='/product/:id' element={<SingleProductView/>}/>
      </Routes>
    </div>
  )
}

export default App
