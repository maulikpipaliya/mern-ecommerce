import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store'
import App from "./App";


import "bootstrap/dist/css/bootstrap.min.css"; // main
import "./index.css"; //custom
// import "./bootstrap.min.css"; // lux


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

