import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import './index.css';

function EventClick() {
    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        // 黄色几何元素
        const yellowBoxGeometry = new THREE.BoxGeometry(10, 10, 10);
        const yellowBoxMaterial = new THREE.MeshLambertMaterial({
            color: 'yellow',
            transparent: true,
            opacity: 0.5,
        });
        const yellowMesh = new THREE.Mesh(yellowBoxGeometry, yellowBoxMaterial);
        yellowMesh.name = '黄色立方体';

        // 红色几何元素
        const redBoxGeometry = new THREE.BoxGeometry(5, 5, 5);
        const redBoxMaterial = new THREE.MeshLambertMaterial({
            color: 'red',
        });
        const redMesh = new THREE.Mesh(redBoxGeometry, redBoxMaterial);
        redMesh.name = '红色立方体';

        scene.add(yellowMesh, redMesh);

        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(10, 30, 100);

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
        // scene.add(new THREE.AxesHelper(5));

        el.append(renderer.domElement);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        // 点击更改颜色
        renderer.domElement.onclick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            console.log(intersects);
            if (intersects.length > 0) {
                intersects.forEach((item) => {
                    if (item.object.name === '红色立方体') {
                        item.object.material = new THREE.MeshLambertMaterial({ color: 'white' });
                    }
                });
            }
        };

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
export default EventClick;
