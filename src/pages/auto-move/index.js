import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import './index.css';

function AutoMove() {
    let boxMaterial = null;
    const setOpacity = () => {
        boxMaterial.opacity = 0.5;
        boxMaterial.transparent = true;
    };

    const init = () => {
        // dom元素生成
        const contentEl = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        contentEl.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        const scene = new THREE.Scene();

        const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
        const mlm = new THREE.MeshLambertMaterial({ color: '#ffffff' });
        const mesh = new THREE.Mesh(boxGeometry, mlm);
        boxMaterial = mlm;
        scene.add(mesh);

        const point = new THREE.PointLight('#fff');
        point.position.set(20, 30, 10);
        scene.add(point);

        // const light = new THREE.DirectionalLight('#fff', 1);
        // scene.add(light);

        // --------------------------------------------------------------------------------

        const camera = new THREE.PerspectiveCamera(130, winWidth / winHeight, 0.1, 200);
        camera.position.set(10, 30, 10);
        camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)

        const renderer = new THREE.WebGLRenderer({ antialias: true });

        new OrbitControls(camera, renderer.domElement);

        // 设置渲染器的颜色和大小
        renderer.setClearColor('#000');
        renderer.setSize(winWidth, winHeight);
        contentEl.append(renderer.domElement);

        let meshs = true;
        // 执行实时刷新
        function render() {
            if (meshs) {
                mesh.position.x += 0.05;
                if (mesh.position.x >= 5) {
                    meshs = false;
                }
            } else {
                mesh.position.x -= 0.05;
                if (mesh.position.x <= -5) {
                    meshs = true;
                }
            }

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
                <li>
                    <button
                        onClick={() => {
                            setOpacity();
                        }}
                    >
                        变半透明
                    </button>
                </li>
            </ul>
        </div>
    );
}
export default AutoMove;
