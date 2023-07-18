import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // trae el estado de redux
import store from './redux/store' //estado global de la app
import {BrowserRouter} from 'react-router-dom'//permite el ruteo de la app

ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={store}>
     <BrowserRouter>
      <App />
     </BrowserRouter>
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
