import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const firebaseConfig = {
  apiKey: "AIzaSyDoBOHBMEE7DniZdki8Al0JBFilzwazgcA",
  authDomain: "ifcjs-frondend-app.firebaseapp.com",
  projectId: "ifcjs-frondend-app",
  storageBucket: "ifcjs-frondend-app.appspot.com",
  messagingSenderId: "374953526896",
  appId: "1:374953526896:web:575ee3a522979d6a1356b5"
};

// Initialize Firebase
initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
