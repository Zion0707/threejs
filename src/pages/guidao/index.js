// 漂浮元素上升
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
import './index.css';
import Stats from 'three/examples/jsm/libs/stats.module.js';

function FadeInOut() {
    const contentRef = useRef();

    const modelLoad = () => {
        const el = contentRef.current;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

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
        const scene = new THREE.Scene();

        // 场景 start
        // ---------------------------------------------------------------------------------------------

        // // 小的元素必须在大物体之上才可能不被吞并
        // const box2Geometry = new THREE.BoxGeometry(3, 3, 3);
        // const box2Material = new THREE.MeshLambertMaterial({
        //     color: '#f00',
        //     transparent: true,
        //     opacity: 1,
        // });
        // const box2Mesh = new THREE.Mesh(box2Geometry, box2Material);
        // box2Mesh.name = '红色立方体';
        // scene.add(box2Mesh);

        // const box1Geometry = new THREE.BoxGeometry(6, 6, 6);
        // const box1Material = new THREE.MeshLambertMaterial({
        //     color: '#fff',
        //     transparent: true,
        //     opacity: 0.5,
        //     side: THREE.DoubleSide,
        // });
        // const box1Mesh = new THREE.Mesh(box1Geometry, box1Material);
        // box1Mesh.name = '白色立方体';
        // box1Mesh.receiveShadow = true;
        // scene.add(box1Mesh);

        const starsGeometry = new THREE.Geometry();
        for (let i = 0; i < 10000; i++) {
            const star = new THREE.Vector3();
            star.x = THREE.Math.randFloatSpread(100);
            star.y = THREE.Math.randFloatSpread(100);
            star.z = THREE.Math.randFloatSpread(100);
            starsGeometry.vertices.push(star);
        }
        const starsMaterial = new THREE.PointsMaterial({ color: '#f00' });
        const starField = new THREE.Points(starsGeometry, starsMaterial);
        starField.scale.set(5, 5, 5);
        scene.add(starField);

        // ---------------------------------------------------------------------------------------------
        // 场景 end

        // 渲染频率及内存
        const stats = new Stats();
        document.body.appendChild(stats.dom);

        // 元素点击事件
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        renderer.domElement.onclick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            console.log(intersects);
            if (intersects.length > 0) {
                intersects.forEach((item) => {
                    console.log(item.object.name);
                });
            }
        };

        // // 辅助线
        // const axes = new THREE.AxisHelper(20);
        // scene.add(axes);

        const grid = new THREE.GridHelper(200, 40, '#000', '#000');
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        grid.position.y = -4;
        scene.add(grid);

        // 鼠标控制旋转
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        // orbitControls.autoRotate = false;
        // orbitControls.enableZoom = false;
        orbitControls.minDistance = 100; // 最大缩放值，值越小模型越大
        orbitControls.maxDistance = 500; // 最小缩放值，值越大模型越小
        // orbitControls.maxPolarAngle = Math.PI * 0.5; // 限制鼠标拖拽角度
        orbitControls.enablePan = false; // 禁止鼠标右键拖拽

        // 设置光源
        const light = new THREE.DirectionalLight('#ffffff', 0.5);
        light.position.set(400, 200, 300);
        scene.add(light);
        scene.add(new THREE.AmbientLight('#ffffff', 0.5));

        // 亮白光光源映射
        // const pointLight = new THREE.PointLight('#ffffff', 1, 100);
        // pointLight.position.set(10, 10, 10);
        // scene.add(pointLight);

        // const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        // hemiLight.position.set(0, 20, 0);
        // scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(0, 20, 10);
        scene.add(dirLight);

        el.append(renderer.domElement);

        function render() {
            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);

            TWEEN.update();

            stats.update();
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
