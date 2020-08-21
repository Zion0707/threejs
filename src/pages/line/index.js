import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
        scene.add(new THREE.AxesHelper());

        const geometry = new THREE.BoxGeometry(1, 1, 1); // 创建一个立方体几何对象Geometry
        const material = new THREE.MeshBasicMaterial({
            color: '#f00',
        }); // 材质对象Material
        const mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
        scene.add(mesh); // 网格模型添加到场景中

        // // logo 对象
        // const objLoader = new THREE.ObjectLoader();
        // objLoader.load(logoObj, (obj) => {
        //     console.log(obj);
        // });

        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 2000);
        camera.position.set(2, 2, 20);

        // 渲染器
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setSize(winWidth, winHeight);

        // 控制器
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.update();

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        el.append(renderer.domElement);
    };
    useEffect(() => {
        const domMsg = wrapMsg();
        init(domMsg);
    }, []);

    return <div id="content"></div>;
}

export default Line;
