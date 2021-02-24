// 国信投资大厦
import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import './index.css';
import { randomRange } from './utils';

import logoImg from './images/logo.png';
import mapImg from './images/map.png';
import bodyImg from './images/body.png';
import bottomImg from './images/bottom.png';
const imgsArr = [logoImg, mapImg, bodyImg, bottomImg];

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

    // 上升漂浮元素生成
    const floatsAnimate = (scene, delayTime) => {
        const dtime = delayTime || 0;

        const rangeNum = 80; // 随机范围值
        const yDownNum = -30; // 漂浮元素统一的最底值
        const fadeInOption = 0.3; // 显示透明度
        const comeUpArr = []; // 上升漂浮元素装载
        const comeUpCount = 20; // 漂浮元素总数

        for (let i = 0; i < comeUpCount; i++) {
            comeUpArr.push({
                el: null,
                index: i,
                x: Math.random() * (i % 2 === 0 ? rangeNum : -rangeNum),
                z: Math.random() * (i % 2 === 0 ? -rangeNum : rangeNum),
                y: -randomRange(20, 500),
            });
        }

        // 上升拖尾模型
        const createComeUpModel = (index) => {
            // 纹理，开始透明是为了生成
            const cuMaterial = new THREE.MeshBasicMaterial({
                color: '#2cc1f7',
                transparent: true,
                opacity: 0,
            });

            // 上浮模型
            const comeUpGroup = new THREE.Group();
            comeUpGroup.name = '物体上浮模型';

            // 半径尺寸
            const radiusSize = 0.3;

            // 圆球
            const circleGeometry = new THREE.SphereGeometry(radiusSize, 100, 100);
            const circleMesh = new THREE.Mesh(circleGeometry, cuMaterial);
            circleMesh.name = '圆球';
            circleMesh.position.y = 8;

            // 圆锥
            const coneGeometry = new THREE.CylinderBufferGeometry(radiusSize, 0, 15.1, 100);
            const coneMesh = new THREE.Mesh(coneGeometry, cuMaterial);
            coneMesh.name = '圆锥';
            comeUpGroup.add(coneMesh, circleMesh);
            scene.add(comeUpGroup);

            // 重置位置及透明度
            const comeUpAnimateInit = () => {
                comeUpGroup.position.y = yDownNum;
                cuMaterial.opacity = fadeInOption;
                const timer = setTimeout(() => {
                    comeUpAnimate.start();
                    fadeOutAnimate.start();
                    clearTimeout(timer);
                });
            };

            const comeUpAnimate = new TWEEN.Tween(comeUpGroup.position)
                .to({ y: 200 }, 7000)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(() => {
                    if (comeUpGroup.position.y >= 200) {
                        comeUpAnimateInit();
                    }
                });

            const fadeOutAnimate = new TWEEN.Tween(cuMaterial)
                .to({ opacity: 0 }, 7000)
                .easing(TWEEN.Easing.Quadratic.Out);

            comeUpGroup.position.x = comeUpArr[index].x;
            comeUpGroup.position.y = comeUpArr[index].y;
            comeUpGroup.position.z = comeUpArr[index].z;
            // 元素和动画记录，方便执行
            comeUpArr[index].el = comeUpGroup;
            comeUpArr[index].cuMaterial = cuMaterial;
            comeUpArr[index].comeUpAnimate = comeUpAnimate;
            comeUpArr[index].fadeOutAnimate = fadeOutAnimate;
        };

        // 延时启动漂浮粒子
        for (let i = 0, len = comeUpArr.length; i < len; i++) {
            createComeUpModel(i);
        }

        // 动画执行
        console.log(comeUpArr);
        const timer = setTimeout(() => {
            for (let i = 0, len = comeUpArr.length; i < len; i++) {
                comeUpArr[i].cuMaterial.opacity = fadeInOption;
                comeUpArr[i].comeUpAnimate.start();
                comeUpArr[i].fadeOutAnimate.start();
            }
            clearTimeout(timer);
        }, dtime);
    };

    // 模型及场景加载
    const modelLoad = () => {
        const el = contentRef.current;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        // 贴纸
        // 底部地图贴纸
        const mapBgTexture = new THREE.TextureLoader().load(mapImg);
        const mapBgMaterial = new THREE.MeshLambertMaterial({
            map: mapBgTexture,
            transparent: true,
            opacity: 0.05,
        });

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

        // 主体正面 贴纸
        const bodyPositiveTexture = new THREE.TextureLoader().load(bodyImg);
        bodyPositiveTexture.repeat.set(14, 14);
        bodyPositiveTexture.wrapS = THREE.RepeatWrapping;
        bodyPositiveTexture.wrapT = THREE.RepeatWrapping;
        const bodyPositiveMaterial = new THREE.MeshLambertMaterial({
            map: bodyPositiveTexture,
            transparent: true,
            opacity: 0.8,
        });

        // 主体侧面 贴纸
        const bodySideTexture = new THREE.TextureLoader().load(bodyImg);
        bodySideTexture.repeat.set(10, 14);
        bodySideTexture.wrapS = THREE.RepeatWrapping;
        bodySideTexture.wrapT = THREE.RepeatWrapping;
        const bodySideMaterial = new THREE.MeshLambertMaterial({
            map: bodySideTexture,
            transparent: true,
            opacity: 0.8,
        });

        // 底部正面 贴纸
        const bottomPositiveTexture = new THREE.TextureLoader().load(bottomImg);
        bottomPositiveTexture.repeat.set(25, 3);
        bottomPositiveTexture.wrapS = THREE.RepeatWrapping;
        bottomPositiveTexture.wrapT = THREE.RepeatWrapping;
        const bottomPositiveMaterial = new THREE.MeshLambertMaterial({
            map: bottomPositiveTexture,
            transparent: true,
            opacity: 0.7,
        });

        // 底部侧面 贴纸
        const bottomSideTexture = new THREE.TextureLoader().load(bottomImg);
        bottomSideTexture.repeat.set(8, 3);
        bottomSideTexture.wrapS = THREE.RepeatWrapping;
        bottomSideTexture.wrapT = THREE.RepeatWrapping;
        const bottomSideMaterial = new THREE.MeshLambertMaterial({
            map: bottomSideTexture,
            transparent: true,
            opacity: 0.7,
        });

        // 圆形侧边 贴纸
        const sliderTexture = new THREE.TextureLoader().load(bodyImg);
        sliderTexture.repeat.set(22, 14);
        sliderTexture.wrapS = THREE.RepeatWrapping;
        sliderTexture.wrapT = THREE.RepeatWrapping;
        const sliderMaterial = new THREE.MeshLambertMaterial({
            map: sliderTexture,
            transparent: true,
            opacity: 0.8,
        });

        // 奶白色
        const whiteMaterial = new THREE.MeshLambertMaterial({
            color: '#90abc0',
            transparent: true,
            opacity: 1,
        });

        // ----------------------------------------------模型绘制区-----------------------------------------------
        // 楼宇组开始
        const guoxinGroup = new THREE.Group();
        guoxinGroup.name = '楼宇组';

        // 楼宇主体
        const bodyGeometry = new THREE.BoxBufferGeometry(140, 260, 100);
        const bodyMesh = new THREE.Mesh(bodyGeometry, [
            bodySideMaterial,
            bodySideMaterial,
            whiteMaterial,
            whiteMaterial,
            bodyPositiveMaterial,
            bodyPositiveMaterial,
        ]);
        bodyMesh.name = '楼宇主体';
        bodyMesh.position.y = 30;

        // 楼宇底部长方体
        const floorBottomGeometry = new THREE.BoxBufferGeometry(270, 50, 100);
        const floorBottomMesh = new THREE.Mesh(floorBottomGeometry, [
            bottomSideMaterial,
            bottomSideMaterial,
            whiteMaterial,
            whiteMaterial,
            bottomPositiveMaterial,
            bottomPositiveMaterial,
        ]);
        floorBottomMesh.name = '楼宇底部';
        floorBottomMesh.position.set(0, -125, 0);

        // 楼宇正面小长方形
        const positiveGeometry = new THREE.BoxBufferGeometry(20, 70, 110);
        const positiveMesh = new THREE.Mesh(positiveGeometry, whiteMaterial);
        positiveMesh.name = '楼宇正面小长方形';
        positiveMesh.position.set(0, 130, 0);

        // 楼宇logo
        const logoGeometry = new THREE.BoxBufferGeometry(140, 40, 3);
        const logoMesh = new THREE.Mesh(logoGeometry, [null, null, null, null, logoMaterial, null]);
        logoMesh.name = '楼宇正面logo';
        logoMesh.position.set(0, 140, 50);

        // 楼宇左边侧面组
        const floorLeftGroup = new THREE.Group();
        floorLeftGroup.name = '楼宇左边组';
        floorLeftGroup.position.set(-90, 0, 0);

        const floorLeftCylindricalGeometry = new THREE.CylinderBufferGeometry(35, 35, 248, 14);
        const floorLeftCylindricalMesh = new THREE.Mesh(floorLeftCylindricalGeometry, [
            sliderMaterial,
            whiteMaterial,
        ]);
        floorLeftCylindricalMesh.name = '楼宇左边圆柱体';
        floorLeftCylindricalMesh.position.set(5, 25, -15);

        const floorLeftCuboidGeometry = new THREE.BoxBufferGeometry(10, 250, 72);
        const floorLeftCuboidMesh = new THREE.Mesh(floorLeftCuboidGeometry, whiteMaterial);
        floorLeftCuboidMesh.name = '楼宇左边长方体';
        floorLeftCuboidMesh.position.set(15, 25, -13);

        floorLeftGroup.add(floorLeftCylindricalMesh, floorLeftCuboidMesh);

        // 楼宇右边侧面组
        const floorRightGroup = new THREE.Group();
        floorRightGroup.name = '楼宇右边组';
        floorRightGroup.position.set(90, 0, 0);

        const floorRightCylindricalGeometry = new THREE.CylinderBufferGeometry(35, 35, 248, 14);
        const floorRightCylindricalMesh = new THREE.Mesh(floorRightCylindricalGeometry, [
            sliderMaterial,
            whiteMaterial,
        ]);
        floorRightCylindricalMesh.name = '楼宇右边圆柱体';
        floorRightCylindricalMesh.position.set(-5, 25, -15);

        const floorRightCuboidGeometry = new THREE.BoxBufferGeometry(10, 250, 72);
        const floorRightCuboidMesh = new THREE.Mesh(floorRightCuboidGeometry, whiteMaterial);
        floorRightCuboidMesh.name = '楼宇右边长方体';
        floorRightCuboidMesh.position.set(-15, 25, -13);

        floorRightGroup.add(floorRightCylindricalMesh, floorRightCuboidMesh);

        // 底部地图 设置start
        const mapMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2000 * 3, 2000 * 3),
            mapBgMaterial
        );
        mapMesh.position.y = -150;
        mapMesh.rotation.x = -Math.PI / 2;
        mapMesh.receiveShadow = true;
        // 底部地图 设置end

        // 组里添加组件
        guoxinGroup.add(
            bodyMesh,
            floorBottomMesh,
            logoMesh,
            positiveMesh,
            mapMesh,
            floorLeftGroup,
            floorRightGroup
        );
        scene.add(guoxinGroup);
        // 楼宇组结束
        // ---------------------------------------------------------------------------------------------

        // -----------------------------------------------动画执行区----------------------------------------------
        // loading加载完，模型旋转动画start
        // guoxinGroup.scale.set(0.15, 0.15, 0.15); // 测试用
        guoxinGroup.scale.set(0.05, 0.05, 0.05);
        guoxinGroup.rotation.y = -2;
        const modelTween1 = new TWEEN.Tween(guoxinGroup.rotation)
            .to({ y: 0 }, 5000)
            .easing(TWEEN.Easing.Quadratic.InOut);
        modelTween1.start();
        const modelTween2 = new TWEEN.Tween(guoxinGroup.scale)
            .to({ x: 0.15, y: 0.15, z: 0.15 }, 5000)
            .easing(TWEEN.Easing.Quadratic.InOut);
        modelTween2.start();

        // 地图渐现动画执行
        // mapBgMaterial.opacity = 0.5; // 测试用
        const mapTween1 = new TWEEN.Tween(mapBgMaterial)
            .to({ opacity: 0.5 }, 3000)
            .easing(TWEEN.Easing.Quadratic.In);
        mapTween1.start();

        // 漂浮元素上升动画
        floatsAnimate(scene, 4000);
        // ---------------------------------------------------------------------------------------------

        // // 辅助线
        // const axes = new THREE.AxisHelper(20);
        // scene.add(axes);

        // 相机
        const camera = new THREE.PerspectiveCamera(20, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        // camera.position.set(150, 50, 300); // 侧面
        camera.position.set(0, 50, 300); // 正面

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
        const light = new THREE.DirectionalLight('#ffffff', 0.5);
        light.position.set(400, 200, 300);
        scene.add(light);
        scene.add(new THREE.AmbientLight('#ffffff', 0.5));

        // 亮白光光源映射
        const pointLight = new THREE.PointLight('#ffffff', 1, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

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
