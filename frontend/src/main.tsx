import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext.tsx';
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReviewProvider } from './context/ReviewContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <ReviewProvider>
          <App />
        </ReviewProvider>
      </ProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
