import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import fileObj from 'static/media/coca/file.obj';
import cocaRed from 'static/media/coca/coca_red.jpg';
import * as THREE from 'three';
import './index.css';

function Building() {
    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        // 楼宇组开始
        let objLoaderMaterialArr = [];
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

            console.log(obj);
            obj.opacity = 0.1;
            scene.add(obj);
        });

        const buildingGroup = new THREE.Group();
        const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        buildingGroup.add(cube);
        scene.add(buildingGroup);
        // 楼宇组结束

        // ---------------------------------------------------------------------------------------------
        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 1, 1000);
        // 设置相机坐标
        camera.position.set(0, 0, 300);

        // 渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // 设置渲染器的颜色和大小
        renderer.setClearColor('#040b1a');
        renderer.setSize(winWidth, winHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // 高清设置

        // 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。
        // 这就是渲染器用来显示场景给我们看的<canvas>元素
        document.body.appendChild(renderer.domElement);

        // 鼠标控制旋转
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.autoRotate = false;

        // 设置光源
        const light = new THREE.DirectionalLight('#FFFFFF', 0.5);
        light.position.setScalar(100);
        scene.add(light);
        scene.add(new THREE.AmbientLight('#FFFFFF', 0.5));

        el.append(renderer.domElement);

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
    return <div id="content"></div>;
}
export default Building;
