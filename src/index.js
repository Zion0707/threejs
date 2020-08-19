import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Index from './pages/index';
import Threejs from './pages/threejs';

ReactDOM.render(
    <>
        <Router>
            <Route exact path="/" component={Index} />
            <Route exact path="/threejs" component={Threejs} />
        </Router>
    </>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
