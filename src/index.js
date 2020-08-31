import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Index from './pages/index';
import Basis from './pages/basis';
import Pikaqiu from './pages/pikaqiu';
import Skin from './pages/skin';
import ImgLoad from './pages/img-load';
import AutoMove from './pages/auto-move';
import CarStart from './pages/car-start';
import BoxTexture from './pages/box-texture';
import Tadiao from './pages/tadiao';
import Dianti from './pages/dianti';
import Line2 from './pages/line2';
import Video from './pages/video';
import ChangeWide from './pages/change-wide';
import EventClick from './pages/event-click';
import Test from './pages/test';
import Note404 from './pages/note404';

ReactDOM.render(
    <>
        <Router>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/test" component={Test} />
                <Route path="/tadiao" component={Tadiao} />
                <Route path="/dianti" component={Dianti} />
                <Route path="/skin" component={Skin} />
                <Route path="/basis" component={Basis} />
                <Route path="/pikaqiu" component={Pikaqiu} />
                <Route path="/img-load" component={ImgLoad} />
                <Route path="/auto-move" component={AutoMove} />
                <Route path="/car-start" component={CarStart} />
                <Route path="/box-texture" component={BoxTexture} />
                <Route path="/line2" component={Line2} />
                <Route path="/video" component={Video} />
                <Route path="/change-wide" component={ChangeWide} />
                <Route path="/event-click" component={EventClick} />
                <Route path="/note404" component={Note404} />
                <Redirect to="/note404" />
            </Switch>
        </Router>
    </>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
