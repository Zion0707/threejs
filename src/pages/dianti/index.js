import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import img01 from 'static/images/dianti/01.png';
import './index.css';

function Dianti() {
    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        // 黑色纹理
        const blackMeshMaterial = new THREE.MeshLambertMaterial({
            color: '#000',
            transparent: true,
        });

        // 白色纹理
        const whiteMeshMaterial = new THREE.MeshLambertMaterial({
            color: '#fff',
            transparent: true,
        });
        // 白色半透明纹理
        const white2MeshMaterial = new THREE.MeshLambertMaterial({
            color: '#fff',
            transparent: true,
            opacity: 0.5,
        });
        // 浅蓝色纹理
        const lightBlueMeshMaterial = new THREE.MeshLambertMaterial({
            color: '#108fa9',
            transparent: true,
        });
        // 深蓝色纹理
        const deepBlueMeshMaterial = new THREE.MeshLambertMaterial({
            color: '#137a8f',
            transparent: true,
        });
        // 橙色纹理
        const orangeMeshMaterial = new THREE.MeshLambertMaterial({
            color: '#ffda00',
            transparent: true,
        });
        // 浅蓝色网格纹理
        const lightBlueGridMaterial = new THREE.TextureLoader().load(img01);

        const dtGroup = new THREE.Group();
        dtGroup.name = '电梯组';

        // 电梯底座
        const dtBaseGeometry = new THREE.BoxGeometry(50, 4, 80);
        const dtBaseMesh = new THREE.Mesh(dtBaseGeometry, whiteMeshMaterial);
        dtBaseMesh.name = '电梯底座';
        dtBaseMesh.position.y = -104;

        // 电梯中心柱
        const dtCenterPillarGroup = new THREE.Group();
        dtCenterPillarGroup.name = '电梯中心柱组';
        dtCenterPillarGroup.position.z = -15;

        // 电梯四条顶梁柱
        const dtCenterPillarGeometry = new THREE.CylinderGeometry(1, 1, 210, 32);
        const dtCenterPillarMesh1 = new THREE.Mesh(dtCenterPillarGeometry, lightBlueMeshMaterial);
        dtCenterPillarMesh1.position.x = 5;
        const dtCenterPillarMesh2 = dtCenterPillarMesh1.clone();
        dtCenterPillarMesh2.position.x = -5;
        const dtCenterPillarMesh3 = dtCenterPillarMesh2.clone();
        dtCenterPillarMesh3.position.z = -10;
        const dtCenterPillarMesh4 = dtCenterPillarMesh3.clone();
        dtCenterPillarMesh4.position.x = 5;

        // 电梯升降缆绳
        const dtCenterCableGeometry = new THREE.CylinderGeometry(0.2, 0.2, 210, 32);
        const dtCenterCableMesh1 = new THREE.Mesh(dtCenterCableGeometry, whiteMeshMaterial);
        dtCenterCableMesh1.position.x = -1;
        dtCenterCableMesh1.position.z = 0.5;
        const dtCenterCableMesh2 = dtCenterCableMesh1.clone();
        dtCenterCableMesh2.position.x = 1;
        const dtCenterCableMesh3 = dtCenterCableMesh1.clone();
        dtCenterCableMesh3.position.x = 1;
        dtCenterCableMesh3.position.z = -10.5;
        const dtCenterCableMesh4 = dtCenterCableMesh1.clone();
        dtCenterCableMesh4.position.x = -1;
        dtCenterCableMesh4.position.z = -10.5;
        // 电梯中心柱纹理
        const dtCenterTextureGeometry = new THREE.BoxGeometry(10, 180, 10);
        lightBlueGridMaterial.repeat.set(1, 14);
        lightBlueGridMaterial.wrapT = THREE.RepeatWrapping;
        lightBlueGridMaterial.wrapS = THREE.RepeatWrapping;
        const dtCenterTextureMaterial = new THREE.MeshLambertMaterial({
            map: lightBlueGridMaterial,
            transparent: true,
        });
        const dtCenterTextureMesh = new THREE.Mesh(
            dtCenterTextureGeometry,
            dtCenterTextureMaterial
        );
        dtCenterTextureMesh.name = '电梯中心柱纹理';
        dtCenterTextureMesh.position.z = -5;

        // 电梯中心柱封顶固定模块
        const dtCenterFixedGeometry = new THREE.BoxGeometry(11, 5, 11);
        const dtCenterFixedMesh1 = new THREE.Mesh(dtCenterFixedGeometry, lightBlueMeshMaterial);
        dtCenterFixedMesh1.position.z = -5;
        const dtCenterFixedMesh2 = dtCenterFixedMesh1.clone();
        dtCenterFixedMesh2.position.y = -102;
        const dtCenterFixedMesh3 = dtCenterFixedMesh1.clone();
        dtCenterFixedMesh3.position.y = 102.8;
        dtCenterPillarGroup.add(
            dtCenterPillarMesh1,
            dtCenterPillarMesh2,
            dtCenterPillarMesh3,
            dtCenterPillarMesh4,
            dtCenterTextureMesh,
            dtCenterFixedMesh1,
            dtCenterFixedMesh2,
            dtCenterFixedMesh3,
            dtCenterCableMesh1,
            dtCenterCableMesh2,
            dtCenterCableMesh3,
            dtCenterCableMesh4
        );

        // 电梯平衡砣
        const dtBalanceGeometry = new THREE.BoxGeometry(10, 20, 6);
        const dtBalanceMesh = new THREE.Mesh(dtBalanceGeometry, orangeMeshMaterial);
        dtBalanceMesh.position.z = -28;
        dtBalanceMesh.position.y = 70;
        const dtBalanceTextureGeometry = new THREE.BoxGeometry(10.1, 1, 6.1);
        const dtBalanceTextureMesh1 = new THREE.Mesh(dtBalanceTextureGeometry, blackMeshMaterial);
        const dtBalanceTextureMesh2 = dtBalanceTextureMesh1.clone();
        dtBalanceTextureMesh2.position.y = -5;
        const dtBalanceTextureMesh3 = dtBalanceTextureMesh1.clone();
        dtBalanceTextureMesh3.position.y = 5;
        dtBalanceMesh.add(dtBalanceTextureMesh1, dtBalanceTextureMesh2, dtBalanceTextureMesh3);

        // 电梯厢房
        const dtRoomGroup = new THREE.Group();
        dtRoomGroup.position.y = -82;
        dtRoomGroup.position.z = 0;
        dtRoomGroup.name = '电梯厢房组';

        // 电梯厢房顶部磁铁
        const dtRoomMagnetGeometry = new THREE.BoxGeometry(8, 5, 8);
        const dtRoomMagnetMesh = new THREE.Mesh(dtRoomMagnetGeometry, blackMeshMaterial);
        dtRoomMagnetMesh.position.z = -10;
        dtRoomMagnetMesh.position.y = 22;

        // 电梯厢房上顶下顶
        const dtRoomTopAndBottomGeometry = new THREE.BoxGeometry(32, 2, 32);
        const dtRoomTopAndBottomMesh1 = new THREE.Mesh(
            dtRoomTopAndBottomGeometry,
            lightBlueMeshMaterial
        );
        dtRoomTopAndBottomMesh1.position.y = -19;
        const dtRoomTopAndBottomMesh2 = dtRoomTopAndBottomMesh1.clone();
        dtRoomTopAndBottomMesh1.position.y = 20;

        // 电梯厢房柱子
        const dtRoomPillarsGeometry = new THREE.BoxGeometry(2, 39, 2);
        const dtRoomPillarsMesh1 = new THREE.Mesh(dtRoomPillarsGeometry, lightBlueMeshMaterial);
        dtRoomPillarsMesh1.position.x = -15;
        dtRoomPillarsMesh1.position.z = 15;
        const dtRoomPillarsMesh2 = dtRoomPillarsMesh1.clone();
        dtRoomPillarsMesh2.position.x = 15;

        // 电梯厢房背面
        const dtRoomBackGeometry = new THREE.BoxGeometry(32, 38, 2);
        const dtRoomBackMesh = new THREE.Mesh(dtRoomBackGeometry, [
            lightBlueMeshMaterial,
            lightBlueMeshMaterial,
            lightBlueMeshMaterial,
            lightBlueMeshMaterial,
            deepBlueMeshMaterial,
            lightBlueMeshMaterial,
        ]);
        dtRoomBackMesh.position.z = -14.8;

        // 电梯厢房左侧玻璃
        const dtRoomLeftGeometry = new THREE.BoxGeometry(2, 38, 27.8);
        const dtRoomLeftMesh = new THREE.Mesh(dtRoomLeftGeometry, white2MeshMaterial);
        dtRoomLeftMesh.position.x = -15;
        // 组的添加
        dtRoomGroup.add(
            dtRoomTopAndBottomMesh1,
            dtRoomTopAndBottomMesh2,
            dtRoomPillarsMesh1,
            dtRoomPillarsMesh2,
            dtRoomBackMesh,
            dtRoomLeftMesh,
            dtRoomMagnetMesh
        );
        dtGroup.add(dtBaseMesh, dtCenterPillarGroup, dtRoomGroup, dtBalanceMesh);
        scene.add(dtGroup);

        // 相机
        const camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 1000);

        // 设置相机坐标
        camera.position.set(0, -80, 300);

        // 渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // 设置渲染器的颜色和大小
        renderer.setClearColor('#040b1a');
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

        // onresize 事件会在窗口被调整大小时发生
        window.onresize = () => {
            const newWindowWidth = window.innerWidth;
            const newWindowHeight = window.innerHeight;
            renderer.setSize(newWindowWidth, newWindowHeight);
            camera.aspect = newWindowWidth / newWindowHeight;
            camera.updateProjectionMatrix();
        };
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
export default Dianti;
