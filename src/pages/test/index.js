import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

import './index.css';

function Test() {
    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        // 立方体
        const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
        const boxMaterial = new THREE.MeshLambertMaterial({ color: 'blue' });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        boxMesh.castShadow = true; // 允许投射阴影
        boxMesh.receiveShadow = true; // 允许接收阴影
        scene.add(boxMesh);

        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(0, 0, 200);
        camera.lookAt(new THREE.Vector3(0, 0, 0)); // 让相机指向原点

        // 渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        // 设置渲染器的颜色和大小
        renderer.setClearColor('#000');
        renderer.setSize(winWidth, winHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // 高清设置
        renderer.shadowMapEnabled = true;

        // 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。
        // 这就是渲染器用来显示场景给我们看的<canvas>元素
        document.body.appendChild(renderer.domElement);

        // 鼠标控制旋转
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.autoRotate = false;
        orbitControls.target = new THREE.Vector3(0, 0, 0); // 控制焦点
        orbitControls.maxDistance = 300;
        orbitControls.zoomSpeed = 0.8;

        // 设置光源
        const light = new THREE.DirectionalLight('#fff', 0.5);
        light.position.setScalar(100);
        light.castShadow = true;
        scene.add(light);
        scene.add(new THREE.AmbientLight('#fff', 0.5));

        // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
        scene.add(new THREE.AxesHelper(5));

        el.append(renderer.domElement);

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
export default Test;
