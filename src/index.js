import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//importaciones de librerias
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

//importación de component de enrutamiento
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

