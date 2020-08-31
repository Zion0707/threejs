import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import './index.css';

function Test() {
    let globalBoxMesh = null;

    const setOpacity = () => {
        const tween1 = new TWEEN.Tween(globalBoxMesh.position).to({ x: 10 }, 1000);
        const tween2 = new TWEEN.Tween(globalBoxMesh.position).to({ y: 10 }, 1000);
        tween1.easing(TWEEN.Easing.Circular.Out);
        tween2.easing(TWEEN.Easing.Circular.Out);
        tween1.chain(tween2);
        tween2.chain(tween1);
        tween1.start();
    };

    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
        const boxMaterial = new THREE.MeshLambertMaterial({ color: 'blue', wireframe: true });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        globalBoxMesh = boxMesh;
        scene.add(boxMesh);

        const boxGeometry2 = new THREE.BoxGeometry(11, 11, 11);
        const boxMaterial2 = new THREE.MeshLambertMaterial({
            color: 'white',
            transparent: true,
            opacity: 0.2,
        });
        const boxMesh2 = new THREE.Mesh(boxGeometry2, boxMaterial2);
        scene.add(boxMesh2);

        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(0, 0, 200);

        // 渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // 设置渲染器的颜色和大小
        renderer.setClearColor('#040b1a');
        renderer.setSize(winWidth, winHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // 高清设置

        // 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。
        // 这就是渲染器用来显示场景给我们看的<canvas>元素
        document.body.appendChild(renderer.domElement);

        // 鼠标控制旋转
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.autoRotate = false;

        // 设置光源
        const light = new THREE.DirectionalLight('#fff', 0.5);
        light.position.setScalar(100);
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
            // 只有不断更新才会执行动画
            TWEEN.update();
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
            <ul>
                <li>
                    <button onClick={setOpacity}>更改透明度</button>
                </li>
            </ul>
        </div>
    );
}
export default Test;
