import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import cocaSlider from 'static/media/coca/coca_slider.jpg';
import cocaTop from 'static/media/coca/coca_top.png';
import cocaObj from 'static/media/coca/file.obj';

function PsCoca() {
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
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        // 设置渲染器的颜色和大小
        renderer.setClearColor('#000');
        renderer.setSize(winWidth, winHeight);
        const canvas = renderer.domElement;
        document.body.appendChild(canvas);

        // 鼠标控制旋转
        new OrbitControls(camera, canvas);

        // 设置光源
        const light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.setScalar(100);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        const objLoader = new OBJLoader();
        objLoader.load(cocaObj, (obj) => {
            obj.position.set(0, -10, 0);
            obj.scale.set(0.1, 0.1, 0.1);
            obj.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    console.log(child.material[0]);
                    console.log(child.material[1]);
                    // 设置模型皮肤
                    child.material[0].map = THREE.ImageUtils.loadTexture(cocaSlider);
                    child.material[1].map = THREE.ImageUtils.loadTexture(cocaTop);
                }
            });

            scene.add(obj);
        });

        // 把canvas元素添加到指定元素中
        el.append(canvas);

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

export default PsCoca;
