import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

function Test() {
    const init = () => {
        // dom元素生成
        const contentEl = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        contentEl.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        const scene = new THREE.Scene();
        const geometry = new THREE.SphereGeometry(5, 100, 100);
        const material = new THREE.MeshLambertMaterial({
            color: '#fff',
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // 点光源
        const point = new THREE.PointLight('#fff');
        point.position.set(20, 30, 10); // 点光源位置
        scene.add(point); // 点光源添加到场景中
        // // 环境光
        // const ambient = new THREE.AmbientLight('#444');
        // scene.add(ambient);

        const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(0, 0, 1);
        plane.rotateX(30);
        scene.add(plane);

        // --------------------------------------------------------------------------------

        const camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 0.1, 200);
        camera.position.set(10, 30, 10);
        camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)

        const renderer = new THREE.WebGLRenderer({ antialias: true });

        new OrbitControls(camera, renderer.domElement);

        // 设置渲染器的颜色和大小
        renderer.setClearColor('#000');
        renderer.setSize(winWidth, winHeight);
        contentEl.append(renderer.domElement);

        // 执行实时刷新
        function render() {
            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);

            if (plane.position.z >= 5) {
                plane.position.z -= 0.1;
            } else {
                plane.position.z += 0.1;
            }
        }
        render();
    };
    useEffect(() => {
        init();
    });
    return <div id="content"></div>;
}
export default Test;
