import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

import './index.css';

function CanvasTexture() {
    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setClearColor('#fff');
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;

        // 线条
        const geometry = new THREE.Geometry();
        const material = new THREE.LineBasicMaterial({ color: '#555' });
        geometry.vertices.push(new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0));
        const line = new THREE.Line(geometry, material, THREE.LineSegments);
        scene.add(line);

        const sphere = new THREE.BoxGeometry(4, 4, 4);
        const object = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial('#abc'));
        const box = new THREE.BoxHelper(object, '#abc');
        scene.add(box);

        // canvas 绘制
        const cvs = document.createElement('canvas');
        const ctx = cvs.getContext('2d');
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(50, 50, 50, 50);

        // canvas 纹理
        const cvsTexture = new THREE.CanvasTexture(cvs);
        const cvsGeometry = new THREE.BoxGeometry(5, 5, 0.1);
        const cvsMaterial = new THREE.MeshBasicMaterial({
            map: cvsTexture, // 设置纹理贴图
            transparent: true,
        });
        const cvsMesh = new THREE.Mesh(cvsGeometry, [
            null,
            null,
            null,
            null,
            cvsMaterial,
            cvsMaterial,
        ]);
        scene.add(cvsMesh);

        // // 添加三维辅助线
        // const axesHelper = new THREE.AxesHelper(5);
        // scene.add(axesHelper);

        // position and point the camera to the center of the scene
        camera.position.set(0, 0, 50);
        camera.lookAt(scene.position);

        // add spotlight for the shadows
        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);

        // add the output of the renderer to the html element
        el.append(renderer.domElement);

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.autoRotate = false;

        // call the render function
        renderer.render(scene, camera);

        function render() {
            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);
        }
        render();

        // onresize 事件会在窗口被调整大小时发生
        window.onresize = () => {
            const newWindowWidth = window.innerWidth;
            const newWindowHeight = window.innerHeight;
            el.style.cssText = `width:${newWindowWidth};height:${newWindowHeight}`;
            renderer.setSize(newWindowWidth, newWindowHeight);
            camera.aspect = newWindowWidth / newWindowHeight;
            camera.updateProjectionMatrix();
        };
    };

    useEffect(() => {
        init();
    });

    return (
        <div id="content">
            <ul></ul>
        </div>
    );
}
export default CanvasTexture;
