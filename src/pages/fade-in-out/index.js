// 漂浮元素上升
import React, { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import './index.css';

function FadeInOut() {
    const contentRef = useRef();

    const modelLoad = () => {
        const el = contentRef.current;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();
        // ---------------------------------------------------------------------------------------------

        const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
        const boxMaterial = new THREE.MeshBasicMaterial({
            color: '#FFFFFF',
            transparent: true,
            opacity: 0.1,
        });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        scene.add(boxMesh);

        // 渐隐渐现动画执行
        const tween1 = new TWEEN.Tween(boxMaterial)
            .to({ opacity: 1 }, 2000)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(() => {
                if (boxMaterial.opacity >= 1) {
                    tween2.start();
                }
            });

        const tween2 = new TWEEN.Tween(boxMaterial)
            .to({ opacity: 0.1 }, 2000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
                if (boxMaterial.opacity <= 0.1) {
                    tween1.start();
                }
            });
        tween1.start();

        // ---------------------------------------------------------------------------------------------
        // // 辅助线
        // const axes = new THREE.AxisHelper(20);
        // scene.add(axes);

        // 相机
        const camera = new THREE.PerspectiveCamera(20, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(150, 50, 300);
        // camera.position.set(0, 100, 300);

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
        // orbitControls.autoRotate = false;
        // orbitControls.enableZoom = false;
        orbitControls.minDistance = 200; // 最大缩放值，值越小模型越大
        orbitControls.maxDistance = 500; // 最小缩放值，值越大模型越小
        // orbitControls.maxPolarAngle = Math.PI * 0.5; // 限制鼠标拖拽角度
        orbitControls.enablePan = false; // 禁止鼠标右键拖拽

        // 设置光源
        const light = new THREE.DirectionalLight('#ffffff', 0.5);
        light.position.set(400, 200, 300);
        scene.add(light);
        scene.add(new THREE.AmbientLight('#ffffff', 0.5));

        // 亮白光光源映射
        const pointLight = new THREE.PointLight('#ffffff', 1, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        el.append(renderer.domElement);

        function render() {
            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);

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
        modelLoad();
    }, []);
    return (
        <>
            <div id="content" ref={contentRef}></div>
        </>
    );
}
export default FadeInOut;
