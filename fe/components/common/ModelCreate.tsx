import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
/**
 * 동동 뛰는 애니매이션
 * 위치: 일기작성
 */
const CustomDiv = styled.canvas`
  position: relative;
  left: 0px;
  width: 100%;
`;

function Model(props: any) {
  const temp = props;
  const currModel = temp.data;
  const refDiv = useRef<HTMLCanvasElement>(null);
  let rendererPrev: any;
  let cameraPrev: any;
  let scenePrev: any;

  useEffect(() => {
    const group = new THREE.Group();
    const { current: customdiv } = refDiv;
    // if (customdiv && rendererPrev) {
    //   customdiv = "";
    // }
    if (customdiv && !rendererPrev) {
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      let boundaryHeight = 0;
      if (sizes.width > 900) boundaryHeight = 450;
      else if (sizes.width > 400) boundaryHeight = 400;
      else boundaryHeight = 350;

      const renderer = new THREE.WebGLRenderer({
        canvas: customdiv,
        antialias: true,
        alpha: true,
      });
      // renderer.setClearColor(0x000000, 1);

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setPixelRatio(window.devicePixelRatio);
      // renderer.setSize(sizes.width, sizes.height - 120);
      // renderer.setSize(sizes.width, sizes.height - 222 - 200 - 32);
      renderer.setSize(sizes.width, boundaryHeight);
      rendererPrev = renderer;

      const scene = new THREE.Scene();
      scene.background = null;
      scenePrev = scene;

      // window.addEventListener('mousedown·mouseup', onWindowReset, false);
      // window.onresize = resize.bind(customdiv);
      // resize();

      // requestAnimationFrame(render.bind(refDiv));

      // 그림자 설정
      const textureLoader = new THREE.TextureLoader();
      const alphaShadow = textureLoader.load(
        '/assets/img/common/textures/simpleShadow.jpg',
      );

      const sphereShadow = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.MeshBasicMaterial({
          transparent: true,
          color: 0x000000,
          opacity: 0.9,
          alphaMap: alphaShadow,
        }),
      );

      sphereShadow.rotation.x = -Math.PI * 0.5;
      sphereShadow.position.x = 0;
      sphereShadow.position.y = -0.55;
      sphereShadow.scale.set(0.6, 0.6, 0.6);

      group.add(sphereShadow);

      let width = customdiv ? customdiv.clientWidth : 0;
      let height = customdiv ? customdiv.clientHeight : 0;
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);

      camera.position.x = 0;
      camera.position.y = 0.4;
      camera.position.z = 1.8;
      // controls.update();
      cameraPrev = camera;

      const onWindowResize = function (): void {
        width = window.innerWidth;
        height = window.innerHeight;
        if (sizes.width === width) {
          rendererPrev.setPixelRatio(window.devicePixelRatio);
          cameraPrev.aspect = sizes.width / boundaryHeight; // canvas비율을 카메라에 적용
          rendererPrev.setSize(sizes.width, boundaryHeight, true);
        } else {
          height =
            sizes.height - 420 > boundaryHeight
              ? boundaryHeight
              : sizes.height - 420;
          cameraPrev.aspect = width / height; // canvas비율을 카메라에 적용
          rendererPrev.setSize(width, height, true);
        }
        cameraPrev.updateProjectionMatrix(); // 변경된 값을 카메라에 적용
        // _renderer.setSize(sizes.width, sizes.height - 120 - 98);
        // controls.reset();
      };

      window.addEventListener('resize', onWindowResize, false);

      // 빛 설정
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
      group.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(0, 1, 4);
      directionalLight.castShadow = true;
      group.add(directionalLight);

      // 캐릭터 설정
      const glftLoader = new GLTFLoader();
      glftLoader.load(`/assets/img/${temp.data}/${temp.data}.gltf`, el => {
        const temp6 = el;
        temp6.scene.position.x = 0.35;
        temp6.scene.position.y = 0;
        temp6.scene.position.z = 1;
        // 옆면: -0.7 정면: -0.4
        temp6.scene.rotation.y = -0.9;
        temp6.scene.rotation.x = 0.3;

        // scene.add(el.scene);
        group.add(el.scene);

        // 부모 요소에는 castShadow가 true이지만 자식요소의 그림자옵션 false -> true로 변경
        el.scene.traverse(function (child) {
          const temp2 = child;
          if (temp2 instanceof THREE.Mesh) {
            temp2.castShadow = true;
          }
        });

        let step = 0;

        const animate = () => {
          if (temp6) {
            step += 0.02;
            temp6.scene.scale.set(1, 1, 1);
            temp6.scene.position.y = 0.5 * Math.abs(Math.sin(step));
            // el.scene.position.y = Math.sin(elapsedTime * .5) * .1 - 0.1
            sphereShadow.material.opacity =
              (1 - Math.abs(el.scene.position.y)) * 0.5;
          }
          // requestAnimationFrame: 애니메이션을 무한 반복 되도록 하는 메서드
          requestAnimationFrame(animate);
          // controls.update();

          rendererPrev.render(scenePrev, cameraPrev);
        };
        animate();
      });

      scenePrev.add(group);
    }
  }, [refDiv, currModel]);

  return <CustomDiv ref={refDiv} />;
}
export default Model;
