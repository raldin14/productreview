import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext.tsx';
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReviewProvider } from './context/ReviewContext.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import './index.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Header/>
        <div className='layout'>
          <ProductProvider>
            <ReviewProvider>
              <App />
            </ReviewProvider>
          </ProductProvider>
        </div>
        <Footer/>
      </BrowserRouter>
  </StrictMode>
)
