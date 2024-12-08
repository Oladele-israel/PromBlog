import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { store } from './store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/OtherPages/ScrollToTop';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
                <ScrollToTop />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
