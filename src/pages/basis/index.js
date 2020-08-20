import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
function Basis() {
    const init = () => {
        const content = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        // 场景允许你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。
        const scene = new THREE.Scene();

        // 三级坐标
        const axesHelper = new THREE.AxesHelper(0.1);
        scene.add(axesHelper);

        // -----------------------------------------------------------------------------------------------------

        // 这一摄像机使用perspective projection（透视投影）来进行投影。
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 1, 2000);
        camera.position.set(2, 2, 2);

        // WebGL Render 用WebGL渲染出你精心制作的场景。
        const renderer = new THREE.WebGLRenderer({});
        // 设置渲染器大小
        renderer.setSize(winWidth, winHeight);
        // 渲染器渲染场景和相机
        // renderer.render(scene, camera);

        const controls = new OrbitControls(camera, renderer.domElement);
        // 是否自动转动相机视觉，如果设为true并开启 controls.update 才会生效
        controls.autoRotate = false;

        // 把渲染器对象添加到content元素中生成canvas
        content.appendChild(renderer.domElement);

        // 执行动画
        function animate() {
            // controls.update();
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    };
    useEffect(() => {
        init();
    }, []);
    return <div id="content"></div>;
}

export default Basis;
