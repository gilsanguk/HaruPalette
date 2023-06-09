import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
/**
 * 로딩 발바닥
 * 위치: 로딩
 */
const CustomDiv = styled.canvas`
  width: 280px;
  height: 180px;
  z-index: 13;
`;

function Model2(props: any) {
  const temp = props;
  const refDiv = useRef<HTMLCanvasElement>(null);
  let rendererPrev: any;
  let cameraPrev: any;
  let scenePrev: any;
  const buddyEname = temp.data;

  useEffect(() => {
    const { current: customdiv } = refDiv;

    if (customdiv && !rendererPrev) {
      const group = new THREE.Group();
      // WebGL 컨텍스트 재사용: 모든 3D 객체가 동일한 컨텍스트에서 렌더링되도록 한다. 새로운 3D 객체를 렌더링하려면 기존 컨텍스트를 삭제하지 않고 재사용해야 합니다.
      const renderer = new THREE.WebGLRenderer({
        canvas: customdiv,
        antialias: true,
        alpha: true,
      });

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(280, 180);
      rendererPrev = renderer;

      // 씬 && 카메라 설정
      const scene = new THREE.Scene();
      scene.background = null;
      scenePrev = scene;

      const width = customdiv ? customdiv.clientWidth : 0;
      const height = customdiv ? customdiv.clientHeight : 0;
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
      cameraPrev = camera;
      cameraPrev.position.x = 0;
      cameraPrev.position.y = 0.6;
      cameraPrev.position.z = 4;

      // 빛 설정
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
      group.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(0, 1, 4);
      directionalLight.castShadow = true;
      group.add(directionalLight);

      // 캐릭터 설정
      // ${buddyEname}/${buddyEname}
      // tori/tori_update
      const glftLoader = new GLTFLoader();
      glftLoader.load(`/assets/img/common/${buddyEname}.gltf`, el => {
        const temp2 = el;
        temp2.scene.position.x = 0.35;
        temp2.scene.position.y = 0.5;
        temp2.scene.position.z = 1;
        temp2.scene.rotation.y = -0.92;
        temp2.scene.rotation.x = 0.3;

        group.add(temp2.scene);

        // let step = 0;

        // const animate = () => {
        //   if (temp2) {
        //     step += 0.02;
        //     temp2.scene.scale.set(1.2, 1.2, 1.2);
        //     temp2.scene.position.y = 0.5 * Math.abs(Math.sin(step));
        //   }
        //   requestAnimationFrame(animate); // 애니메이션을 무한 반복 되도록 하는 메서드

        // };
        // animate();
        rendererPrev.render(scenePrev, cameraPrev);
      });
      // const glftLoaderSub = new GLTFLoader();
      // glftLoaderSub.load(
      //   `/assets/img/${buddyEname}/${buddyEname}_item.gltf`,
      //   ele => {
      //     const temp3 = ele;
      //     temp3.scene.position.x = -2.3;
      //     temp3.scene.position.y = 0.9;
      //     temp3.scene.position.z = -1.8;
      //     temp3.scene.rotation.y = 2;
      //     temp3.scene.rotation.x = 0.3;
      //     group.add(temp3.scene);

      //     ele.scene.scale.set(0.4, 0.4, 0.4);
      //     renderer.dispose();
      //     rendererPrev.dispose();
      //   },
      // );

      scenePrev.add(group);
    }
  }, [refDiv]);

  return <CustomDiv className="canvaChar" ref={refDiv} />;
}
export default Model2;
