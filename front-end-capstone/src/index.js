import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

import registerServiceWorker from './registerServiceWorker';

import App from './App'

ReactDOM.render(
    <div>
        <App />
    </div>
, document.getElementById('root'));
registerServiceWorker();