import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';
import { createGlobalStyle } from 'styled-components'
import reboot from 'styled-reboot'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GlobalStyle = createGlobalStyle`
    ${reboot()}
    body {
        background-color: #333333;
    }
`
ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle />
        <Provider store={configureStore()}>
            <App />
            <ToastContainer />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
