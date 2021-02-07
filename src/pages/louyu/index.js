import React, { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import imgBg from './bg.jpg';
import imgYq from './yq.png';

import './index.css';

function Louyu() {
    const contentRef = useRef();
    const init = () => {
        const el = contentRef.current;
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

        // 楼宇贴纸
        const bgTexture1 = new THREE.TextureLoader().load(imgBg);
        bgTexture1.repeat.set(1, 1);
        bgTexture1.wrapS = THREE.RepeatWrapping;
        bgTexture1.wrapT = THREE.RepeatWrapping;
        const louyuMaterial = new THREE.MeshLambertMaterial({
            map: bgTexture1,
            transparent: true,
            opacity: 1,
        });

        // 底部圆圈
        const yqTexture1 = new THREE.TextureLoader().load(imgYq);
        yqTexture1.repeat.set(1, 1);
        yqTexture1.wrapS = THREE.RepeatWrapping;
        yqTexture1.wrapT = THREE.RepeatWrapping;
        const yqMaterial = new THREE.MeshLambertMaterial({
            map: yqTexture1,
            transparent: true,
            opacity: 0.5,
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
            louyuMaterial,
            louyuMaterial,
        ]);
        louyuMesh.name = '楼宇主体';

        // 楼宇顶部
        const louyuTopGeometry = new THREE.BoxBufferGeometry(140, 18, 101);
        const louyuTopMesh = new THREE.Mesh(louyuTopGeometry, white1Material);
        louyuTopMesh.position.set(0, 138, 0);

        // 楼宇白色底盘
        const louyuBottomGeometry = new THREE.CylinderBufferGeometry(130, 130, 2, 150);
        const louyuBottomMesh = new THREE.Mesh(louyuBottomGeometry, white1Material);
        louyuBottomMesh.position.set(0, -130, 0);

        // // 底部网格
        // const gridGroup = new THREE.Group();
        // const gridGeometry = new THREE.Geometry();
        // gridGroup.position.y = -130;

        // const gridNum = 200; // 网格数量
        // const gridSize = 20; // 网格大小
        // gridGeometry.vertices.push(new THREE.Vector3(-gridNum, 0, 0));
        // gridGeometry.vertices.push(new THREE.Vector3(gridNum, 0, 0));

        // for (let i = 0; i <= 20; i++) {
        //     const line1 = new THREE.Line(
        //         gridGeometry,
        //         new THREE.LineBasicMaterial({ color: '#555555' })
        //     );
        //     line1.position.z = i * gridSize - gridNum;
        //     gridGroup.add(line1);

        //     const line2 = new THREE.Line(
        //         gridGeometry,
        //         new THREE.LineBasicMaterial({ color: '#555555' })
        //     );
        //     line2.position.x = i * gridSize - gridNum;
        //     line2.rotation.y = (90 * Math.PI) / 180;
        //     gridGroup.add(line2);
        // }

        // 楼宇装饰
        const louyuDecorationGeometry = new THREE.BoxBufferGeometry(190, 5, 110);
        const louyuDecorationMesh = new THREE.Mesh(louyuDecorationGeometry, white2Material);
        louyuDecorationMesh.position.set(0, 100, 0);
        const louyuDecoration2Mesh = louyuDecorationMesh.clone();
        louyuDecoration2Mesh.position.set(0, 120, 0);

        // 底部圆圈
        const yqGeometry = new THREE.CylinderBufferGeometry(190, 190, 1, 150);
        const yqMesh1 = new THREE.Mesh(yqGeometry, [
            null,
            yqMaterial,
            yqMaterial,
            null,
            null,
            null,
        ]);
        yqMesh1.position.set(0, -134, 0);

        const yqGeometry2 = new THREE.CylinderBufferGeometry(170, 170, 1, 150);
        const yqMesh2 = new THREE.Mesh(yqGeometry2, [
            null,
            yqMaterial,
            yqMaterial,
            null,
            null,
            null,
        ]);
        yqMesh2.position.set(0, -130, 0);

        louyuGroup.add(
            louyuMesh,
            // cylinderGroup,
            louyuTopMesh,
            louyuDecorationMesh,
            louyuDecoration2Mesh,
            louyuBottomMesh,
            yqMesh1,
            yqMesh2
            // gridGroup
        );
        scene.add(louyuGroup);
        // 楼宇组结束

        // ---------------------------------------------------------------------------------------------
        // 相机
        const camera = new THREE.PerspectiveCamera(100, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(0, 100, 300);

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
        // orbitControls.enableZoom = false;
        orbitControls.minDistance = 200; // 最大缩放值，值越小模型越大
        orbitControls.maxDistance = 700; // 最小缩放值，值越大模型越小

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
            // 动画元素执行
            yqMesh1.rotation.y += 0.015;
            yqMesh2.rotation.y -= 0.015;
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
        <>
            <div id="content" ref={contentRef}></div>
        </>
    );
}
export default Louyu;
