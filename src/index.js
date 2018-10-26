import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles/index.css'
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <App />
        </div>
    </BrowserRouter>,
    document.getElementById('root'))
