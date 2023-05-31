import React, { useState, useRef, Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import injectStyle from '../../../assets/fonctions/injectStyle';
import './nav.css';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, ScrollControls } from '@react-three/drei';
import { Models } from './3dModels';
import Connexion from '../../Connexion/Connexion';

export default function Nav({ hideFor3dOpening }) {
  // const [dropDelay, setDropDelay] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [connexion, setConnexion] = useState('close');
  const [displayedMenuTitle, setDisplayedMenuTitle] = useState('accueil');
  const [profil, setProfil] = useState('connection');

  const [media, setMedia] = useState(
    window.matchMedia('(max-aspect-ratio: 6/10)').matches
  );
  let menuDisplay = useRef(false);
  let openingNavMenu = useRef(false);
  let openingNavMenuCount = useRef(0);
  let startClock = useRef(false);
  const titleOnChange = (data) => {
    setDisplayedMenuTitle(data);
  };

  const changeProfilTitle = (data) => {
    setProfil(data);
  };

  // const headerAnims = () => {
  //   document.body.style.overflow = 'hidden';
  //   setTimeout(() => {
  //     setDropDelay(!dropDelay);
  //     document.body.style.overflow = 'auto';
  //   }, 4500);
  // };
  const translateXOnNav = (data) => {
    if (menuDisplay.current === true) {
      setTranslateX(data);
    }
  };
  const toggleConnexion = (data) => {
    setConnexion(data);
  };
  const openNavMenu = () => {
    let canvas = document.querySelector('#canvas');
    let connexionAccess = document.querySelector('.connexionAccess');
    let drop = document.querySelectorAll('.drop2');
    let li2 = document.querySelector('.li2');
    let leftH2 = document.querySelector('.leftDropH2');
    let nav = document.querySelector('.juiceDrop');
    let navBox = document.querySelector('.nav');
    let navLeft = nav.getBoundingClientRect().left;
    let navWidth = nav.getBoundingClientRect().width;
    let navRight = nav.getBoundingClientRect().right;
    let w = window.innerWidth;
    li2.style.left = `calc(-${w * 0.5}px + ${Number(w - navRight)}px + ${
      navWidth * 1.75
    }px)`;
    let leftDrop = drop[0];
    let rightDrop = drop[1];
    let resizeDropForAnim = '';
    if (window.matchMedia('(max-aspect-ratio: 8/10)').matches) {
      resizeDropForAnim = '2';
    } else if (
      window.matchMedia('(min-aspect-ratio: 10/5) and (max-width: 800px)')
        .matches
    ) {
      resizeDropForAnim = '3';
    } else {
      resizeDropForAnim = '';
    }
    if (openingNavMenu.current === false) {
      hideFor3dOpening();
      document.body.style.overflow = 'hidden';
      canvas.style.zIndex = 10;
      connexionAccess.style.display = 'block';
      canvas.style.top = `15vh `;
      canvas.style.pointerEvents = 'visible';
      canvas.style.left = '0vw';
      leftDrop.style.animation = '3s dropOpenedFirstOfType';
      leftDrop.style.borderRadius = '0';
      leftDrop.style.top = '-3vh';
      leftDrop.style.width = '50vw';
      leftDrop.style.height = '100vh';
      leftDrop.style.left = ` calc(-${Number(navLeft)}px)`;
      leftDrop.style.zIndex = '9';

      rightDrop.style.animation = '3s dropOpenedLastOfType';
      rightDrop.style.borderRadius = '0';
      rightDrop.style.top = '-3vh';
      rightDrop.style.width = '50vw';
      rightDrop.style.height = '100vh';
      rightDrop.style.right = ` calc(-${Number(w - (navLeft + navWidth))}px )`;
      rightDrop.style.left = 'unset';
      rightDrop.style.zIndex = '9';

      const moveMenuIcon = `
    .firstNav ul li:first-of-type{
      color: transparent;
    }
  `;
      injectStyle(moveMenuIcon);
      const moveMenuIcon1 = `
    .firstNav ul li:first-of-type::before{
      animation: none;
      bottom: 50%;
      height: 7%;
      rotate: 135deg;
      transition: 0.5s ease-in;
    }
  `;
      injectStyle(moveMenuIcon1);
      const myEndFunction = () => {
        leftDrop.style.backgroundColor = 'var(--grey-carbon)';
        rightDrop.style.transition = 'all 0.3s ease-in 0s';
        leftDrop.style.transition = 'all 0.3s ease-in 0s';
        const navDropModify = `
        nav .juiceDrop {
          -webkit-filter:none;
      filter: none;
        }
      `;
        injectStyle(navDropModify);

        if (openingNavMenu.current && openingNavMenuCount.current === 0) {
          setTimeout(() => {
            if (openingNavMenuCount.current === 1) {
              leftH2.style.display = 'block';
            }
          }, 700);
          setTimeout(() => {
            if (openingNavMenuCount.current === 1) {
              li2.style.display = 'block';
            }
          }, 1500);

          setTimeout(() => {
            menuDisplay.current = true;
            startClock.current = true;
            openingNavMenuCount.current = 1;
          }, 200);
        }
      };
      leftDrop.addEventListener('animationend', myEndFunction);
      setTimeout(() => {
        if (openingNavMenu.current) {
          navBox.style.boxShadow = '-2.5vw 5vw 1.5vw 0 rgba(0, 0, 0, 0.15)';
          navBox.style.transition = '0.1s';
        }
      }, 2750);
      const moveMenuIcon2 = `
.firstNav ul li:first-of-type::after{
  animation: none;
  height: 7%;
  width: 50%;
  top: 50%;
  rotate: 45deg;
}
`;
      injectStyle(moveMenuIcon2);
      injectStyle(moveMenuIcon1);
      const moveMenuIconBefore = `
      .firstNav ul li:first-of-type:hover::before {
        animation: none;
        bottom: 50%;
      } 
    `;
      injectStyle(moveMenuIconBefore);
      const moveMenuIconAfter = `
      .firstNav ul li:first-of-type:hover::after {
        animation: none;
        top: 50%;
      }
    `;
      injectStyle(moveMenuIconAfter);
      openingNavMenu.current = true;
    } else if (openingNavMenu.current && openingNavMenuCount.current === 1) {
      hideFor3dOpening();
      document.body.style.overflow = 'auto';
      openingNavMenuCount.current = 0;
      canvas.style.pointerEvents = 'none';
      canvas.style.left = '2vw';
      canvas.style.top = '-150vh';
      navBox.style.boxShadow = 'none';
      li2.style.display = 'none';
      navBox.style.transition = '0s';
      canvas.style.zIndex = 1;
      leftDrop.style.animation = `drop${resizeDropForAnim} 2.3s cubic-bezier(1, 0.19, 0.66, 0.12) infinite`;
      leftDrop.style.borderRadius = '50%';
      leftDrop.style.top = '70%';
      leftDrop.style.width = '40%';
      leftDrop.style.height = '35%';
      leftDrop.style.left = '40%';
      leftH2.style.display = 'none';
      leftDrop.style.zIndex = '12';
      leftDrop.style.backgroundColor = 'var(--blue-pastel)';
      leftDrop.style.transition = 'unset';
      connexionAccess.style.display = 'none';
      rightDrop.style.animation = `drop${resizeDropForAnim} 2.45s cubic-bezier(1, 0.19, 0.66, 0.12) infinite`;
      rightDrop.style.transition = 'unset';
      rightDrop.style.borderRadius = '50%';
      rightDrop.style.top = '70%';
      rightDrop.style.width = '40%';
      rightDrop.style.height = '35%';
      rightDrop.style.left = '40%';
      rightDrop.style.zIndex = '12';
      rightDrop.style.backgroundColor = 'var(--blue-pastel)';
      const moveMenuIcon = `
         .firstNav ul li:first-of-type{
          color: var(--grey-carbon);
        }
      `;
      injectStyle(moveMenuIcon);
      const navDropModify = `
      nav .juiceDrop {
        -webkit-filter: url('#juice');
    filter: url('#juice');
  
      }
    `;
      injectStyle(navDropModify);
      const moveMenuIcon1 = `
        .firstNav ul li:first-of-type::before{
          position: absolute;
          content: '';
          bottom: 100%;
          left: 50%;
          width: 50%;
          height: 3%;
          rotate: -180deg;
          border-radius: 1vw;
          background-color: var(--grey-carbon);
          transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
          animation: liBarAnim 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
        }
      `;
      injectStyle(moveMenuIcon1);
      const moveMenuIconBefore = `
      .firstNav ul li:first-of-type:hover::before {
        animation: none;
        bottom: 115%;
      } 
    `;
      injectStyle(moveMenuIconBefore);
      const moveMenuIconAfter = `
      .firstNav ul li:first-of-type:hover::after {
        animation: none;
        top: 115%;
      }
    `;
      injectStyle(moveMenuIconAfter);
      const moveMenuIcon2 = `
        .firstNav ul li:first-of-type::after{
        position: absolute;
        top: 100%;
        left: 50%;
        content: '';
        width: 50%;
        height: 3%;
        rotate: 0deg;
        border-radius: 1vw;
        background-color: var(--grey-carbon);
        animation: liBarAnim 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
        animation-delay: 0.2s;
        transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
      `;
      injectStyle(moveMenuIcon2);

      openingNavMenu.current = false;
      menuDisplay.current = false;
      startClock.current = false;
    }
  };

  // LOAD LISTENER //   // LOAD LISTENER //   // LOAD LISTENER //
  useEffect(() => {
    const callback2 = () => {
      menuDisplay.current = true;
      openingNavMenu.current = true;
      openingNavMenuCount.current = 1;
      startClock.current = true;

      let canvas = document.querySelector('#canvas');
      let connexionAccess = document.querySelector('.connexionAccess');
      let drop = document.querySelectorAll('.drop2');
      let li2 = document.querySelector('.li2');
      let leftH2 = document.querySelector('.leftDropH2');
      let nav = document.querySelector('.juiceDrop');
      let navBox = document.querySelector('.nav');
      let navLeft = nav.getBoundingClientRect().left;
      let navWidth = nav.getBoundingClientRect().width;
      let navRight = nav.getBoundingClientRect().right;
      let w = window.innerWidth;
      li2.style.left = `calc(-${w * 0.5}px + ${Number(w - navRight)}px + ${
        navWidth * 1.75
      }px)`;
      let leftDrop = drop[0];
      let rightDrop = drop[1];
      let resizeDropForAnim = '';
      if (window.matchMedia('(max-aspect-ratio: 8/10)').matches) {
        resizeDropForAnim = '2';
      } else if (
        window.matchMedia('(min-aspect-ratio: 10/5) and (max-width: 800px)')
          .matches
      ) {
        resizeDropForAnim = '3';
      } else {
        resizeDropForAnim = '';
      }
      if (openingNavMenu.current === false) {
        document.body.style.overflow = 'hidden';
        canvas.style.zIndex = 10;
        connexionAccess.style.display = 'block';
        canvas.style.top = `15vh `;
        canvas.style.pointerEvents = 'visible';
        canvas.style.left = '0vw';
        leftDrop.style.animation = '3s dropOpenedFirstOfType';
        leftDrop.style.borderRadius = '0';
        leftDrop.style.top = '-3vh';
        leftDrop.style.width = '50vw';
        leftDrop.style.height = '100vh';
        leftDrop.style.left = ` calc(-${Number(navLeft)}px)`;
        leftDrop.style.zIndex = '9';

        rightDrop.style.animation = '3s dropOpenedLastOfType';
        rightDrop.style.borderRadius = '0';
        rightDrop.style.top = '-3vh';
        rightDrop.style.width = '50vw';
        rightDrop.style.height = '100vh';
        rightDrop.style.right = ` calc(-${Number(
          w - (navLeft + navWidth)
        )}px )`;
        rightDrop.style.left = 'unset';
        rightDrop.style.zIndex = '9';

        const moveMenuIcon = `
      .firstNav ul li:first-of-type{
        color: transparent;
      }
    `;
        injectStyle(moveMenuIcon);
        const moveMenuIcon1 = `
      .firstNav ul li:first-of-type::before{
        animation: none;
        bottom: 50%;
        height: 7%;
        rotate: 135deg;
        transition: 0.5s ease-in;
      }
    `;
        injectStyle(moveMenuIcon1);
        const myEndFunction = () => {
          leftDrop.style.backgroundColor = 'var(--grey-carbon)';
          rightDrop.style.transition = 'all 0.3s ease-in 0s';
          leftDrop.style.transition = 'all 0.3s ease-in 0s';
          const navDropModify = `
          nav .juiceDrop {
            -webkit-filter:none;
        filter: none;
          }
        `;
          injectStyle(navDropModify);

          if (openingNavMenu.current && openingNavMenuCount.current === 0) {
            if (openingNavMenuCount.current === 1) {
              leftH2.style.display = 'block';
            }

            if (openingNavMenuCount.current === 1) {
              li2.style.display = 'block';
            }

            menuDisplay.current = true;
            startClock.current = true;
            openingNavMenuCount.current = 1;
          }
        };
        leftDrop.addEventListener('animationend', myEndFunction);

        navBox.style.boxShadow = '-2.5vw 5vw 1.5vw 0 rgba(0, 0, 0, 0.15)';
        navBox.style.transition = '0.1s';

        const moveMenuIcon2 = `
  .firstNav ul li:first-of-type::after{
    animation: none;
    height: 7%;
    width: 50%;
    top: 50%;
    rotate: 45deg;
  }
  `;
        injectStyle(moveMenuIcon2);
        openingNavMenu.current = true;
      } else if (openingNavMenu.current && openingNavMenuCount.current === 1) {
        document.body.style.overflow = 'auto';
        openingNavMenuCount.current = 0;
        canvas.style.pointerEvents = 'none';
        canvas.style.left = '2vw';
        canvas.style.top = '-150vh';
        navBox.style.boxShadow = 'none';
        li2.style.display = 'none';
        navBox.style.transition = '0s';
        canvas.style.zIndex = 1;
        leftDrop.style.animation = `drop${resizeDropForAnim} 2.3s cubic-bezier(1, 0.19, 0.66, 0.12) infinite`;
        leftDrop.style.borderRadius = '50%';
        leftDrop.style.top = '70%';
        leftDrop.style.width = '40%';
        leftDrop.style.height = '35%';
        leftDrop.style.left = '40%';
        leftH2.style.display = 'none';
        leftDrop.style.zIndex = '12';
        leftDrop.style.backgroundColor = 'var(--blue-pastel)';
        leftDrop.style.transition = 'unset';
        connexionAccess.style.display = 'none';
        rightDrop.style.animation = `drop${resizeDropForAnim} 2.45s cubic-bezier(1, 0.19, 0.66, 0.12) infinite`;
        rightDrop.style.transition = 'unset';
        rightDrop.style.borderRadius = '50%';
        rightDrop.style.top = '70%';
        rightDrop.style.width = '40%';
        rightDrop.style.height = '35%';
        rightDrop.style.left = '40%';
        rightDrop.style.zIndex = '12';
        rightDrop.style.backgroundColor = 'var(--blue-pastel)';
        const moveMenuIcon = `
           .firstNav ul li:first-of-type{
            color: var(--grey-carbon);
          }
        `;
        injectStyle(moveMenuIcon);
        const navDropModify = `
        nav .juiceDrop {
          -webkit-filter: url('#juice');
      filter: url('#juice');

        }
      `;
        injectStyle(navDropModify);
        const moveMenuIcon1 = `
          .firstNav ul li:first-of-type::before{
            position: absolute;
            content: '';
            bottom: 100%;
            left: 50%;
            width: 50%;
            height: 3%;
            rotate: -180deg;
            border-radius: 1vw;
            background-color: var(--grey-carbon);
            transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
            animation: liBarAnim 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
          }
        `;
        injectStyle(moveMenuIcon1);
        const moveMenuIconBefore = `
        .firstNav ul li:first-of-type:hover::before {
          animation: none;
          bottom: 115%;
        }
      `;
        injectStyle(moveMenuIconBefore);
        const moveMenuIcon2 = `
          .firstNav ul li:first-of-type::after{
          position: absolute;
          top: 100%;
          left: 50%;
          content: '';
          width: 50%;
          height: 3%;
          rotate: 0deg;
          border-radius: 1vw;
          background-color: var(--grey-carbon);
          animation: liBarAnim 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
          animation-delay: 0.2s;
          transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        `;
        injectStyle(moveMenuIcon2);
        const moveMenuIconAfter = `
        .firstNav ul li:first-of-type:hover::after {
          animation: none;
          top: 115%;
        }
      `;
        injectStyle(moveMenuIconAfter);
        openingNavMenu.current = false;
        menuDisplay.current = false;
        startClock.current = false;
      }
    };

    if (document.readyState === 'complete') {
      callback2();
    } else {
      window.addEventListener('load', callback2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayCanvas = () => {
    openNavMenu();
  };
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  useEffect(() => {
    const resizeListener = () => {
      // let mediaSize = window.matchMedia('(max-aspect-ratio: 6/10)').matches;
      // setMedia(mediaSize);
      let drop = document.querySelectorAll('.drop2');
      let nav = document.querySelector('.juiceDrop');
      let navLeft = nav.getBoundingClientRect().left;
      let navWidth = nav.getBoundingClientRect().width;
      let w = window.innerWidth;
      let navRight = nav.getBoundingClientRect().right;
      let li2 = document.querySelector('.li2');
      li2.style.left = `calc(-${w * 0.5}px + ${Number(w - navRight)}px + ${
        navWidth * 1.6
      }px)`;
      let leftDrop = drop[0];
      let rightDrop = drop[1];
      leftDrop.style.animation = 'none';
      rightDrop.style.animation = 'none';
      if (openingNavMenu.current) {
        leftDrop.style.left = ` calc(-${Number(navLeft)}px)`;
        rightDrop.style.right = ` calc(-${Number(
          w - (navLeft + navWidth)
        )}px )`;
      }
      // else {
      //   if (window.matchMedia('(max-aspect-ratio: 8/10)').matches) {
      //     leftDrop.style.animationName = 'drop2';
      //     rightDrop.style.animationName = 'drop2';
      //   } else if (
      //     window.matchMedia('(min-aspect-ratio: 10/5) and (max-width: 800px)')
      //       .matches
      //   ) {
      //     leftDrop.style.animationName = 'drop3';
      //     rightDrop.style.animationName = 'drop3';
      //   } else {
      //     leftDrop.style.animationName = 'drop';
      //     rightDrop.style.animationName = 'drop';
      //   }
      // }
    };
    window.addEventListener('resize', resizeListener);
  });

  return (
    <Fragment>
      <nav
        className='firstNav'
        style={
          {
            // display: `${dropDelay ? 'block' : 'none'}`,
          }
        }>
        <div className='nav'></div>
        <ul>
          <li onClick={displayCanvas}>menu</li>
          <li onClick={displayCanvas} className='li2'>
            <NavLink
              id='linkTo'
              to={`/${
                displayedMenuTitle === 'studio des aliments'
                  ? 'aliments-studio'
                  : displayedMenuTitle === 'studio des recettes'
                  ? 'recettes-studio'
                  : displayedMenuTitle === 'livre des recettes'
                  ? 'recettes-book'
                  : ''
              }`}
              end>
              <p
                style={{
                  transform: `translateX(${translateX}%)`,
                }}>
                {displayedMenuTitle}
              </p>
            </NavLink>
          </li>
        </ul>
        <div className='juiceDrop'>
          <div className='drop1'></div>
          <div className='drop2'>
            <h2 className='leftDropH2'>recipes studios</h2>
          </div>
          <div className='drop2'></div>
        </div>
        <div
          onClick={(e) => toggleConnexion('open')}
          className='connexionAccess'>
          {profil}
        </div>
      </nav>
      <Canvas
        id='canvas'
        style={{
          zIndex: '0',
          height: '90vh',
          position: 'fixed',
          top: '-150vh',
          // opacity: 0,
          left: '2vw',
          pointerEvents: 'none',
        }}
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <spotLight
          position={[20, 2, 20]}
          angle={0.15}
          penumbra={0.5}
          shadow-mapSize={[512, 512]}
          castShadow
        />
        <ScrollControls pages={4}>
          <Models
            menuDisplay={menuDisplay}
            startClock={startClock}
            titleOnChange={titleOnChange}
            translateXOnNav={translateXOnNav}
            position={[0, 0, -1]}
            scale={media ? 0.6 : 0.75}
          />
        </ScrollControls>
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.75}
          scale={10}
          blur={2.5}
          far={4}
        />
        <Environment preset='city' />
      </Canvas>
      <svg
        style={{ display: 'block', height: '0', width: '0' }}
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'>
        <defs>
          <filter id='juice'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='8' result='blur' />
            <feColorMatrix
              in='blur'
              values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7'
              result='juice'
            />
          </filter>
        </defs>
      </svg>
      <Connexion
        changeProfilTitle={changeProfilTitle}
        connexion={connexion}
        toggleConnexion={toggleConnexion}
      />
    </Fragment>
  );
}
