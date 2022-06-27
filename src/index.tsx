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
import { getAnalytics } from "firebase/analytics"; //must import it
import AppState from 'mocks/appState';
import { getAuth, onAuthStateChanged,signInAnonymously } from "firebase/auth";

//should be singlteon intialization
const firebaseConfig = {
  apiKey: "AIzaSyDrLXL7fheCKbeauZoY8Rubra7GMqwgC6c",
  authDomain: "akalny.firebaseapp.com",
  projectId: "akalny",
  storageBucket: "akalny.appspot.com",
  messagingSenderId: "326944183850",
  appId: "1:326944183850:web:fcfeac86b91722ed85d553",
  measurementId: "G-84WTRQHMML"
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
