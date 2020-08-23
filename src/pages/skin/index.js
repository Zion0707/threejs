import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import fileObj from 'static/media/coca/file.obj';
import cocaRed from 'static/media/coca/coca_red.jpg';
import cocaOrange from 'static/media/coca/coca_orange.jpg';
import cocaBlue from 'static/media/coca/coca_blue.jpg';

import './index.css';
function Line() {
    let selectedObjects = null;

    // 更换皮肤
    const changeSkin = (color) => {
        // 纹理
        let TextureLoader = null;
        switch (color) {
            case 'red':
                TextureLoader = new THREE.TextureLoader().load(cocaRed);
                break;
            case 'orange':
                TextureLoader = new THREE.TextureLoader().load(cocaOrange);
                break;
            case 'blue':
                TextureLoader = new THREE.TextureLoader().load(cocaBlue);
                break;
            default:
        }

        selectedObjects[0] = new THREE.MeshBasicMaterial({
            map: TextureLoader,
        });
    };

    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        const objLoader = new OBJLoader();
        objLoader.load(fileObj, (obj) => {
            obj.scale.set(0.1, 0.1, 0.1);
            obj.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    selectedObjects = child.material;
                    // selectedObjects.map = THREE.ImageUtils.loadTexture(cocaRed);
                    selectedObjects[0] = new THREE.MeshBasicMaterial({
                        map: new THREE.TextureLoader().load(cocaRed),
                    });
                }
            });
            scene.add(obj);
        });

        // ------------------------------------------------------------------------------------------
        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(10, 30, 100);
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
        init();
    });

    return (
        <div id="content">
            <ul className="skin-btn">
                <li
                    className="skin-btn--red"
                    onClick={() => {
                        changeSkin('red');
                    }}
                ></li>
                <li
                    className="skin-btn--orange"
                    onClick={() => {
                        changeSkin('orange');
                    }}
                ></li>
                <li
                    className="skin-btn--blue"
                    onClick={() => {
                        changeSkin('blue');
                    }}
                ></li>
            </ul>
        </div>
    );
}

export default Line;