import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import './index.css';

function Test() {
    const init = () => {
        // dom元素生成
        const contentEl = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        contentEl.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        const scene = new THREE.Scene();

        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshLambertMaterial({
            color: '#0000ff',
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        setTimeout(() => {
            scene.remove(mesh);
        }, 1000);

        const light = new THREE.DirectionalLight('#fff', 1);
        scene.add(light);

        // --------------------------------------------------------------------------------

        const camera = new THREE.PerspectiveCamera(130, winWidth / winHeight, 0.1, 200);
        camera.position.set(10, 30, 10);
        camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)

        const renderer = new THREE.WebGLRenderer({ antialias: true });

        new OrbitControls(camera, renderer.domElement);

        // 设置渲染器的颜色和大小
        renderer.setClearColor('#f1f1f1');
        renderer.setSize(winWidth, winHeight);
        renderer.shadowMapEnabled = true;
        contentEl.append(renderer.domElement);

        // let options = true;
        // 执行实时刷新
        function render() {
            // if (options) {
            //     mlm.opacity += 0.01;
            //     if (mlm.opacity >= 1) {
            //         options = false;
            //     }
            // } else {
            //     mlm.opacity -= 0.01;
            //     if (mlm.opacity <= 0) {
            //         options = true;
            //     }
            // }

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
