import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import imgBg from './bg.jpg';

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
        const blue1Material = new THREE.MeshLambertMaterial({
            color: '#15c5e8',
            transparent: true,
            opacity: 0.5,
        });

        const blue2Material = new THREE.MeshLambertMaterial({
            color: '#15c5e8',
            transparent: true,
            opacity: 0.3,
        });

        const white1Material = new THREE.MeshLambertMaterial({
            color: '#ffffff',
            transparent: true,
            opacity: 0.8,
        });

        const white2Material = new THREE.MeshLambertMaterial({
            color: '#ffffff',
            transparent: true,
            opacity: 0.6,
        });

        const img01Texture1 = new THREE.TextureLoader().load(imgBg);
        img01Texture1.repeat.set(1, 1);
        img01Texture1.wrapS = THREE.RepeatWrapping;
        img01Texture1.wrapT = THREE.RepeatWrapping;
        const tdCenterMaterial = new THREE.MeshLambertMaterial({
            map: img01Texture1,
            transparent: true,
            opacity: 0.8,
        });

        // 楼宇组开始
        const louyuGroup = new THREE.Group();

        // 楼宇主体
        const louyuGeometry = new THREE.BoxBufferGeometry(180, 260, 100);
        const louyuMesh = new THREE.Mesh(louyuGeometry, [
            blue1Material,
            blue1Material,
            blue1Material,
            blue1Material,
            tdCenterMaterial,
            tdCenterMaterial,
        ]);
        louyuMesh.name = '楼宇主体';

        // // 楼宇柱体
        // const cylinderGroup = new THREE.Group();
        // cylinderGroup.name = '楼宇柱体';
        // const cylinderGeometry = new THREE.BoxBufferGeometry(15, 260, 8);
        // const cylinderMesh1 = new THREE.Mesh(cylinderGeometry, blue2Material);
        // cylinderMesh1.position.set(-47, 0, -47);
        // const cylinderMesh2 = cylinderMesh1.clone();
        // cylinderMesh2.position.set(47, 0, 47);
        // const cylinderMesh3 = cylinderMesh1.clone();
        // cylinderMesh3.position.set(-47, 0, 47);
        // const cylinderMesh4 = cylinderMesh1.clone();
        // cylinderMesh4.position.set(47, 0, -47);
        // cylinderGroup.add(cylinderMesh1, cylinderMesh2, cylinderMesh3, cylinderMesh4);

        // 楼宇顶部
        const louyuTopGeometry = new THREE.BoxBufferGeometry(140, 18, 101);
        const louyuTopMesh = new THREE.Mesh(louyuTopGeometry, white1Material);
        louyuTopMesh.position.set(0, 138, 0);

        // 楼宇底部
        const louyuBottomGeometry = new THREE.BoxBufferGeometry(240, 2, 220);
        const louyuBottomMesh = new THREE.Mesh(louyuBottomGeometry, white1Material);
        louyuBottomMesh.position.set(0, -130, 0);

        // 底部网格
        const gridGroup = new THREE.Group();
        const geometry = new THREE.Geometry();
        gridGroup.position.y = -130;

        const gridNum = 200; // 网格数量
        const gridSize = 20; // 网格大小
        geometry.vertices.push(new THREE.Vector3(-gridNum, 0, 0));
        geometry.vertices.push(new THREE.Vector3(gridNum, 0, 0));

        for (let i = 0; i <= 20; i++) {
            const line1 = new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({ color: '#555555' })
            );
            line1.position.z = i * gridSize - gridNum;
            gridGroup.add(line1);

            const line2 = new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({ color: '#555555' })
            );
            line2.position.x = i * gridSize - gridNum;
            line2.rotation.y = (90 * Math.PI) / 180;
            gridGroup.add(line2);
        }

        // 楼宇装饰
        const louyuDecorationGeometry = new THREE.BoxBufferGeometry(190, 5, 110);
        const louyuDecorationMesh = new THREE.Mesh(louyuDecorationGeometry, white2Material);
        louyuDecorationMesh.position.set(0, 100, 0);
        const louyuDecoration2Mesh = louyuDecorationMesh.clone();
        louyuDecoration2Mesh.position.set(0, 120, 0);

        louyuGroup.add(
            louyuMesh,
            // cylinderGroup,
            louyuTopMesh,
            louyuDecorationMesh,
            louyuDecoration2Mesh,
            louyuBottomMesh,
            gridGroup
        );
        scene.add(louyuGroup);
        // 楼宇组结束

        // ---------------------------------------------------------------------------------------------
        // 相机
        const camera = new THREE.PerspectiveCamera(100, winWidth / winHeight, 0.1, 1000);
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
