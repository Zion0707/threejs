import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import './index.css';

function Louyu() {
    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        // 纹理列表
        const blue05Material = new THREE.MeshLambertMaterial({
            color: '#15c5e8',
            transparent: true,
            opacity: 0.5,
        });

        const blue01Material = new THREE.MeshLambertMaterial({
            color: '#15c5e8',
            transparent: true,
            opacity: 0.1,
        });

        const light03Material = new THREE.MeshLambertMaterial({
            color: '#15c5e8',
            transparent: true,
            opacity: 0.3,
        });

        // 楼宇组开始
        const louyuGroup = new THREE.Group();

        // 楼宇主体
        const louyuGeometry = new THREE.BoxBufferGeometry(100, 200, 100);
        const louyuMesh = new THREE.Mesh(louyuGeometry, light03Material);
        louyuMesh.name = '楼宇主体';
        louyuGroup.add(louyuMesh);

        // 楼宇顶部
        const louyuTopGeometry = new THREE.BoxBufferGeometry(100.5, 10, 100.5);
        const louyuTopMesh = new THREE.Mesh(louyuTopGeometry, blue05Material);
        louyuTopMesh.position.set(0, 110, 0);
        louyuTopMesh.name = '楼宇顶部';
        scene.add(louyuTopMesh);

        // // 楼宇底部
        // const louyuBottomGeometry = new THREE.BoxBufferGeometry(160, 8, 160);
        // const louyuBottomMesh = new THREE.Mesh(louyuBottomGeometry, blue05Material);
        // louyuBottomMesh.position.set(0, -105, 0);
        // louyuBottomMesh.name = '楼宇底部';
        // scene.add(louyuBottomMesh);

        // 楼层
        const floorGeometry = new THREE.BoxBufferGeometry(100, 1, 100);
        let floorNum = 100;
        for (let i = 0; i < 20; i++) {
            const floorMesh = new THREE.Mesh(floorGeometry, blue01Material);
            floorMesh.position.set(0, (floorNum -= 10), 0);
            louyuGroup.add(floorMesh);
        }
        scene.add(louyuGroup);

        const louyuGroup2 = louyuGroup.clone();
        scene.add(louyuGroup2);

        // 楼宇组结束

        // ---------------------------------------------------------------------------------------------
        // 相机
        const camera = new THREE.PerspectiveCamera(60, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(300, 80, 300);

        // 渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        // 设置渲染器的颜色和大小
        // renderer.setClearColor('#040b1a');
        renderer.setClearAlpha(0);
        renderer.setSize(winWidth, winHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // 高清设置

        // 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。
        // 这就是渲染器用来显示场景给我们看的<canvas>元素
        document.body.appendChild(renderer.domElement);

        // 鼠标控制旋转
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.autoRotate = false;

        // 设置光源
        const light = new THREE.DirectionalLight('#FFFFFF', 0.5);
        light.position.setScalar(100);
        scene.add(light);
        scene.add(new THREE.AmbientLight('#FFFFFF', 0.5));

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
    return <div id="content"></div>;
}
export default Louyu;
