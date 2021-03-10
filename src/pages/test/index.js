import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { useHistory } from 'react-router-dom';

import './index.css';

function Test() {
    const history = useHistory();

    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setClearColor('#fff');
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;

        // canvas 绘制
        function getTextCanvas(text) {
            const width = 400;
            const height = 400;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ddd';
            ctx.fillRect(0, 0, width, height);
            ctx.font = '50px Microsoft YaHei';
            ctx.fillStyle = '#2891FF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, width / 2, height / 2);
            return canvas;
        }

        // canvas 纹理
        const cvsTexture = new THREE.CanvasTexture(getTextCanvas('张三'));
        const cvsGeometry = new THREE.BoxGeometry(5, 5, 0.1);
        const cvsMaterial = new THREE.MeshBasicMaterial({
            map: cvsTexture, // 设置纹理贴图
            transparent: true,
        });
        const cvsMesh = new THREE.Mesh(cvsGeometry, [
            null,
            null,
            null,
            null,
            cvsMaterial,
            cvsMaterial,
        ]);
        scene.add(cvsMesh);

        // 添加三维辅助线
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        // position and point the camera to the center of the scene
        camera.position.set(0, 0, 50);
        camera.lookAt(scene.position);

        // add spotlight for the shadows
        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);

        // add the output of the renderer to the html element
        el.append(renderer.domElement);

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.autoRotate = false;

        // call the render function
        renderer.render(scene, camera);

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

    return (
        <div id="content">
            <button
                onClick={() => {
                    history.push('/keep-alive');
                }}
            >
                去页面
            </button>
        </div>
    );
}
export default Test;
