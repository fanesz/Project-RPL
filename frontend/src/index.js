import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import your custom CSS file
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="root-container">
      <App />
    </div>
  </React.StrictMode>
);

reportWebVitals();
