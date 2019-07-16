import React from 'react';
import ReactDOM from 'react-dom';
// TODO: Quitar bootstrap y fontawesome si sólo se usa antd
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import "antd/dist/antd.css";
import './index.css';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthStore } from './contexts/AuthStore';

ReactDOM.render(
  <Router>
    <AuthStore>
      <App />
    </AuthStore>
  </Router>,
  document.getElementById('root')
);
