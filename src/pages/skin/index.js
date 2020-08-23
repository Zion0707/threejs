import React, { useEffect, useState } from 'react';
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

    // 更换皮肤
    const changeSkin = (color) => {
        switch (color) {
            case 'red':
                selectedObjects.map = THREE.ImageUtils.loadTexture(cocaRed);
                break;
            case 'orange':
                selectedObjects.map = THREE.ImageUtils.loadTexture(cocaOrange);
                break;
            case 'blue':
                selectedObjects.map = THREE.ImageUtils.loadTexture(cocaBlue);
                break;
        }
    };

    const init = (domMsg) => {
        const { winWidth, winHeight, el } = domMsg;
        // 场景
        const scene = new THREE.Scene();

        const objLoader = new OBJLoader();
        objLoader.load(fileObj, (obj) => {
            obj.scale.set(0.1, 0.1, 0.1);
            obj.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    selectedObjects = child.material[0];
                    selectedObjects.map = THREE.ImageUtils.loadTexture(cocaRed);
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
        const domMsg = wrapMsg();
        init(domMsg);
    }, []);

    return (
        <div id="content">
            <ul className="skin-list" id="skin_list">
                {/* <li data-color="red"></li>
                <li data-color="orange"></li>
                <li data-color="blue"></li> */}
                <li
                    onClick={() => {
                        changeSkin('red');
                    }}
                ></li>
                <li
                    onClick={() => {
                        changeSkin('orange');
                    }}
                ></li>
                <li
                    onClick={() => {
                        changeSkin('blue');
                    }}
                ></li>
            </ul>
        </div>
    );
}

export default Line;
