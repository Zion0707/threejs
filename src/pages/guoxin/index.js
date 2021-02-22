// 国信投资大厦
import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import './index.css';
import logoImg from './images/logo.jpg';
import mapImg from './images/map.png';
const imgsArr = [logoImg, mapImg];

function Guoxin() {
    const [mapLoading, setMapLoading] = useState(true);
    const contentRef = useRef();

    // 图片加载
    const imgLoad = async () => {
        const pArr = [];
        imgsArr.forEach((item) => {
            const p = new Promise((reslove) => {
                const img = new Image();
                img.src = item;
                img.onload = () => {
                    reslove(img);
                };
            });
            pArr.push(p);
        });
        const res = await Promise.all(pArr);
        return res;
    };

    const modelLoad = () => {
        const el = contentRef.current;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        // 贴纸
        // logo 贴纸
        const logoTexture = new THREE.TextureLoader().load(logoImg);
        logoTexture.repeat.set(1, 1);
        logoTexture.wrapS = THREE.RepeatWrapping;
        logoTexture.wrapT = THREE.RepeatWrapping;
        const logoMaterial = new THREE.MeshLambertMaterial({
            map: logoTexture,
            transparent: true,
            opacity: 1,
        });

        const blueMaterial = new THREE.MeshLambertMaterial({
            color: '#a3c1d9',
            transparent: true,
            opacity: 1,
        });

        const whiteMaterial = new THREE.MeshLambertMaterial({
            color: '#90abc0',
            transparent: true,
            opacity: 0.8,
        });

        // ---------------------------------------------------------------------------------------------
        // 楼宇组开始
        const guoxinGroup = new THREE.Group();
        // guoxinGroup.scale.set(0.15, 0.15, 0.15);
        guoxinGroup.scale.set(0.05, 0.05, 0.05);
        guoxinGroup.name = '楼宇组';
        guoxinGroup.rotation.y = -2;

        // 旋转动画start
        const tween1 = new TWEEN.Tween(guoxinGroup.rotation)
            .to({ y: 0 }, 4000)
            .easing(TWEEN.Easing.Quadratic.Out);
        tween1.start();

        const tween2 = new TWEEN.Tween(guoxinGroup.scale)
            .to({ x: 0.15, y: 0.15, z: 0.15 }, 4000)
            .easing(TWEEN.Easing.Quadratic.Out);
        tween2.start();
        // 旋转动画end

        // 楼宇主体
        const bodyGeometry = new THREE.BoxBufferGeometry(140, 310, 100);
        const bodyMesh = new THREE.Mesh(bodyGeometry, blueMaterial);
        bodyMesh.name = '楼宇主体';
        bodyMesh.position.y = 5;

        // 楼宇正面小长方形
        const positiveGeometry = new THREE.BoxBufferGeometry(20, 70, 8);
        const positiveMesh = new THREE.Mesh(positiveGeometry, whiteMaterial);
        positiveMesh.name = '楼宇正面小长方形';
        positiveMesh.position.set(0, 125, 54);

        // 楼宇logo
        const logoGeometry = new THREE.BoxBufferGeometry(140, 40, 1);
        const logoMesh = new THREE.Mesh(logoGeometry, [null, null, null, null, logoMaterial, null]);
        logoMesh.name = '楼宇正面logo';
        logoMesh.position.set(0, 140, 50);

        // 楼宇左边侧面组
        const floorLeftGroup = new THREE.Group();
        floorLeftGroup.name = '楼宇左边组';
        floorLeftGroup.position.set(-110, 0, 0);

        const floorLeftCylindricalGeometry = new THREE.CylinderBufferGeometry(35, 35, 249.9, 14);
        const floorLeftCylindricalMesh = new THREE.Mesh(floorLeftCylindricalGeometry, blueMaterial);
        floorLeftCylindricalMesh.name = '楼宇左边圆柱体';
        floorLeftCylindricalMesh.position.set(5, 25, -15);

        const floorLeftCuboidGeometry = new THREE.BoxBufferGeometry(35, 250, 70);
        const floorLeftCuboidMesh = new THREE.Mesh(floorLeftCuboidGeometry, blueMaterial);
        floorLeftCuboidMesh.name = '楼宇左边长方体';
        floorLeftCuboidMesh.position.set(22.5, 25, -15);

        const floorLeftBottomGeometry = new THREE.BoxBufferGeometry(80, 50, 100);
        const floorLeftBottomMesh = new THREE.Mesh(floorLeftBottomGeometry, blueMaterial);
        floorLeftBottomMesh.name = '楼宇左边底部长方体';
        floorLeftBottomMesh.position.set(0, -125, 0);

        floorLeftGroup.add(floorLeftCylindricalMesh, floorLeftCuboidMesh, floorLeftBottomMesh);

        // 楼宇右边侧面组
        const floorRightGroup = new THREE.Group();
        floorRightGroup.name = '楼宇右边组';
        floorRightGroup.position.set(110, 0, 0);

        const floorRightCylindricalGeometry = new THREE.CylinderBufferGeometry(35, 35, 249.9, 14);
        const floorRightCylindricalMesh = new THREE.Mesh(
            floorRightCylindricalGeometry,
            blueMaterial
        );
        floorRightCylindricalMesh.name = '楼宇右边圆柱体';
        floorRightCylindricalMesh.position.set(-5, 25, -15);

        const floorRightCuboidGeometry = new THREE.BoxBufferGeometry(35, 250, 70);
        const floorRightCuboidMesh = new THREE.Mesh(floorRightCuboidGeometry, blueMaterial);
        floorRightCuboidMesh.name = '楼宇右边长方体';
        floorRightCuboidMesh.position.set(-22.5, 25, -15);

        const floorRightBottomGeometry = new THREE.BoxBufferGeometry(80, 50, 100);
        const floorRightBottomMesh = new THREE.Mesh(floorRightBottomGeometry, blueMaterial);
        floorRightBottomMesh.name = '楼宇右边底部长方体';
        floorRightBottomMesh.position.set(0, -125, 0);

        floorRightGroup.add(floorRightCylindricalMesh, floorRightCuboidMesh, floorRightBottomMesh);

        // 背景设置start
        const mapBgTexture = new THREE.TextureLoader().load(mapImg);
        // mapBgTexture.wrapS = mapBgTexture.wrapT = THREE.RepeatWrapping;
        // mapBgTexture.repeat.set(25, 25);
        // mapBgTexture.anisotropy = 16;

        const mapBgMaterial = new THREE.MeshLambertMaterial({
            map: mapBgTexture,
            transparent: true,
            opacity: 0.3,
        });

        const mapMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1920 * 2, 1300 * 2),
            mapBgMaterial
        );
        mapMesh.position.y = -150;
        mapMesh.rotation.x = -Math.PI / 2;
        mapMesh.receiveShadow = true;
        // 背景设置end

        // 组里添加组件
        guoxinGroup.add(bodyMesh, logoMesh, positiveMesh, mapMesh, floorLeftGroup, floorRightGroup);
        scene.add(guoxinGroup);
        // 楼宇组结束
        // ---------------------------------------------------------------------------------------------

        // // 辅助线
        // const axes = new THREE.AxisHelper(20);
        // scene.add(axes);

        // 相机
        const camera = new THREE.PerspectiveCamera(20, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(150, 50, 300);
        // camera.position.set(0, 100, 300);

        // 渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        // 设置渲染器的颜色和大小
        // renderer.setClearColor('#040b1a');
        renderer.setClearAlpha(0);
        renderer.setSize(winWidth, winHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // 高清设置

        // 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。
        // 这就是渲染器用来显示场景给我们看的<canvas>元素
        document.body.appendChild(renderer.domElement);

        // 鼠标控制旋转
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        // orbitControls.autoRotate = false;
        // orbitControls.enableZoom = false;
        orbitControls.minDistance = 200; // 最大缩放值，值越小模型越大
        orbitControls.maxDistance = 500; // 最小缩放值，值越大模型越小
        orbitControls.maxPolarAngle = Math.PI * 0.5; // 限制鼠标拖拽角度
        orbitControls.enablePan = false; // 禁止鼠标右键拖拽

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

            TWEEN.update();
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

    const init = async () => {
        await imgLoad();
        // console.log('图片加载完成...');
        modelLoad();
        setMapLoading(false);
    };

    useEffect(() => {
        init();
    }, []);
    return (
        <>
            <div id="content" ref={contentRef}>
                {mapLoading && (
                    <div className="dv__map-loading">
                        <div className="dv__map-loading--in">
                            <span className="icon"></span>
                            <span className="text">模型加载中...</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
export default Guoxin;