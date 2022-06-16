import React from 'react'
import ReactDOM from 'react-dom'
import './normalize.css';
import './index.css'
import './dark.scss'
import App from './App'
import { DarkModeContextProvider } from "./context/darkModeContext";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
