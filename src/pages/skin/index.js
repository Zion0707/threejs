import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import fileObj from 'static/media/coca/file.obj';
import cocaRed from 'static/media/coca/coca_red.jpg';
import cocaOrange from 'static/media/coca/coca_orange.jpg';
import cocaBlue from 'static/media/coca/coca_blue.jpg';

import './index.css';
function Skin() {
    // obj对象需贴图的面，为数据对象
    let objLoaderMaterialArr = [];

    // 更换皮肤
    const changeSkin = (color) => {
        // 纹理设置
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
        // 给第一个纹理面设置相关图片
        objLoaderMaterialArr[0] = new THREE.MeshLambertMaterial({
            map: TextureLoader,
        });
    };

    const init = () => {
        // dom元素生成
        const contentEl = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        contentEl.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        // obj 元素加载器
        const objLoader = new OBJLoader();
        objLoader.load(fileObj, (obj) => {
            obj.scale.set(0.1, 0.1, 0.1);
            obj.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    // 获取需贴纸的材质列表
                    objLoaderMaterialArr = child.material;
                    // 给第一个纹理面设置相关图片
                    objLoaderMaterialArr[0] = new THREE.MeshLambertMaterial({
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
        contentEl.append(canvas);

        // 鼠标控制旋转
        const orbitControls = new OrbitControls(camera, canvas);
        // 设置自动旋转及旋转速度
        orbitControls.autoRotate = true;
        orbitControls.autoRotateSpeed = 10;

        // 设置光源
        const light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.setScalar(100);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        // 执行实时刷新
        function render() {
            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);

            orbitControls.update();
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

export default Skin;
