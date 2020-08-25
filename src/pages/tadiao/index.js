import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import img01 from 'static/images/tadiao/01.png';
import './index.css';

function Tadiao() {
    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        const tdGroup = new THREE.Group();
        tdGroup.name = '塔吊组';
        tdGroup.position.y = -20;

        const tdBaseGeometry = new THREE.BoxGeometry(35, 5, 35);
        const tdBaseMaterial = new THREE.MeshLambertMaterial({ color: '#FFF' });
        const tdBaseMesh = new THREE.Mesh(tdBaseGeometry, tdBaseMaterial);
        tdBaseMesh.name = '塔吊底座';
        tdBaseMesh.position.y = -90;

        const tdCenterGroup = new THREE.Group();
        tdCenterGroup.name = '塔吊中心柱组';
        // 中心柱皮肤
        const tdCenterGeometry = new THREE.BoxGeometry(8, 160, 8);
        const img01Texture = new THREE.TextureLoader().load(img01);
        // 纹理y轴重复
        img01Texture.repeat.set(1, 20);
        img01Texture.wrapS = THREE.RepeatWrapping;
        img01Texture.wrapT = THREE.RepeatWrapping;
        const tdCenterMaterial = new THREE.MeshLambertMaterial({
            map: img01Texture,
            transparent: true,
        });
        tdCenterMaterial.opacity = 0.7;
        const tdCenterMesh = new THREE.Mesh(tdCenterGeometry, tdCenterMaterial);
        tdCenterMesh.name = '塔吊中心柱';

        const tdPillarsGeometry = new THREE.BoxGeometry(2, 160, 2);
        const tdPillarsMaterial = new THREE.MeshLambertMaterial({ color: '#ddbe07' });
        const tdPillarsMesh1 = new THREE.Mesh(tdPillarsGeometry, tdPillarsMaterial);
        tdPillarsMesh1.name = '顶梁柱左后方';
        tdPillarsMesh1.position.x = -4;
        tdPillarsMesh1.position.z = -4;

        const tdPillarsMesh2 = tdPillarsMesh1.clone();
        tdPillarsMesh2.name = '顶梁柱右后方';
        tdPillarsMesh2.position.x = 4;
        tdPillarsMesh2.position.z = -4;

        const tdPillarsMesh3 = tdPillarsMesh1.clone();
        tdPillarsMesh3.name = '顶梁柱左前方';
        tdPillarsMesh3.position.x = -4;
        tdPillarsMesh3.position.z = 4;

        const tdPillarsMesh4 = tdPillarsMesh1.clone();
        tdPillarsMesh4.name = '顶梁柱右前方';
        tdPillarsMesh4.position.x = 4;
        tdPillarsMesh4.position.z = 4;

        // 塔吊分层
        const tdLayerGeometry = new THREE.BoxGeometry(10, 4, 10);
        const tdLayerMaterial = new THREE.MeshLambertMaterial({ color: '#ddbe07' });
        const tdLayerMesh = new THREE.Mesh(tdLayerGeometry, tdLayerMaterial);
        tdLayerMesh.name = '塔吊分层';
        tdLayerMesh.position.y = 10;
        const tdLayerMesh2 = tdLayerMesh.clone();
        tdLayerMesh2.position.y = 78;
        tdCenterGroup.add(
            tdCenterMesh,
            tdPillarsMesh1,
            tdPillarsMesh2,
            tdPillarsMesh3,
            tdPillarsMesh4,
            tdLayerMesh,
            tdLayerMesh2
        );
        tdCenterGroup.position.y = -8;

        const tdTopGroup = new THREE.Group();
        tdTopGroup.name = '塔吊顶部';
        // 塔吊手臂
        const tdArmGeometry = new THREE.CylinderGeometry(4, 1, 260, 4);
        const tdArmMaterial = new THREE.MeshLambertMaterial({
            color: '#ddbe07',
            transparent: true,
            wireframe: true,
        });
        const tdArmMesh = new THREE.Mesh(tdArmGeometry, tdArmMaterial);
        tdArmMesh.name = '塔吊顶部手臂';
        tdArmMesh.position.y = 75;
        tdArmMesh.position.z = 40;
        tdArmMesh.rotation.x = -1.6;
        tdArmMesh.rotation.y = -0.8;

        // 塔吊机窗顶部
        const tdTipGeometry = new THREE.CylinderGeometry(0, 4, 20, 4);
        const tdTipMaterial = new THREE.MeshLambertMaterial({
            color: '#ddbe07',
            transparent: true,
            wireframe: true,
        });
        const tdTipMesh = new THREE.Mesh(tdTipGeometry, tdTipMaterial);
        tdTipMesh.position.y = 100;
        tdTipMesh.rotation.y = -0.8;

        const tdTipBoxGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
        const tdTipBoxMaterial = new THREE.MeshLambertMaterial({
            color: '#000',
        });
        const tdTipBoxMesh = new THREE.Mesh(tdTipBoxGeometry, tdTipBoxMaterial);
        tdTipBoxMesh.position.y = 109;

        // 塔吊机窗
        const tdAircraftWindowGeometry = new THREE.BoxGeometry(15, 20, 15);
        const tdAircraftWindowMaterial = new THREE.MeshLambertMaterial({ color: '#bfc9c6' });
        const tdAircraftWindowMesh = new THREE.Mesh(
            tdAircraftWindowGeometry,
            tdAircraftWindowMaterial
        );
        tdAircraftWindowMesh.name = '塔吊机窗';
        tdAircraftWindowMesh.position.y = 80;

        // 塔吊平衡机
        const tdBalancingMachineGeometry = new THREE.BoxGeometry(15, 10, 30);
        const tdBalancingMachineMaterial = new THREE.MeshLambertMaterial({ color: '#44c1ef' });
        const tdBalancingMachineMesh = new THREE.Mesh(
            tdBalancingMachineGeometry,
            tdBalancingMachineMaterial
        );
        tdBalancingMachineMesh.name = '塔吊平衡机';
        tdBalancingMachineMesh.position.y = 73.5;
        tdBalancingMachineMesh.position.z = -80;
        tdBalancingMachineMesh.rotation.x = -0.05;

        tdTopGroup.add(
            tdArmMesh,
            tdAircraftWindowMesh,
            tdTipMesh,
            tdTipBoxMesh,
            tdBalancingMachineMesh
        );
        tdGroup.add(tdBaseMesh, tdCenterGroup, tdTopGroup);
        scene.add(tdGroup);

        // ---------------------------------------------------------------------------------------------
        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(400, 0, 500);

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
        scene.add(new THREE.AxesHelper(5));

        el.append(renderer.domElement);

        function render() {
            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);
        }
        render();
    };
    useEffect(() => {
        init();
    });
    return (
        <div id="content">
            <ul>
                <li></li>
            </ul>
        </div>
    );
}
export default Tadiao;
