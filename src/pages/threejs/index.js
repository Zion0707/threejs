import React, { useEffect } from 'react';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    AxesHelper,
    GridHelper,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import './index.css';
function Threejs() {
    const init = () => {
        const content = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, winWidth / winHeight, 0.1, 1000);

        const renderer = new WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        content.appendChild(renderer.domElement);

        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;
        controls.enableRotate = true;

        scene.add(new AxesHelper(20));
        scene.add(new GridHelper(20, 20));

        renderer.render(scene, camera);
    };
    useEffect(() => {
        init();
    }, []);
    return <div id="content"></div>;
}
export default Threejs;
