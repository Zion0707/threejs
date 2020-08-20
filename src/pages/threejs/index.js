import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import './index.css';
function Threejs() {
    const init = () => {
        const content = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(winWidth, winHeight);
        content.appendChild(renderer.domElement);
        camera.position.set(2, 2, 0);

        const ambient = new THREE.AmbientLight(0xffffff);
        scene.add(ambient);

        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.castShadow = true;
        spotLight.shadowCameraVisible = true;
        spotLight.position.set(100, 100, 100);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 'red' });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0, 0);
        scene.add(cube);

        new OrbitControls(camera, renderer.domElement);

        // 坐标系
        scene.add(new THREE.AxesHelper(1));
        // 网格 20x20
        // scene.add(new THREE.GridHelper(20, 20));

        // 必须开启运动 controls 才会生效
        function render() {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
        render();
    };
    useEffect(() => {
        init();
    }, []);
    return <div id="content"></div>;
}
export default Threejs;
