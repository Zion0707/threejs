import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function Basis() {
    const wrapMsg = () => {
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
        // 场景
        const scene = new THREE.Scene();

        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(50, 30, 100);
        // 渲染器
        const renderer = new THREE.WebGLRenderer({
            antialias: true, // 消除锯齿
        });
        // 设置渲染器的颜色和大小
        renderer.setClearColor(0x404040);
        renderer.setSize(winWidth, winHeight);
        document.body.appendChild(renderer.domElement);

        // 鼠标控制旋转
        new OrbitControls(camera, renderer.domElement);

        // 设置光源
        const light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.setScalar(100);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        const box = new THREE.BoxGeometry(2, 2, 2);
        const mbm = new THREE.MeshBasicMaterial({ color: '#f00' });
        const mesh = new THREE.Mesh(box, mbm);
        scene.add(mesh);

        // 添加灰色网格线
        scene.add(new THREE.GridHelper(20, 20));
        scene.add(new THREE.AxesHelper(2));

        el.append(renderer.domElement);

        function render() {
            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);
        }
        render();
    };
    useEffect(() => {
        const domMsg = wrapMsg();
        init(domMsg);
    }, []);

    return <div id="content"></div>;
}

export default Basis;
