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

        const carGroup = new THREE.Group();
        carGroup.name = '汽车组';

        // 车身
        const carBodyGeometry = new THREE.BoxGeometry(20, 4, 30);
        carBodyGeometry.name = '车身';
        const carBodyMaterial = new THREE.MeshLambertMaterial({ color: '#fff', transparent: true });
        carBodyMaterial.opacity = 0.5;
        const carBodyMesh = new THREE.Mesh(carBodyGeometry, carBodyMaterial);

        // 车轮
        const carWheels = new THREE.CylinderGeometry(5, 5, 4, 32);
        const carWheelsMaterial = new THREE.MeshLambertMaterial({
            color: '#000',
            transparent: true,
            wireframe: true,
        });
        const carWheelsLeftBefore = new THREE.Mesh(carWheels, carWheelsMaterial);
        carWheelsLeftBefore.name = '左前轮';
        carWheelsLeftBefore.rotation.x = 33;
        carWheelsLeftBefore.rotation.z = 33;
        carWheelsLeftBefore.position.x = 10;
        carWheelsLeftBefore.position.z = 8;

        const carWheelsRightBefore = carWheelsLeftBefore.clone();
        carWheelsRightBefore.name = '右前轮';
        carWheelsRightBefore.position.x = -10;
        carWheelsRightBefore.position.z = 8;

        const carWheelsLeftAfter = carWheelsLeftBefore.clone();
        carWheelsLeftAfter.name = '左后轮';
        carWheelsLeftAfter.position.x = 10;
        carWheelsLeftAfter.position.z = -8;

        const carWheelsRightAfter = carWheelsLeftBefore.clone();
        carWheelsRightAfter.name = '右后轮';
        carWheelsRightAfter.position.x = -10;
        carWheelsRightAfter.position.z = -8;

        // 车轴
        const carShaft = new THREE.CylinderGeometry(1, 1, 10, 32);
        const carShaftMaterial = new THREE.MeshLambertMaterial({
            color: '#fff',
            transparent: true,
        });
        const carShaftMesh = new THREE.Mesh(carShaft, carShaftMaterial);

        // 添加到组里面
        carGroup.add(
            carBodyMesh,
            carWheelsLeftBefore,
            carWheelsRightBefore,
            carWheelsLeftAfter,
            carWheelsRightAfter,
            carShaftMesh
        );
        scene.add(carGroup);

        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(150, 50, 50);
        // 渲染器
        const renderer = new THREE.WebGLRenderer();

        // 设置渲染器的颜色和大小
        renderer.setClearColor(0x404040);
        renderer.setSize(winWidth, winHeight);
        // 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。
        // 这就是渲染器用来显示场景给我们看的<canvas>元素
        document.body.appendChild(renderer.domElement);

        // 鼠标控制旋转
        new OrbitControls(camera, renderer.domElement);

        // 设置光源
        const light = new THREE.DirectionalLight('#fff', 0.5);
        light.position.setScalar(100);
        scene.add(light);
        scene.add(new THREE.AmbientLight('#fff', 0.5));

        // 添加灰色网格线
        scene.add(new THREE.AxesHelper(5));

        el.append(renderer.domElement);

        function render() {
            carWheelsLeftBefore.rotation.x += 2;
            carWheelsLeftAfter.rotation.x += 2;
            carWheelsRightBefore.rotation.x += 2;
            carWheelsRightAfter.rotation.x += 2;

            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);
        }
        render();
    };
    useEffect(() => {
        init();
    });
    return (
        <div id="content">
            <ul>
                <li></li>
            </ul>
        </div>
    );
}
export default Test;
