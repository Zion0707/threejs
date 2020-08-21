import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import model from 'static/media/logo/file.obj';
import skin from 'static/media/logo/file.png';

function Line() {
    const wrapMsg = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        return {
            winWidth,
            winHeight,
            el,
        };
    };

    const init = (domMsg) => {
        const { winWidth, winHeight, el } = domMsg;
        // 场景
        const scene = new THREE.Scene();
        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(50, 30, 100);
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
        const light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.setScalar(100);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        // 添加灰色网格线
        scene.add(new THREE.GridHelper(20, 20));
        scene.add(new THREE.AxesHelper(2));

        // 导入obj模型
        const objLoader = new OBJLoader();
        objLoader.load(model, function (object) {
            // 设置模型缩放比例
            object.scale.set(0.1, 0.1, 0.1);
            // 设置模型的坐标
            object.position.set(-15, 0, 0);

            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    // 设置模型皮肤
                    child.material.map = THREE.ImageUtils.loadTexture(skin);
                }
            });
            // 将模型添加到场景中
            scene.add(object);
        });

        el.append(renderer.domElement);

        function render() {
            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);
        }
        render();
    };
    useEffect(() => {
        const domMsg = wrapMsg();
        init(domMsg);
    }, []);

    return <div id="content"></div>;
}

export default Line;
