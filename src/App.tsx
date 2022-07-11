import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header } from './components';
import { CartProvider } from './hooks';
import { Routes } from './routes';
import GlobalStyles from './styles/global';

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <GlobalStyles />
        <Header />
        <Routes />
        <ToastContainer autoClose={3000} />
      </CartProvider>
    </BrowserRouter>
  );
}
