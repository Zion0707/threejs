import React, { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 后期处理
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import * as THREE from 'three';
import './index.css';
import TWEEN from '@tweenjs/tween.js';

function Map3d() {
    const contentRef = useRef();
    const init = () => {
        const el = contentRef.current;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 相机
        const camera = new THREE.PerspectiveCamera(100, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(100, 100, 300);

        // 渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // 设置渲染器的颜色和大小
        renderer.setClearColor('#040b1a');
        // renderer.setClearAlpha(0);
        renderer.setPixelRatio(window.devicePixelRatio); // 高清设置
        renderer.setSize(winWidth, winHeight);

        // 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。
        // 这就是渲染器用来显示场景给我们看的<canvas>元素
        el.appendChild(renderer.domElement);

        // ------------------------------------------------------------------------------------
        // 场景
        const scene = new THREE.Scene();
        const boxGeometry = new THREE.BoxBufferGeometry(100, 100, 100);
        const boxMaterial = new THREE.MeshBasicMaterial({
            color: '#fff',
            transparent: true,
            opacity: 1,
        });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        boxMesh.position.z = 10;
        boxMesh.name = '白色盒子';
        scene.add(boxMesh);

        const outlineObj = (selectedObjects) => {
            const composer = new EffectComposer(renderer); // 特效组件
            const renderPass = new RenderPass(scene, camera);
            composer.addPass(renderPass); // 特效渲染
            const outlinePass = new OutlinePass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                scene,
                camera
            );
            composer.addPass(outlinePass); // 加入高光特效
            outlinePass.pulsePeriod = 1; // 数值越大，律动越慢
            outlinePass.visibleEdgeColor.set('#ff0000'); // 高光颜色
            outlinePass.hiddenEdgeColor.set('#ff0000'); // 阴影颜色
            outlinePass.usePatternTexture = false; // 使用纹理覆盖？
            outlinePass.edgeStrength = 100; // 高光边缘强度
            outlinePass.edgeGlow = 100; // 边缘微光强度
            outlinePass.edgeThickness = 100; // 高光厚度
            outlinePass.selectedObjects = selectedObjects; // 需要高光的obj
        };

        outlineObj(boxMesh);

        const boxEvent = () => {
            // console.log('被点击');
            boxMaterial.opacity = 0.5;
            const tween = new TWEEN.Tween(boxMesh.position)
                .to({ x: 100 }, 10000)
                .easing(TWEEN.Easing.Quadratic.Out);
            tween.start();
        };

        // 元素点击事件
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        // 点击更改颜色
        renderer.domElement.onclick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            // console.log(intersects);
            if (intersects.length > 0) {
                intersects.forEach((item) => {
                    if (item.object.name === '白色盒子') {
                        boxEvent();
                    }
                });
            }
        };

        // ---------------------------------------------------------------------------------------------

        // 鼠标控制旋转
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.autoRotate = false;
        // orbitControls.enableZoom = false;
        orbitControls.minDistance = 200; // 最大缩放值，值越小模型越大
        orbitControls.maxDistance = 700; // 最小缩放值，值越大模型越小

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
    useEffect(() => {
        init();
    }, []);
    return (
        <>
            <div id="container" ref={contentRef}></div>
        </>
    );
}
export default Map3d;
