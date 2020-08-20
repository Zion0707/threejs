import React, { useEffect } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, AxesHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
function Line() {
    const init = () => {
        const content = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        // 场景允许你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。
        const scene = new Scene();

        // 坐标系 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
        const axesHelper = new AxesHelper(1);
        scene.add(axesHelper);

        // 这一摄像机使用perspective projection（透视投影）来进行投影。
        const camera = new PerspectiveCamera(75, winWidth / winHeight, 1, 1000);
        camera.position.set(2, 0, 0);

        // WebGL Render 用WebGL渲染出你精心制作的场景。
        const renderer = new WebGLRenderer({});
        // 设置渲染器大小
        renderer.setSize(winWidth, winHeight);
        // 渲染器渲染场景和相机
        // renderer.render(scene, camera);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;

        // 把渲染器对象添加到content元素中生成canvas
        content.appendChild(renderer.domElement);

        // 执行动画
        function animate() {
            controls.update();

            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    };
    useEffect(() => {
        init();
    }, []);
    return <div id="content"></div>;
}

export default Line;
