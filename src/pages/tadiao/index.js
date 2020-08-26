import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import * as THREE from 'three';
import img01 from 'static/images/tadiao/01.png';
import img02 from 'static/images/tadiao/02.png';
import img03 from 'static/images/tadiao/03.png';
import './index.css';

function Tadiao() {
    const init = () => {
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 场景
        const scene = new THREE.Scene();

        // 纹理列表
        const grayLineMaterial = new THREE.LineBasicMaterial({ color: '#999' });
        const orangeMeshMaterial = new THREE.MeshLambertMaterial({ color: '#ddbe07' });
        const blackMeshMaterial = new THREE.MeshLambertMaterial({
            color: '#000',
        });
        const grayMeshMaterial = new THREE.MeshLambertMaterial({ color: '#DDD' });

        // 物体运动值
        const tdSliderAnimateNum = -100;
        const tdTopGroupAnimateNum = 0;
        const tdHookLineAnimateNum = -30;

        // 运动物体
        //  *** 塔吊顶部组，需要动画的（y轴运动，手臂旋转）
        const tdTopGroup = new THREE.Group();
        tdTopGroup.name = '塔吊顶部组';
        tdTopGroup.rotation.y = tdTopGroupAnimateNum;

        //  *** 塔吊滑块，需要动画的（y轴运动）
        const tdTopSliderGeometry = new THREE.BoxGeometry(8, 8, 4);
        const tdTopSliderMesh = new THREE.Mesh(tdTopSliderGeometry, blackMeshMaterial);
        tdTopSliderMesh.name = '塔吊滑块';
        tdTopSliderMesh.position.z = -4.6;
        tdTopSliderMesh.position.y = tdSliderAnimateNum; //  0 ~ -120 运动范围值
        //  *** 塔吊滑块动态牵引线，需要动画的（y轴运动）
        const tdTopSliderLineGeometry = new THREE.Geometry();
        tdTopSliderLineGeometry.vertices = [
            new THREE.Vector3(-1.2, 0, -4),
            new THREE.Vector3(-1.2, -128, -4),
        ];
        const tdTopSliderLine1 = new THREE.Line(tdTopSliderLineGeometry, grayLineMaterial);
        const tdTopSliderLine2 = tdTopSliderLine1.clone();
        tdTopSliderLine2.position.x = 2.2;
        tdTopSliderLineGeometry.vertices[0].y = tdSliderAnimateNum; //  0 ~ -120 运动范围值
        //  *** 塔吊钩子线，需要动画的（z轴运动）
        const tdHookLineGeometry = new THREE.Geometry();
        tdHookLineGeometry.vertices = [new THREE.Vector3(0, 0, -10), new THREE.Vector3(0, 0, 0)];
        const tdHookLineMesh = new THREE.Line(tdHookLineGeometry, grayLineMaterial);
        tdHookLineMesh.position.x = 0.2;
        const tdHookLineMesh2 = tdHookLineMesh.clone();
        tdHookLineMesh2.position.x = -0.2;
        tdHookLineGeometry.vertices[0].z = tdHookLineAnimateNum; //  0 ~ -80 运动范围值
        // *** 塔吊钩子组，需要动画的（z轴运动）
        const tdHookGroup = new THREE.Group();
        tdHookGroup.position.z = tdHookLineAnimateNum;

        const tdHookHeadGeometry = new THREE.BoxGeometry(2, 2, 1);
        const img02Texture1 = new THREE.TextureLoader().load(img02);
        // 纹理重复
        img02Texture1.repeat.set(3, 1);
        img02Texture1.wrapS = THREE.RepeatWrapping;
        img02Texture1.wrapT = THREE.RepeatWrapping;
        const tdHookHeadMaterial1 = new THREE.MeshLambertMaterial({
            map: img02Texture1,
        });
        const img03Texture1 = new THREE.TextureLoader().load(img03);
        // 纹理重复
        img03Texture1.repeat.set(1, 3);
        img03Texture1.wrapS = THREE.RepeatWrapping;
        img03Texture1.wrapT = THREE.RepeatWrapping;
        const tdHookHeadMaterial2 = new THREE.MeshLambertMaterial({
            map: img03Texture1,
        });
        const tdHookMesh = new THREE.Mesh(tdHookHeadGeometry, [
            tdHookHeadMaterial2,
            tdHookHeadMaterial2,
            tdHookHeadMaterial1,
            tdHookHeadMaterial1,
            orangeMeshMaterial,
            orangeMeshMaterial,
        ]);

        const tdHookIronGeometry = new LineGeometry();
        const pointArr = [0, 0, 0, 0, 0, -3, 0, -2, -3, 0, -2, -1.5];
        tdHookIronGeometry.setPositions(pointArr);
        const tdHookIronMaterial = new LineMaterial({
            color: '#000',
            linewidth: 4,
        });
        tdHookIronMaterial.resolution.set(window.innerWidth, window.innerHeight);
        const tdHookIronLine = new Line2(tdHookIronGeometry, tdHookIronMaterial);
        tdHookGroup.add(tdHookMesh, tdHookIronLine);

        tdTopSliderMesh.add(tdHookLineMesh, tdHookLineMesh2, tdHookGroup);

        // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
        scene.add(new THREE.AxesHelper(5));

        // --------------------------------------------------------------------------------------------------------

        const tdGroup = new THREE.Group();
        tdGroup.name = '塔吊组';
        // tdGroup.position.y = -20;
        // tdGroup.position.z = -100;

        const tdBaseGeometry = new THREE.BoxGeometry(50, 10, 50);
        const tdBaseMaterial = new THREE.MeshLambertMaterial({ color: '#FFF' });
        const tdBaseMesh = new THREE.Mesh(tdBaseGeometry, tdBaseMaterial);
        tdBaseMesh.name = '塔吊底座';
        tdBaseMesh.position.y = -90;

        const tdCenterGroup = new THREE.Group();
        tdCenterGroup.name = '塔吊中心柱组';
        // 中心柱皮肤
        const tdCenterGeometry = new THREE.BoxGeometry(8, 160, 8);
        const img01Texture1 = new THREE.TextureLoader().load(img01);
        // 纹理y轴重复
        img01Texture1.repeat.set(1, 20);
        img01Texture1.wrapS = THREE.RepeatWrapping;
        img01Texture1.wrapT = THREE.RepeatWrapping;
        const tdCenterMaterial = new THREE.MeshLambertMaterial({
            map: img01Texture1,
            transparent: true,
            opacity: 1,
        });
        const tdCenterMesh = new THREE.Mesh(tdCenterGeometry, tdCenterMaterial);
        tdCenterMesh.name = '塔吊中心柱';

        const tdPillarsGeometry = new THREE.BoxGeometry(2, 160, 2);
        const tdPillarsMesh1 = new THREE.Mesh(tdPillarsGeometry, orangeMeshMaterial);
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
        const tdLayerMesh = new THREE.Mesh(tdLayerGeometry, orangeMeshMaterial);
        tdLayerMesh.name = '塔吊分层';
        tdLayerMesh.position.y = 10;
        const tdLayerMesh2 = tdLayerMesh.clone();
        const tdLayerMesh3 = tdLayerMesh.clone();
        tdLayerMesh2.position.y = 78;
        tdLayerMesh3.position.y = -78;

        const tdRotateGeometry = new THREE.CylinderGeometry(8, 8, 4, 32);
        const tdRotateMesh = new THREE.Mesh(tdRotateGeometry, blackMeshMaterial);
        tdRotateMesh.name = '塔吊旋转器';
        tdRotateMesh.position.y = 79;
        tdCenterGroup.add(
            tdCenterMesh,
            tdPillarsMesh1,
            tdPillarsMesh2,
            tdPillarsMesh3,
            tdPillarsMesh4,
            tdLayerMesh,
            tdLayerMesh2,
            tdLayerMesh3,
            tdRotateMesh
        );
        tdCenterGroup.position.y = -8;

        // 塔吊手臂
        const tdArmGeometry = new THREE.BoxGeometry(6, 260, 6);
        const img01Texture2 = new THREE.TextureLoader().load(img01);
        // 纹理y轴重复
        img01Texture2.repeat.set(1, 32);
        img01Texture2.wrapS = THREE.RepeatWrapping;
        img01Texture2.wrapT = THREE.RepeatWrapping;
        const tdArmMaterial = new THREE.MeshLambertMaterial({
            map: img01Texture2,
            transparent: true,
            opacity: 1,
        });
        const tdArmMesh = new THREE.Mesh(tdArmGeometry, tdArmMaterial);
        tdArmMesh.name = '塔吊顶部手臂';
        tdArmMesh.position.y = 75;
        tdArmMesh.position.z = 40;
        tdArmMesh.rotation.x = -1.6;
        // 塔吊手臂顶梁柱
        const tdArmChildGeometry = new THREE.BoxGeometry(1, 260, 1);
        const tdArmChildMesh1 = new THREE.Mesh(tdArmChildGeometry, orangeMeshMaterial);
        tdArmChildMesh1.position.x = -3;
        tdArmChildMesh1.position.z = -3;
        const tdArmChildMesh2 = tdArmChildMesh1.clone();
        tdArmChildMesh2.position.x = 3;
        tdArmChildMesh2.position.z = 3;
        const tdArmChildMesh3 = tdArmChildMesh1.clone();
        tdArmChildMesh3.position.x = -3;
        tdArmChildMesh3.position.z = 3;
        const tdArmChildMesh4 = tdArmChildMesh1.clone();
        tdArmChildMesh4.position.x = 3;
        tdArmChildMesh4.position.z = -3;
        tdArmMesh.add(
            tdArmChildMesh1,
            tdArmChildMesh2,
            tdArmChildMesh3,
            tdArmChildMesh4,
            tdTopSliderMesh,
            tdTopSliderLine1,
            tdTopSliderLine2
        );

        // 塔吊手臂前方,中间和后方封顶
        const tdArmTopGeometry = new THREE.BoxGeometry(7.2, 6, 7.2);
        const tdArmTopMesh = new THREE.Mesh(tdArmTopGeometry, orangeMeshMaterial);
        tdArmTopMesh.position.y = -128;

        const tdArmTopRollerGeometry = new THREE.CylinderGeometry(1, 1, 4, 32);
        const tdArmTopRollerMesh = new THREE.Mesh(tdArmTopRollerGeometry, blackMeshMaterial);
        tdArmTopRollerMesh.name = '手臂前端滚轮';
        tdArmTopRollerMesh.position.y = -128;
        tdArmTopRollerMesh.position.z = 3.5;
        tdArmTopRollerMesh.rotation.z = 1.55;
        const tdArmTopRollerMesh2 = tdArmTopRollerMesh.clone();
        tdArmTopRollerMesh2.position.z = -3.5;

        const tdArmTopMesh2 = tdArmTopMesh.clone();
        tdArmTopMesh2.position.y = 105;
        const tdArmTopMesh3 = tdArmTopMesh.clone();
        tdArmTopMesh3.position.y = 32;
        const tdArmTopMesh4 = tdArmTopMesh.clone();
        tdArmTopMesh4.position.y = 48;
        const tdArmTopMesh5 = tdArmTopMesh.clone();
        tdArmTopMesh5.position.y = 7;
        tdArmMesh.add(
            tdArmTopMesh,
            tdArmTopMesh2,
            tdArmTopMesh3,
            tdArmTopMesh4,
            tdArmTopMesh5,
            tdArmTopRollerMesh,
            tdArmTopRollerMesh2
        );

        // 塔吊机窗顶部三角支架
        const tdTipGeometry = new THREE.CylinderGeometry(1, 4, 20, 4);
        const tdTipMaterial = new THREE.MeshLambertMaterial({
            color: '#ddbe07',
            transparent: true,
            wireframe: true,
        });
        const tdTipMesh = new THREE.Mesh(tdTipGeometry, tdTipMaterial);
        tdTipMesh.position.y = 113;
        tdTipMesh.rotation.y = -0.8;

        // 塔吊最顶部圆圈滚轮
        const tdTipBoxGeometry = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
        const tdTipBoxMesh = new THREE.Mesh(tdTipBoxGeometry, blackMeshMaterial);
        tdTipBoxMesh.position.y = 123;
        tdTipBoxMesh.rotation.z = 1.55;

        // 塔吊静态线条
        const tdStaticLineGeometry1 = new THREE.Geometry();
        tdStaticLineGeometry1.vertices = [
            new THREE.Vector3(-40, -2, 168),
            new THREE.Vector3(1.2, 0, 0),
            new THREE.Vector3(-38, -2, -80),
        ];
        const tdStaticLine1 = new THREE.Line(tdStaticLineGeometry1, grayLineMaterial);

        const tdStaticLineGeometry2 = new THREE.Geometry();
        tdStaticLineGeometry2.vertices = [
            new THREE.Vector3(-40, 0.5, 168),
            new THREE.Vector3(1.2, 0, 0),
            new THREE.Vector3(-38, 0.5, -80),
        ];
        const tdStaticLine2 = new THREE.Line(tdStaticLineGeometry2, grayLineMaterial);
        tdTipBoxMesh.add(tdStaticLine1, tdStaticLine2);

        const tdTipBoxChildGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
        const tdTipBoxChildMesh = new THREE.Mesh(tdTipBoxChildGeometry, grayMeshMaterial);
        tdTipBoxMesh.add(tdTipBoxChildMesh);

        // 塔吊机窗
        const tdAircraftWindowGeometry = new THREE.BoxGeometry(18, 32, 18);
        const tdAircraftWindowMesh = new THREE.Mesh(tdAircraftWindowGeometry, orangeMeshMaterial);
        tdAircraftWindowMesh.name = '塔吊机窗';
        tdAircraftWindowMesh.position.y = 87;

        // 塔吊平衡机
        const tdBalancingMachineGeometry = new THREE.BoxGeometry(25, 15, 30);
        const tdBalancingMachineMaterial = new THREE.MeshLambertMaterial({
            color: '#44c1ef',
            transparent: true,
            // opacity: 0.5,
        });
        const tdBalancingMachineMesh = new THREE.Mesh(
            tdBalancingMachineGeometry,
            tdBalancingMachineMaterial
        );
        tdBalancingMachineMesh.name = '塔吊平衡机';
        tdBalancingMachineMesh.position.y = 73.8;
        tdBalancingMachineMesh.position.z = -80;
        tdBalancingMachineMesh.rotation.x = -0.03;

        const tdBalancingMachineRollerGeometry = new THREE.CylinderGeometry(4, 4, 4, 32);
        const tdBalancingMachineRollerMesh = new THREE.Mesh(
            tdBalancingMachineRollerGeometry,
            blackMeshMaterial
        );
        tdBalancingMachineRollerMesh.name = '塔吊平衡机滚轮';
        tdBalancingMachineRollerMesh.position.y = 8;
        tdBalancingMachineRollerMesh.rotation.z = -1.55;
        tdBalancingMachineMesh.add(tdBalancingMachineRollerMesh);

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
        camera.position.set(400, 80, 400);

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
