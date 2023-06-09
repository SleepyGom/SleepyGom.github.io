import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Company from './company';
import ScrollToTop from './scrolltotop';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import {Recruit} from './reqruit';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/company' element={<Company/>}/>
      <Route path='/recruit' element ={<Recruit/>}/>
    </Routes>
    <ScrollToTop/>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
