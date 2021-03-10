import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './index.css';

function Test() {
    const init = () => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#48dbfb');
        scene.fog = new THREE.Fog('#48dbfb', 500, 1000);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // 鼠标控制旋转
        new OrbitControls(camera, renderer.domElement);

        const group = new THREE.Group();

        // 立方体盒子
        const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const boxMaterial = new THREE.MeshBasicMaterial({ color: '#fff' });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

        // 平面
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.MeshBasicMaterial({ color: '#f1f1f1', side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotateX(1.6);
        plane.position.y = -0.5;

        group.add(boxMesh);
        group.add(plane);
        scene.add(group);

        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();
    };

    useEffect(() => {
        init();
    });

    return <div></div>;
}
export default Test;
