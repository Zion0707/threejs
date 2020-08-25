import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import './index.css';

function CarStart() {
    let carGroupGlobal = null;
    let carStartSwitch = false;
    const carStart = () => {
        if (carGroupGlobal) {
            // 使用tween进行补间
            const zNum = 10; // 汽车要行驶的距离
            const tween = new TWEEN.Tween(carGroupGlobal.position)
                .to({ z: zNum })
                .easing(TWEEN.Easing.Quadratic.Out)
                .onStart(() => {
                    carStartSwitch = true;
                })
                .onStop(() => {
                    carStartSwitch = false;
                })
                .onUpdate(() => {
                    if (carGroupGlobal.position.z >= zNum) {
                        tween.stop();
                    }
                });
            tween.start();
        }
    };

    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        const carGroup = new THREE.Group();
        carGroup.position.z = -50;
        carGroup.name = '汽车组';
        carGroupGlobal = carGroup;

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
        const carShaft = new THREE.CylinderGeometry(1, 1, 26, 32);
        const carShaftMaterial = new THREE.MeshLambertMaterial({
            color: '#fff',
            transparent: true,
        });
        const carShaftBefore = new THREE.Mesh(carShaft, carShaftMaterial);
        carShaftBefore.name = '前轴';
        carShaftBefore.rotation.set(33, 0, 33);
        carShaftBefore.position.z = -8;

        const carShaftAfter = carShaftBefore.clone();
        carShaftAfter.name = '后轴';
        carShaftAfter.position.z = 8;

        // 添加到组里面
        carGroup.add(
            carBodyMesh,
            carWheelsLeftBefore,
            carWheelsRightBefore,
            carWheelsLeftAfter,
            carWheelsRightAfter,
            carShaftBefore,
            carShaftAfter
        );
        scene.add(carGroup);

        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(180, 0, 100);
        // 渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });

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

        // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
        scene.add(new THREE.AxesHelper(5));

        el.append(renderer.domElement);

        function render() {
            // 汽车运动
            if (carStartSwitch) {
                carWheelsLeftBefore.rotation.x += 0.05;
                carWheelsLeftAfter.rotation.x += 0.05;
                carWheelsRightBefore.rotation.x += 0.05;
                carWheelsRightAfter.rotation.x += 0.05;
            }

            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);

            TWEEN.update();
        }
        render();
    };
    useEffect(() => {
        init();
    });
    return (
        <div id="content">
            <ul>
                <li>
                    <button onClick={carStart}>启动汽车</button>
                </li>
            </ul>
        </div>
    );
}
export default CarStart;
