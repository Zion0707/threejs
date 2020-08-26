import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import movieMp4 from 'static/mp4/movie.mp4';
import './index.css';

function Test() {
    let videoElglobal = null;
    // 视频播放
    const videoPlay = () => {
        videoElglobal.play();
    };
    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        const videoEl = document.createElement('video');
        videoEl.src = movieMp4;
        videoEl.autoplay = 'autoplay';
        videoElglobal = videoEl;

        const videoBoxGeometry = new THREE.BoxGeometry(40, 40, 40);
        const videoMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.VideoTexture(videoEl),
        });
        const videoMesh = new THREE.Mesh(videoBoxGeometry, videoMaterial);
        scene.add(videoMesh);

        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(0, 0, 200);

        // 渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // 设置渲染器的颜色和大小
        renderer.setClearColor('#ddd');
        renderer.setSize(winWidth, winHeight);
        // 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。
        // 这就是渲染器用来显示场景给我们看的<canvas>元素
        document.body.appendChild(renderer.domElement);

        // 鼠标控制旋转
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.autoRotate = false;

        // 设置光源
        const light = new THREE.DirectionalLight('#fff', 0.5);
        light.position.setScalar(100);
        scene.add(light);
        scene.add(new THREE.AmbientLight('#fff', 0.5));

        // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
        scene.add(new THREE.AxesHelper(10));

        el.append(renderer.domElement);

        function render() {
            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);
        }
        render();

        // onresize 事件会在窗口被调整大小时发生
        window.onresize = function () {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
    };
    useEffect(() => {
        init();
    });
    return (
        <div id="content">
            <ul>
                <li>
                    <button
                        onClick={() => {
                            videoPlay();
                        }}
                    >
                        播放视频
                    </button>
                </li>
            </ul>
        </div>
    );
}
export default Test;
