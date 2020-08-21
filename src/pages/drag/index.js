import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';

function Line() {
    const initMsg = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        return {
            winWidth,
            winHeight,
            el,
        };
    };

    const init = (domMsg) => {
        const { winWidth, winHeight, el } = domMsg;

        const camera = new CinematicCamera(50, winWidth / winHeight, 0.1, 2000);
        camera.position.set(2, 2, 20);

        const renderer = new THREE.WebGLRenderer({});
        renderer.setSize(winWidth, winHeight);

        new OrbitControls(camera, renderer.domElement);

        const scene = new THREE.Scene();

        const box = new THREE.BoxGeometry(1, 1, 1);
        const mbm = new THREE.MeshBasicMaterial({ color: '#ddd' });
        const mesh = new THREE.Mesh(box, mbm);
        scene.add(mesh);

        const dragControls = new DragControls([mesh], camera, renderer.domElement);
        dragControls.addEventListener('dragstart', function (event) {
            console.log(event.object);
            // event.object.material.emissive.setHex(0xff0000);
        });
        dragControls.addEventListener('dragend', function (event) {
            // console.log(event.object);
        });

        el.appendChild(renderer.domElement);
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    };
    useEffect(() => {
        const domMsg = initMsg();
        init(domMsg);
    }, []);

    return <div id="content"></div>;
}

export default Line;
