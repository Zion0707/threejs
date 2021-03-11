import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
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
import Map3d from './pages/map-3d';
import Louyu from './pages/louyu';
import MeshLine from './pages/mesh-line';
import Floating from './pages/floating';
import FadeInOut from './pages/fade-in-out';
import ObjOpacity from './pages/obj-opacity';
import KeepAlive from './pages/keep-alive';
import KeepAlive2 from './pages/keep-alive2';
import CanvasTexture from './pages/canvas-texture';
import Drag from './pages/drag';

ReactDOM.render(
    <>
        <Router>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/test" component={Test} />
                <Route exact path="/tadiao" component={Tadiao} />
                <Route exact path="/dianti" component={Dianti} />
                <Route exact path="/skin" component={Skin} />
                <Route exact path="/basis" component={Basis} />
                <Route exact path="/pikaqiu" component={Pikaqiu} />
                <Route exact path="/img-load" component={ImgLoad} />
                <Route exact path="/auto-move" component={AutoMove} />
                <Route exact path="/car-start" component={CarStart} />
                <Route exact path="/box-texture" component={BoxTexture} />
                <Route exact path="/line2" component={Line2} />
                <Route exact path="/video" component={Video} />
                <Route exact path="/change-wide" component={ChangeWide} />
                <Route exact path="/event-click" component={EventClick} />
                <Route exact path="/map-3d" component={Map3d} />
                <Route exact path="/louyu" component={Louyu} />
                <Route exact path="/mesh-line" component={MeshLine} />
                <Route exact path="/floating" component={Floating} />
                <Route exact path="/fade-in-out" component={FadeInOut} />
                <Route exact path="/obj-opacity" component={ObjOpacity} />
                <Route exact path="/keep-alive" component={KeepAlive} />
                <Route exact path="/keep-alive/:id/:name" component={KeepAlive2} />
                <Route exact path="/canvas-texture" component={CanvasTexture} />
                <Route exact path="/drag" component={Drag} />
            </Switch>
        </Router>
    </>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
