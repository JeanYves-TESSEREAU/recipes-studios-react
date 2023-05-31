import { useGLTF, useScroll } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

export function Models({
  menuDisplay,
  startClock,
  titleOnChange,
  translateXOnNav,
  ...props
}) {
  const { nodes, materials } = useGLTF('/untitled2.glb');
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);
  const clickOnLink = () => {
    document.querySelectorAll('#linkTo')[0].click();
  };
  const ref = useRef();
  const executed = useRef(0);
  const [mvt, setMvt] = useState(0);
  const scroll = useScroll();
  const progress2 = useRef(0);

  const scrollPosition = useRef(0);
  const scrollPosition2 = useRef(0);
  const menu = useRef('');
  const menuPrevious = useRef('');
  const t1 = useRef(0);
  const onHoverChange = () => {
    setHovered(true);
    translateXOnNav(5);
  };
  const outHoverChange = () => {
    setHovered(false);
    translateXOnNav(0);
  };
  let fix;
  useFrame(() => {
    scrollPosition.current = scroll.offset;
    window.clearTimeout(fix);
    fix = setTimeout(() => {
      scrollPosition2.current = (scrollPosition.current * 100).toFixed(3);
    }, 250);

    if (
      (scrollPosition.current * 100).toFixed(3) === scrollPosition2.current &&
      scroll.offset * 100 < 13
    ) {
      scroll.el.scrollTop = 0;
    } else if (
      (scrollPosition.current * 100).toFixed(3) === scrollPosition2.current &&
      scroll.offset * 100 > 13 &&
      scroll.offset * 100 < 38
    ) {
      scroll.el.scrollTop = window.innerHeight * 4 * 0.9 * 0.25;
    } else if (
      (scrollPosition.current * 100).toFixed(3) === scrollPosition2.current &&
      scroll.offset * 100 > 38 &&
      scroll.offset * 100 < 62
    ) {
      scroll.el.scrollTop = window.innerHeight * 4 * 0.9 * 0.498;
    } else if (
      (scrollPosition.current * 100).toFixed(3) === scrollPosition2.current &&
      scroll.offset * 100 > 62 &&
      scroll.offset * 100 < 87
    ) {
      scroll.el.scrollTop = window.innerHeight * 4 * 0.9 * 0.748;
    } else if (
      (scrollPosition.current * 100).toFixed(3) === scrollPosition2.current &&
      scroll.offset * 100 > 87
    ) {
      scroll.el.scrollTop = window.innerHeight * 4 * 0.9 * 1;
    }
    if (
      Number(ref.current.position.z.toFixed(0)) === -0 &&
      startClock.current
    ) {
      if (
        scrollPosition.current * 100 > 87 ||
        scrollPosition.current * 100 < 13
      ) {
        if (menuPrevious.current !== 'accueil') {
          menu.current = 'accueil';
          menuPrevious.current = 'accueil';

          setTimeout(() => {
            titleOnChange(menu.current);
            translateXOnNav(0);
          }, 500);
          translateXOnNav(-100);
        }
      } else if (
        scrollPosition.current * 100 > 13 &&
        scrollPosition.current * 100 < 38
      ) {
        if (menuPrevious.current !== 'studio des aliments') {
          menu.current = 'studio des aliments';
          menuPrevious.current = 'studio des aliments';
          setTimeout(() => {
            titleOnChange(menu.current);
            translateXOnNav(0);
          }, 500);
          translateXOnNav(-100);
        }
      } else if (
        scrollPosition.current * 100 > 38 &&
        scrollPosition.current * 100 < 62
      ) {
        if (menuPrevious.current !== 'studio des recettes') {
          menu.current = 'studio des recettes';
          menuPrevious.current = 'studio des recettes';
          setTimeout(() => {
            titleOnChange(menu.current);
            translateXOnNav(0);
          }, 500);
          translateXOnNav(-100);
        }
      } else if (
        scrollPosition.current * 100 > 62 &&
        scrollPosition.current * 100 < 87
      ) {
        if (menuPrevious.current !== 'livre des recettes') {
          menu.current = 'livre des recettes';
          menuPrevious.current = 'livre des recettes';
          setTimeout(() => {
            titleOnChange(menu.current);
            translateXOnNav(0);
          }, 500);
          translateXOnNav(-100);
        }
      }
    }
  });
  useFrame(() => {
    const easeOut = (t) => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
    const getProgress = ({ elapsed, total }) => elapsed / total;
    if (menuDisplay.current) {
      let t0 = Date.now();

      if (executed.current === 1 && ref.current.position.z < -200) {
        executed.current = 0;
        ref.current.rotation.x = 0;
        ref.current.rotation.y = 200;
        ref.current.rotation.z = 0;
        scroll.el.scrollTop = 0;
      }

      if (startClock.current && executed.current === 0) {
        t1.current = Date.now();
        executed.current = 1;
      }
      let time = (t0 - t1.current) / 1000;

      setMvt(9.56 - 6.29 * scrollPosition.current);
      ref.current.rotation.x = Math.sin(time / 1.5) / 35;

      const time2 = {
        start: performance.now(),
        total: 900,
      };

      const transitionAnim = (now) => {
        time2.elapsed = now - time2.start;
        const progress = getProgress(time2);
        const easing = easeOut(progress);
        ref.current.position.z = -150 + easing * 150;

        if (progress < 0.99) {
          requestAnimationFrame(transitionAnim);
          progress2.current = 1;
        }
      };
      if (progress2.current !== 1) {
        requestAnimationFrame(transitionAnim);
      }

      ref.current.rotation.y = 0.525 + mvt;
      ref.current.rotation.z = 0;
      ref.current.position.y = -0.05 + Math.sin(time / 1.5) / 20;
      ref.current.position.x = 0;
    } else {
      ref.current.position.z = -1000;
      progress2.current = 0;
      scroll.el.scrollTop = window.innerHeight * 4 * 0.9 * 0.75;
    }
  });
  return (
    <group
      onPointerOver={() => {
        onHoverChange();
      }}
      onPointerOut={() => outHoverChange()}
      className='model'
      scale={0.11}
      ref={ref}
      {...props}
      dispose={null}>
      {/* <Html rotation={[0, 0, 0]}>
        <h1 style={{ position: 'fixed', fontSize: '3vh', color: 'black' }}>
          HELLO
        </h1>
      </Html> */}
      <mesh
        scale={[1, 0.6, 1]}
        rotation={[3.15, 0, 0]}
        geometry={nodes.Cone.geometry}
        material={materials.default_001}
      />
      <group
        onClick={clickOnLink}
        scale={0.2}
        position={
          (scrollPosition.current > 0.125 && scrollPosition.current < 0.25
            ? [
                -0.7 - 8 * (scrollPosition.current - 0.125) * 1.8,
                0.495 - scrollPosition.current,
                -0.55 - 8 * (scrollPosition.current - 0.125) * 1.35,
              ]
            : null) ||
          (scrollPosition.current > 0.25 && scrollPosition.current < 0.375
            ? [
                -2.5 + 8 * (scrollPosition.current - 0.25) * 1.8,
                0.37 - (0.375 - scrollPosition.current),
                -1.9 + 8 * (scrollPosition.current - 0.25) * 1.35,
              ]
            : [-0.7, 0.37, -0.55])
        }
        rotation={[1.8, 0, 0.5]}>
        <mesh
          geometry={nodes.TS_Strawberry_001_Leaves_mesh.geometry}
          material={materials.h}
          scale={10}
          position={[0, 0, -1.9]}
        />
        <mesh
          scale={13}
          geometry={nodes.TS_Strawberry_001_Displ.geometry}
          material={materials.l_001}
          position={[0, 0, -0.3]}
        />
      </group>
      <group
        onClick={clickOnLink}
        position={
          (scrollPosition.current > 0.375 && scrollPosition.current < 0.5
            ? [
                -0.4 - 8 * (scrollPosition.current - 0.375) * 1.4,
                0.45,
                0.65 + 8 * (scrollPosition.current - 0.375) * 1.6,
              ]
            : null) ||
          (scrollPosition.current > 0.5 && scrollPosition.current < 0.625
            ? [
                -1.8 + 8 * (scrollPosition.current - 0.5) * 1.4,
                0.45,
                2.25 - 8 * (scrollPosition.current - 0.5) * 1.5,
              ]
            : [-0.4, 0.45, 0.65])
        }
        scale={0.51}>
        <mesh
          scale={0.2}
          geometry={nodes.Object008.geometry}
          material={materials.h}
          rotation={[-2.1, -1.3, -0.5]}
          position={[0, 0.15, 0]}
        />
        <mesh
          scale={0.043}
          geometry={nodes.ChoppingBoard.geometry}
          material={materials.h}
          rotation={[-1.3, -0.1, 0.2]}
          position={[0.3, -0.8, -0.1]}
        />
        <mesh
          scale={0.2}
          geometry={nodes.Object002.geometry}
          material={materials.l_001}
          rotation={[-2.1, -1.3, -0.5]}
          position={[0, 0.15, 0]}
        />
      </group>

      <group
        onClick={clickOnLink}
        position={
          (scrollPosition.current > 0.625 && scrollPosition.current < 0.75
            ? [
                0.1 + 8 * (scrollPosition.current - 0.625) * 2.15,
                0.625 - scrollPosition.current,
                0.15 + 8 * (scrollPosition.current - 0.625) * 1.65,
              ]
            : null) ||
          (scrollPosition.current > 0.75 && scrollPosition.current < 0.875
            ? [
                2.25 - 8 * (scrollPosition.current - 0.75) * 2.15,
                0 - (0.875 - scrollPosition.current),
                1.8 - 8 * (scrollPosition.current - 0.75) * 1.65,
              ]
            : [0.1, 0, 0.15])
        }
        rotation={[1.5, 0, -0.9]}>
        <mesh
          // scale={6.1}
          scale={0.0001}
          position={[0, 0.7, -0.12]}
          rotation={[-0.21, 0, 1.02]}
          geometry={nodes.ChefHat_MESH_001.geometry}
          material={materials.l_001}
        />
        <mesh
          scale={0.03}
          position={[0, 0.43, -0.2]}
          rotation={[1.15, 0, -0.15]}
          geometry={nodes.book.geometry}
          material={materials.h}
        />
      </group>
      <mesh
        onClick={clickOnLink}
        scale={6.2}
        rotation={[1.7, 0.15, 3.8]}
        position={
          (scrollPosition.current < 0.0001 ? [2.1, 0.35, -2.7] : null) ||
          (scrollPosition.current > 0.0001 && scrollPosition.current < 0.125
            ? [
                2.1 - 8 * scrollPosition.current * 1.6,
                0.35 + scrollPosition.current,
                -2.7 + 8 * scrollPosition.current * 2,
              ]
            : null) ||
          (scrollPosition.current > 0.125 && scrollPosition.current < 0.875
            ? [0.5, 0.48, -0.7]
            : null) ||
          (scrollPosition.current > 0.875
            ? [
                0.5 + 8 * (scrollPosition.current - 0.875) * 1.6,
                1.35 - scrollPosition.current,
                -0.7 - 8 * (scrollPosition.current - 0.875) * 2,
              ]
            : null)
        }
        geometry={nodes.Eyes.geometry}
        material={materials.wall_007}
      />
    </group>
  );
}
useGLTF.preload('/untitled2.glb');
