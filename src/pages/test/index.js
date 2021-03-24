import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import './index.css';

function Test() {
    const init = () => {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 0.1, 1000);
        camera.position.set(5, 5, 20);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setSize(winWidth, winHeight);
        document.getElementById('content').appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#fff000' });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        new OrbitControls(camera, renderer.domElement);

        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();
    };

    useEffect(() => {
        init();
    }, []);

    return <div id="content"></div>;
}
export default Test;
