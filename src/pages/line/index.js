import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import img400x400 from 'static/images/400x400.png';
import img200x100 from 'static/images/200x100.png';
const imgsArr = [img400x400, img200x100];

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

    // 图片加载情况
    const imgLoad = async () => {
        const loader = new THREE.ImageLoader();
        const imgs = [];
        imgsArr.forEach((item) => {
            const p = new Promise((reslove) => {
                loader.load(item, (img) => {
                    reslove(img);
                });
            });
            imgs.push(p);
        });
        const res = await Promise.all(imgs);
        return res;
    };

    const init = (domMsg, imgLoadRes) => {
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
        renderer.setClearColor(0x404040);
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

        const box = new THREE.BoxGeometry(5, 5, 5);
        const mbm = new THREE.MeshBasicMaterial({ color: '#ddd' });
        const mesh = new THREE.Mesh(box, mbm);
        mesh.name = 'zhangsan';

        const boxChild = new THREE.BoxGeometry(3, 3, 3);
        const mbmChild = new THREE.MeshBasicMaterial({ color: '#f00' });
        const meshChild = new THREE.Mesh(boxChild, mbmChild);
        meshChild.position.set(-10, 0, 0);

        mesh.add(meshChild);
        scene.add(mesh);

        el.append(canvas);

        // 事件触发
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        canvas.addEventListener('click', (event) => {
            mouse.x = (event.clientX / winWidth) * 2 - 1;
            mouse.y = -(event.clientY / winHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            intersects.forEach((item) => {
                item.object.material.color.set('#ff0');
                console.log(item);
            });
        });

        function render() {
            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);
        }
        render();
    };
    useEffect(() => {
        const loadPost = async () => {
            const imgLoadRes = await imgLoad();
            const domMsg = wrapMsg();
            init(domMsg, imgLoadRes);
        };

        loadPost();
    }, []);

    return <div id="content"></div>;
}

export default Line;
