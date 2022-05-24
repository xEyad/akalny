import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter
} from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import AppState from 'mocks/appState';

//should be singlteon intialization
const firebaseConfig = {
  apiKey: "AIzaSyB_TOE09D4o6Dkjdl4zDXpkwgciFearcHQ",
  authDomain: "test-area-3e226.firebaseapp.com",
  projectId: "test-area-3e226",
  storageBucket: "test-area-3e226.appspot.com",
  messagingSenderId: "159604117683",
  appId: "1:159604117683:web:5fa85830bd88d1785260c6",
  measurementId: "G-Q85ZJJDNHF"
};
// Initialize Firebase
AppState.firebaseApp = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
