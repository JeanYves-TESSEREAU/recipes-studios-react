/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import Nav from '../GlobalComponents/navigation/Nav';
import injectStyle from '../../assets/fonctions/injectStyle.js';
import imgAliment1 from '../../assets/img/aliment1.png';
import imgAliment2 from '../../assets/img/aliment2.png';
import imgRecettes1 from '../../assets/img/recettes1.png';
import imgRecettes2 from '../../assets/img/recettes2.png';
import imgRecettes3 from '../../assets/img/recettes3.png';
import imgRecettesBook1 from '../../assets/img/recettesBook1.png';
import imgRecettesBook2 from '../../assets/img/recettesBook2.png';
import imgRecettesBook3 from '../../assets/img/recettesBook3.png';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdAttachEmail } from 'react-icons/md';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
// import { useDebouncedCallback } from 'use-debounce';
// import useDebounce from '../../assets/fonctions/useDebounce';

export default function Home() {
  let section2Top = useRef(0);
  let coeffSizing = useRef(1);
  let homeWidth = useRef(window.innerWidth);
  let isScrolling;
  let actualScrollPourcent = useRef(0);
  let isScrollingBis;
  const [visibility, setVisibility] = useState(true);
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  let countForWelcomeSpanAfter = 0;
  let userAgent = navigator.userAgent;
  let browserName;

  //  DYNAMIC STYLE VARIABLES   //  ON BELOW  //  DYNAMIC STYLE VARIABLES
  //  DYNAMIC STYLE VARIABLES   //  ON BELOW  //  DYNAMIC STYLE VARIABLES
  const menuIsItOpenedStyle = {
    opacity: visibility ? '1' : '0',
  };
  //  DYNAMIC STYLE VARIABLES   //  ABOVE  //  DYNAMIC STYLE VARIABLES
  //  DYNAMIC STYLE VARIABLES   //  ABOVE  //  DYNAMIC STYLE VARIABLES

  const preventHrefScrollTop = () => {
    let home = document.querySelector('.Home');
    setTimeout(() => {
      console.log('hidden', home.offsetHeight * 2, home);
      window.scrollTo(0, home.offsetHeight * 2);
    }, 100);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let headerParallax = [
    0.3, 0.7, 0.2, 0.4, 0.6, 0.1, 0.9, 0.5, 0.35, 0.75, 0.25, 0.95, 0.65, 0.45,
  ];

  const hideFor3dOpening = () => {
    setVisibility(!visibility);
  };
  const headerAnim = () => {
    let h1Span = document.querySelectorAll('[data-data]');

    for (let index = 0; index <= h1Span.length; index++) {
      const h1After = `
            header h1 span:nth-child(${index})::after{
              animation-delay:${0.4 + 0.1 * index}s;
            }
          `;
      injectStyle(h1After);
      const h1Before = `
            header h1 span:nth-child(${index})::before{
            
              animation-delay:${0.4 + 0.1 * index}s;
              text-shadow: ${
                browserName === 'safari'
                  ? 'rgba(0, 0, 0, 0.6) -1vw 0.7vw 1.1vw'
                  : 'rgba(0, 0, 0, 0.85) -1vw 0.7vw 1.1vw'
              }
            }
          `;
      injectStyle(h1Before);
      // }

      if (index === 5 || index === 9) {
        const h1Before = `
          header h1 span:nth-child(${index})::before{
            text-shadow: ${
              browserName === 'safari'
                ? 'rgba(0, 0, 0, 0.6) -1vw 0.7vw 1.1vw'
                : 'rgba(0, 0, 0, 0.85) -1vw 0.7vw 1.1vw'
            }
          }
        `;
        injectStyle(h1Before);

        setTimeout(() => {
          const h1Before = `
          header h1 span:nth-child(${index})::before{
            animation : h1BeforeAnimBis 0.5s ease-out;
            transform: scale(1, 1) skew(0deg, -25deg);

          }
        `;
          injectStyle(h1Before);
          const h1After2 = `
            header h1 span:nth-child(${index})::after{
              transform: rotateY(45deg);
            }
          `;
          injectStyle(h1After2);
        }, 4000);
      }
    }
  };

  // LOAD LISTENER //   // LOAD LISTENER //   // LOAD LISTENER //
  // LOAD LISTENER //   // LOAD LISTENER //   // LOAD LISTENER //
  // LOAD LISTENER //   // LOAD LISTENER //   // LOAD LISTENER //
  useEffect(() => {
    const callback = () => {
      let h1Span = document.querySelectorAll('[data-data]');
      let aside = document.querySelectorAll('aside');

      let asidePosition = aside[0].getBoundingClientRect();
      section2Top.current =
        asidePosition.top + asidePosition.height + window.scrollY;

      for (let index = 0; index < h1Span.length; index++) {
        setTimeout(() => {
          window.scrollTo(0, 0);
          if (index !== 0 && index !== 7) {
            h1Span[index].style.left = `calc(0vw  + ${
              h1Span[index - 1].getBoundingClientRect().right
            }px )`;
          } else if (index === 0) {
            h1Span[index].style.left = '15vw';
          } else if (index === 7) {
            h1Span[index].style.left = '10vw';
          }
          h1Span[index].style.opacity = '1';
        }, 50);
        if (index > 6) {
          h1Span[index].style.top = `calc(55vh)`;
        } else {
          h1Span[index].style.top = `calc(45vh )`;
          h1Span[index].style.transform = `translateY(${-h1Span[index]
            .offsetHeight}px)`;
        }
      }

      if (userAgent.match(/chrome|chromium|crios/i)) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        browserName = 'chrome';
      } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = 'firefox';
      } else if (userAgent.match(/safari/i)) {
        browserName = 'safari';
      } else if (userAgent.match(/opr\//i)) {
        browserName = 'opera';
      } else if (userAgent.match(/edg/i)) {
        browserName = 'edge';
      } else {
        browserName = 'No browser detection';
      }
    };
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  }, []);

  // RESIZE LISTENER //   // RESIZE LISTENER //   // RESIZE LISTENER //
  // RESIZE LISTENER //   // RESIZE LISTENER //   // RESIZE LISTENER //
  // RESIZE LISTENER //   // RESIZE LISTENER //   // RESIZE LISTENER //
  useEffect(() => {
    if (window.location.pathname === '/' && visibility) {
      const resizeListener = () => {
        if (window.location.pathname === '/' && visibility) {
          let home = document.querySelector('.Home');
          coeffSizing.current = window.innerWidth / homeWidth.current;

          let aside = document.querySelectorAll('aside');
          let asidePosition = aside[0].getBoundingClientRect();
          section2Top.current =
            asidePosition.top + asidePosition.height + window.scrollY;
          window.scrollTo(
            0,
            (actualScrollPourcent.current * home.offsetHeight) / 100
          );
          let h1Span = document.querySelectorAll('[data-data]');
          for (let index = 0; index < h1Span.length; index++) {
            h1Span[index].style.transition = 'none';
            if (index !== 0 && index !== 7) {
              h1Span[index].style.left = `calc(0vw  + ${
                h1Span[index - 1].getBoundingClientRect().right
              }px )`;
            } else if (index === 0) {
              h1Span[index].style.left = '15vw';
            } else if (index === 7) {
              h1Span[index].style.left = '10vw';
            }
            if (index > 6) {
              h1Span[index].style.transform = ` translateY(-${
                window.scrollY * headerParallax[index] * 0.4
              }px)`;
            } else {
              h1Span[index].style.transform = ` translateY(calc(-${
                window.scrollY * headerParallax[index] * 0.75
              }px - ${h1Span[index].offsetHeight}px))`;
            }
          }
        }
      };
      window.addEventListener('resize', resizeListener);
    }
  }, [windowHeight, windowWidth, headerParallax]);

  // ENTRANCE ANIM STATE LISTENER //   // ENTRANCE ANIM STATE LISTENER //   // ENTRANCE ANIM STATE LISTENER //
  // ENTRANCE ANIM STATE LISTENER //   // ENTRANCE ANIM STATE LISTENER //   // ENTRANCE ANIM STATE LISTENER //
  // ENTRANCE ANIM STATE LISTENER //   // ENTRANCE ANIM STATE LISTENER //   // ENTRANCE ANIM STATE LISTENER //
  useEffect(() => {
    headerAnim();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SCROLL LISTENER //   // SCROLL LISTENER //   // SCROLL LISTENER //
  // SCROLL LISTENER //   // SCROLL LISTENER //   // SCROLL LISTENER //
  // SCROLL LISTENER //   // SCROLL LISTENER //   // SCROLL LISTENER //

  // const scrollActionsDebounced = useDebounce(
  //   () => {
  // // THE NEXT LINE IS ABOUT SOLVE A HARD BUGG LISTENER IN ALL DOM !
  //   if (
  //     window.location.pathname === '/' &&
  //     `${!visibility ? visibility : !visibility}`

  //     //     // THE ABOVE LINE IS ABOUT SOLVE A HARD BUGG LISTENER IN ALL DOM !
  //   ) {
  //     console.log(window.scrollY, window.pageYOffset);
  //     let h1Span = document.querySelectorAll('[data-data]');
  //     let sections = document.querySelectorAll('section');
  //     let imageSlider = document.querySelector('.imageSlider');
  //     let section2 = sections[1];
  //     let aside = document.querySelectorAll('aside');
  //     let asidePosition = aside[0].getBoundingClientRect();
  //     let welcomeSpan = document.querySelectorAll('.welcomeSpan');
  //     let welcomeH2 = document.querySelector('.welcomeH2');
  //     let welcomeH2Position = welcomeH2.getBoundingClientRect();
  //     let welcomeH3 = document.querySelectorAll('.welcomeH3');
  //     let home = document.querySelector('.Home');
  //     actualScrollPourcent.current = (window.scrollY / home.offsetHeight) * 100;

  //     // SCROLL ACTIONS FOR HEADER AND NAV //

  //     {

  //       let h2 = document.querySelector('h2');

  //       h2.style.opacity = `${1 - 0.02 * window.scrollY}`;
  //       for (let index = 0; index < h1Span.length; index++) {
  //         if (index > 6) {
  //           h1Span[index].style.transition = `ease-out ${
  //             headerParallax[index] * 0.2
  //           }s`;
  //           h1Span[index].style.transform = `translateY(-${
  //             window.scrollY * headerParallax[index] * 0.4
  //           }px) `;
  //         } else {
  //           h1Span[index].style.transition = `ease-out ${
  //             headerParallax[index] * 0.2
  //           }s`;
  //           h1Span[index].style.transform = ` translateY(calc(-${
  //             window.scrollY * headerParallax[index] * 0.75
  //           }px - ${h1Span[index].offsetHeight}px))`;
  //         }
  //       }
  //     }
  //     // SCROLL ACTIONS FOR FIRST SECTION //
  //     // SCROLL ACTIONS FOR FIRST SECTION //
  //     // SCROLL ACTIONS FOR FIRST SECTION //
  //     // SCROLL ACTIONS FOR FIRST SECTION //

  //     if (
  //       window.scrollY > home.offsetHeight * 0.08 &&
  //       countForWelcomeSpanAfter < 1
  //     ) {
  //       const h1After = `
  //   .Home main section:first-of-type h2 span::after {
  //     display: initial;
  //   }
  // `;
  //       injectStyle(h1After);
  //       countForWelcomeSpanAfter++;
  //     }
  //     if (
  //       window.scrollY > home.offsetHeight * 0.05 &&
  //       window.scrollY < home.offsetHeight * 0.07
  //     ) {
  //       welcomeH2.style.display = 'block';
  //       welcomeH2.style.left = '35%';
  //     } else if (
  //       window.scrollY > home.offsetHeight * 0.07 &&
  //       welcomeH2Position.top + welcomeH2Position.height + 10 <
  //         asidePosition.top
  //     ) {
  //       welcomeH2.style.left = '35%';
  //       if (browserName !== 'firefox') {
  //         setTimeout(() => {
  //           welcomeH2.style.transform = ` translateY(${
  //             window.scrollY - home.offsetHeight * 0.07
  //           }px)`;
  //         }, 10);
  //       } else
  //         welcomeH2.style.transform = ` translateY(${
  //           window.scrollY - home.offsetHeight * 0.07
  //         }px)`;

  //       for (let index = 0; index < welcomeSpan.length; index++) {
  //         welcomeSpan[index].style.scale = '1';
  //       }
  //     } else if (
  //       asidePosition.top + asidePosition.height >
  //         welcomeH2Position.height *
  //           (window.matchMedia('(max-aspect-ratio: 8/10)').matches ? 1 : 0.5) &&
  //       window.scrollY > home.offsetHeight * 0.05
  //     ) {
  //       window.clearTimeout(isScrollingBis);
  //       for (let i = 0; i < welcomeH3.length; i++) {
  //         welcomeH3[i].style.paddingTop = `15%`;
  //       }
  //       welcomeH2.style.paddingBottom = '8%';
  //       isScrollingBis = setTimeout(() => {
  //         for (let i = 0; i < welcomeH3.length; i++) {
  //           welcomeH3[i].style.paddingTop = `12%`;
  //         }
  //         welcomeH2.style.paddingBottom = '2%';
  //       }, 100);
  //       if (window.matchMedia('(max-aspect-ratio: 8/10)').matches) {
  //         for (let index = 0; index < welcomeSpan.length; index++) {
  //           welcomeSpan[index].style.scale = `${
  //             welcomeSpan[index].style.scale === 0 ? '' : 0
  //           }`;
  //         }
  //       } else {
  //         for (let index = 0; index < welcomeSpan.length; index++) {
  //           welcomeSpan[index].style.scale = `${
  //             welcomeSpan[index].style.scale === 1 ? '' : 1
  //           }`;
  //         }
  //       }
  //       welcomeH2.style.left = '5%';
  //       if (browserName !== 'firefox') {
  //         setTimeout(() => {
  //           welcomeH2.style.transform = ` translateY(${
  //             window.scrollY - home.offsetHeight * 0.06
  //           }px)`;
  //         }, 10);
  //       } else
  //         welcomeH2.style.transform = ` translateY(${
  //           window.scrollY - home.offsetHeight * 0.06
  //         }px)`;
  //     } else {
  //       welcomeH2.style.left = '35%';

  //       for (let index = 0; index < welcomeSpan.length; index++) {
  //         welcomeSpan[index].style.scale = '1';
  //       }
  //     }

  //     for (let index = 0; index < welcomeSpan.length; index++) {
  //       welcomeSpan[index].style.opacity = '1';
  //       welcomeSpan[index].style.top = `
  //        calc(${2 * welcomeSpan[index].offsetHeight}px + ${
  //         welcomeSpan[index].offsetHeight * index
  //       }px)`;
  //       welcomeSpan[index].style.transform = ` translateY(${
  //         -window.scrollY * 0.1
  //       }%)`;
  //     }

  //     // SCROLL ACTIONS FOR SECOND SECTION //
  //     // SCROLL ACTIONS FOR SECOND SECTION //
  //     // SCROLL ACTIONS FOR SECOND SECTION //
  //     // SCROLL ACTIONS FOR SECOND SECTION //
  //     {
  //       let centerContentSection2 = document.querySelector(
  //         '.centerContentSection2'
  //       );
  //       let h4Center = centerContentSection2.querySelector('h4');
  //       let figcaptions = document.querySelectorAll('figcaption');
  //       let figures = document.querySelectorAll('figure');
  //       let h3 = section2.querySelectorAll('h3');
  //       let section2Open = section2Top.current + welcomeH2Position.height * 2.5;
  //       if (window.scrollY > section2Open) {
  //         section2.style.position = 'fixed'
  //           ? ''
  //           : (section2.style.position = 'fixed') &&
  //             (section2.style.top = '0') &&
  //             (section2.style.left = '0') &&
  //             (h3[0].style.transform = 'translateX(0)') &&
  //             (h3[1].style.transform = 'translateX(0)');
  //         section2.style.position = 'fixed';
  //         section2.style.top = '0';
  //         section2.style.left = '0';
  //         h3[0].style.transform = 'translateX(0)';
  //         h3[1].style.transform = 'translateX(0)';
  //         if (window.scrollY > section2Open + 0.02 * home.offsetHeight) {
  //           h3[0].style.top = `-40%`;
  //           h3[1].style.bottom = `-40%`;
  //           if (
  //             window.scrollY > section2Open + 0.02 * home.offsetHeight &&
  //             window.scrollY < section2Open + 0.025 * home.offsetHeight
  //           ) {
  //             h4Center.style.opacity = 0;
  //             h4Center.style.scale = 0;
  //           } else if (
  //             window.scrollY > section2Open + 0.025 * home.offsetHeight &&
  //             window.scrollY < section2Open + 0.15 * home.offsetHeight
  //           ) {
  //             let distanceToScale =
  //               section2Open +
  //               0.15 * home.offsetHeight -
  //               (section2Open + 0.025 * home.offsetHeight);
  //             setTimeout(() => {
  //               h4Center.style.scale = `${
  //                 (window.scrollY +
  //                   distanceToScale -
  //                   (section2Open + 0.15 * home.offsetHeight)) /
  //                 distanceToScale
  //               }`;

  //               h4Center.style.opacity = `${
  //                 (window.scrollY +
  //                   distanceToScale -
  //                   (section2Open + 0.15 * home.offsetHeight)) /
  //                 distanceToScale
  //               }`;
  //             }, 10);
  //             centerContentSection2.scrollLeft = 0;
  //           } else if (
  //             window.scrollY > section2Open + 0.15 * home.offsetHeight &&
  //             window.scrollY < section2Open + 0.3 * home.offsetHeight
  //           ) {
  //             let distanceToTranslate =
  //               section2Open +
  //               0.3 * home.offsetHeight -
  //               (section2Open + 0.15 * home.offsetHeight);
  //             coeffSizing.current = window.innerWidth / homeWidth.current;

  //             // 125 = 125 % of inner width because the image slider component start from a 125% left position
  //             let distanceInPourcent = 125 / distanceToTranslate;
  //             if (browserName === 'firefox') {
  //               h4Center.style.transform = `translate(${
  //                 -50 -
  //                 (window.scrollY - (section2Open + 0.15 * home.offsetHeight)) *
  //                   distanceInPourcent
  //               }%, -50%)`;

  //               imageSlider.style.transform = `translate(${
  //                 (-(
  //                   window.scrollY -
  //                   (section2Open + 0.15 * home.offsetHeight)
  //                 ) *
  //                   distanceInPourcent) /
  //                 8
  //               }%, 0%)`;
  //             } else {
  //               setTimeout(() => {
  //                 h4Center.style.transform = `translate(${
  //                   -50 -
  //                   (window.scrollY -
  //                     (section2Open + 0.15 * home.offsetHeight)) *
  //                     distanceInPourcent
  //                 }%, -50%)`;

  //                 imageSlider.style.transform = `translate(${
  //                   (-(
  //                     window.scrollY -
  //                     (section2Open + 0.15 * home.offsetHeight)
  //                   ) *
  //                     distanceInPourcent) /
  //                   8
  //                 }%, 0%)`;
  //               }, 20);
  //             }
  //           } else if (
  //             window.scrollY > section2Open + 0.3 * home.offsetHeight &&
  //             window.scrollY < section2Open + 0.9 * home.offsetHeight
  //           ) {
  //             window.clearTimeout(isScrolling);
  //             for (let i = 0; i < figures.length; i++) {
  //               figures[i].style.scale = `0.75`;
  //             }

  //             isScrolling = setTimeout(() => {
  //               for (let i = 0; i < figures.length; i++) {
  //                 figures[i].style.scale = `1`;
  //               }
  //             }, 300);
  //             let distanceToTranslate =
  //               section2Open +
  //               0.9 * home.offsetHeight -
  //               (section2Open + 0.3 * home.offsetHeight);
  //             // THIS CODE BELOW IS ABOUT IMAGE SLIDER  SCROLLING TO LEFT EFFECT ! BUT !  WITH  PROBLEMS BECAUSE OF WINDOW.SCROLLY NOT SCROLLING SMOOTHLY AND JUMPING

  //             // centerContentSection2.scrollLeft = `${
  //             //   -(windowWidth * coeffSizing.current) * 8 +
  //             //   ((window.scrollY +
  //             //     distanceToTranslate -
  //             //     (section2Open + 0.3 * home.offsetHeight)) /
  //             //     distanceToTranslate) *
  //             //     (windowWidth * coeffSizing.current) *
  //             //     8
  //             // } `;

  //             // THIS CODE BELOW IS ABOUT IMAGE SLIDER  SCROLLING TO LEFT EFFECT ! BUT !  WITH TRANSLATE IN ORDER TO SOLVE JUMPING PROBLEMS

  //             setTimeout(() => {
  //               imageSlider.style.transform = `translateX(calc(${
  //                 -1.25 * window.innerWidth
  //               }px - ${
  //                 -window.innerWidth * 6.95 +
  //                 ((window.scrollY +
  //                   distanceToTranslate -
  //                   (section2Open + 0.3 * home.offsetHeight)) /
  //                   distanceToTranslate) *
  //                   window.innerWidth *
  //                   6.95
  //               }px))`;
  //               centerContentSection2.scrollTop = 0;
  //               for (let i = 0; i < figcaptions.length; i++) {
  //                 figcaptions[i].style.transform = `translateY(${
  //                   (figures[i].getBoundingClientRect().right /
  //                     figures[i].getBoundingClientRect().width) *
  //                   100
  //                 }%)`;
  //               }
  //             }, 10);
  //             centerContentSection2.style.opacity = '1';
  //           } else {
  //             centerContentSection2.style.opacity = '0.05';
  //             coeffSizing.current = window.innerWidth / homeWidth.current;
  //             // centerContentSection2.scrollLeft = 8 * window.innerWidth;
  //             imageSlider.style.transform = `translateX(-${
  //               8.15 * window.innerWidth
  //             }px)`;
  //           }
  //         } else {
  //           h3[0].style.top = `0`;
  //           h3[1].style.bottom = `0`;
  //         }
  //       } else {
  //         section2.style.position = 'absolute';
  //         section2.style.top = `${
  //           welcomeH2Position.height * 2.5 + section2Top.current
  //         }px`;
  //         section2.style.left = '0';
  //       }
  //     }
  //   }
  //   },
  //   // delay in ms
  //   10
  // );

  // let timer;

  onscroll = function () {
    // scrollActionsDebounced();

    // THE NEXT LINE IS ABOUT SOLVE A HARD BUGG LISTENER IN ALL DOM !
    if (
      window.location.pathname === '/' &&
      `${!visibility ? visibility : !visibility}`

      //     // THE ABOVE LINE IS ABOUT SOLVE A HARD BUGG LISTENER IN ALL DOM !
    ) {
      console.log(window.scrollY, window.pageYOffset);
      let h1Span = document.querySelectorAll('[data-data]');
      let sections = document.querySelectorAll('section');
      let imageSlider = document.querySelector('.imageSlider');
      let section2 = sections[1];
      let aside = document.querySelectorAll('aside');
      let asidePosition = aside[0].getBoundingClientRect();
      let welcomeSpan = document.querySelectorAll('.welcomeSpan');
      let welcomeH2 = document.querySelector('.welcomeH2');
      let welcomeH2Position = welcomeH2.getBoundingClientRect();
      let welcomeH3 = document.querySelectorAll('.welcomeH3');
      let home = document.querySelector('.Home');
      actualScrollPourcent.current = (window.scrollY / home.offsetHeight) * 100;

      // SCROLL ACTIONS FOR HEADER AND NAV //

      {
        let h2 = document.querySelector('h2');

        h2.style.opacity = `${1 - 0.02 * window.scrollY}`;
        for (let index = 0; index < h1Span.length; index++) {
          if (index > 6) {
            h1Span[index].style.transition = `ease-out ${
              headerParallax[index] * 0.2
            }s`;
            h1Span[index].style.transform = `translateY(-${
              window.scrollY * headerParallax[index] * 0.4
            }px) `;
          } else {
            h1Span[index].style.transition = `ease-out ${
              headerParallax[index] * 0.2
            }s`;
            h1Span[index].style.transform = ` translateY(calc(-${
              window.scrollY * headerParallax[index] * 0.75
            }px - ${h1Span[index].offsetHeight}px))`;
          }
        }
      }
      // SCROLL ACTIONS FOR FIRST SECTION //
      // SCROLL ACTIONS FOR FIRST SECTION //
      // SCROLL ACTIONS FOR FIRST SECTION //
      // SCROLL ACTIONS FOR FIRST SECTION //

      if (
        window.scrollY > home.offsetHeight * 0.08 &&
        countForWelcomeSpanAfter < 1
      ) {
        const h1After = `
    .Home main section:first-of-type h2 span::after {
      display: initial;
    }
  `;
        injectStyle(h1After);
        countForWelcomeSpanAfter++;
      }
      if (
        window.scrollY > home.offsetHeight * 0.05 &&
        window.scrollY < home.offsetHeight * 0.07
      ) {
        welcomeH2.style.display = 'block';
        welcomeH2.style.left = '35%';
      } else if (
        window.scrollY > home.offsetHeight * 0.07 &&
        welcomeH2Position.top + welcomeH2Position.height + 10 <
          asidePosition.top
      ) {
        welcomeH2.style.left = '35%';
        if (browserName !== 'firefox') {
          // clearTimeout(timer);
          // timer =
          setTimeout(() => {
            welcomeH2.style.transform = ` translateY(${
              window.scrollY - home.offsetHeight * 0.07
            }px)`;
          }, 10);
        } else
          welcomeH2.style.transform = ` translateY(${
            window.scrollY - home.offsetHeight * 0.07
          }px)`;

        for (let index = 0; index < welcomeSpan.length; index++) {
          welcomeSpan[index].style.scale = '1';
        }
      } else if (
        asidePosition.top + asidePosition.height >
          welcomeH2Position.height *
            (window.matchMedia('(max-aspect-ratio: 8/10)').matches ? 1 : 0.5) &&
        window.scrollY > home.offsetHeight * 0.05
      ) {
        window.clearTimeout(isScrollingBis);
        for (let i = 0; i < welcomeH3.length; i++) {
          welcomeH3[i].style.paddingTop = `15%`;
        }
        welcomeH2.style.paddingBottom = '8%';
        isScrollingBis = setTimeout(() => {
          for (let i = 0; i < welcomeH3.length; i++) {
            welcomeH3[i].style.paddingTop = `12%`;
          }
          welcomeH2.style.paddingBottom = '2%';
        }, 100);
        if (window.matchMedia('(max-aspect-ratio: 8/10)').matches) {
          for (let index = 0; index < welcomeSpan.length; index++) {
            welcomeSpan[index].style.scale = `${
              welcomeSpan[index].style.scale === 0 ? '' : 0
            }`;
          }
        } else {
          for (let index = 0; index < welcomeSpan.length; index++) {
            welcomeSpan[index].style.scale = `${
              welcomeSpan[index].style.scale === 1 ? '' : 1
            }`;
          }
        }
        welcomeH2.style.left = '5%';
        if (browserName !== 'firefox') {
          // clearTimeout(timer);
          // timer =
          setTimeout(() => {
            welcomeH2.style.transform = ` translateY(${
              window.scrollY - home.offsetHeight * 0.06
            }px)`;
          }, 10);
        } else
          welcomeH2.style.transform = ` translateY(${
            window.scrollY - home.offsetHeight * 0.06
          }px)`;
      } else {
        welcomeH2.style.left = '35%';

        for (let index = 0; index < welcomeSpan.length; index++) {
          welcomeSpan[index].style.scale = '1';
        }
      }

      for (let index = 0; index < welcomeSpan.length; index++) {
        welcomeSpan[index].style.opacity = '1';
        welcomeSpan[index].style.top = `
         calc(${2 * welcomeSpan[index].offsetHeight}px + ${
          welcomeSpan[index].offsetHeight * index
        }px)`;
        welcomeSpan[index].style.transform = ` translateY(${
          -window.scrollY * 0.1
        }%)`;
      }

      // SCROLL ACTIONS FOR SECOND SECTION //
      // SCROLL ACTIONS FOR SECOND SECTION //
      // SCROLL ACTIONS FOR SECOND SECTION //
      // SCROLL ACTIONS FOR SECOND SECTION //
      {
        let centerContentSection2 = document.querySelector(
          '.centerContentSection2'
        );
        let h4Center = centerContentSection2.querySelector('h4');
        let figcaptions = document.querySelectorAll('figcaption');
        let figures = document.querySelectorAll('figure');
        let h3 = section2.querySelectorAll('h3');
        let section2Open = section2Top.current + welcomeH2Position.height * 2.5;
        if (window.scrollY > section2Open) {
          section2.style.position = 'fixed'
            ? ''
            : (section2.style.position = 'fixed') &&
              (section2.style.top = '0') &&
              (section2.style.left = '0') &&
              (h3[0].style.transform = 'translateX(0)') &&
              (h3[1].style.transform = 'translateX(0)');
          section2.style.position = 'fixed';
          section2.style.top = '0';
          section2.style.left = '0';
          h3[0].style.transform = 'translateX(0)';
          h3[1].style.transform = 'translateX(0)';
          if (window.scrollY > section2Open + 0.02 * home.offsetHeight) {
            h3[0].style.top = `-40%`;
            h3[1].style.bottom = `-40%`;
            if (
              window.scrollY > section2Open + 0.02 * home.offsetHeight &&
              window.scrollY < section2Open + 0.025 * home.offsetHeight
            ) {
              h4Center.style.opacity = 0;
              h4Center.style.scale = 0;
            } else if (
              window.scrollY > section2Open + 0.025 * home.offsetHeight &&
              window.scrollY < section2Open + 0.15 * home.offsetHeight
            ) {
              let distanceToScale =
                section2Open +
                0.15 * home.offsetHeight -
                (section2Open + 0.025 * home.offsetHeight);
              if (browserName !== 'firefox') {
                setTimeout(() => {
                  h4Center.style.scale = `${
                    (window.scrollY +
                      distanceToScale -
                      (section2Open + 0.15 * home.offsetHeight)) /
                    distanceToScale
                  }`;

                  h4Center.style.opacity = `${
                    (window.scrollY +
                      distanceToScale -
                      (section2Open + 0.15 * home.offsetHeight)) /
                    distanceToScale
                  }`;
                }, 10);
              } else {
                h4Center.style.scale = `${
                  (window.scrollY +
                    distanceToScale -
                    (section2Open + 0.15 * home.offsetHeight)) /
                  distanceToScale
                }`;

                h4Center.style.opacity = `${
                  (window.scrollY +
                    distanceToScale -
                    (section2Open + 0.15 * home.offsetHeight)) /
                  distanceToScale
                }`;
              }
              centerContentSection2.scrollLeft = 0;
            } else if (
              window.scrollY > section2Open + 0.15 * home.offsetHeight &&
              window.scrollY < section2Open + 0.3 * home.offsetHeight
            ) {
              let distanceToTranslate =
                section2Open +
                0.3 * home.offsetHeight -
                (section2Open + 0.15 * home.offsetHeight);
              coeffSizing.current = window.innerWidth / homeWidth.current;

              // 125 = 125 % of inner width because the image slider component start from a 125% left position
              let distanceInPourcent = 125 / distanceToTranslate;
              if (browserName === 'firefox') {
                h4Center.style.transform = `translate(${
                  -50 -
                  (window.scrollY - (section2Open + 0.15 * home.offsetHeight)) *
                    distanceInPourcent
                }%, -50%)`;

                imageSlider.style.transform = `translate(${
                  (-(
                    window.scrollY -
                    (section2Open + 0.15 * home.offsetHeight)
                  ) *
                    distanceInPourcent) /
                  8
                }%, 0%)`;
              } else {
                // clearTimeout(timer);

                setTimeout(() => {
                  h4Center.style.transform = `translate(${
                    -50 -
                    (window.scrollY -
                      (section2Open + 0.15 * home.offsetHeight)) *
                      distanceInPourcent
                  }%, -50%)`;

                  imageSlider.style.transform = `translate(${
                    (-(
                      window.scrollY -
                      (section2Open + 0.15 * home.offsetHeight)
                    ) *
                      distanceInPourcent) /
                    8
                  }%, 0%)`;
                }, 5);
              }
            } else if (
              window.scrollY > section2Open + 0.3 * home.offsetHeight &&
              window.scrollY < section2Open + 0.9 * home.offsetHeight
            ) {
              window.clearTimeout(isScrolling);
              for (let i = 0; i < figures.length; i++) {
                figures[i].style.scale = `0.75`;
              }

              isScrolling = setTimeout(() => {
                for (let i = 0; i < figures.length; i++) {
                  figures[i].style.scale = `1`;
                }
              }, 300);
              let distanceToTranslate =
                section2Open +
                0.9 * home.offsetHeight -
                (section2Open + 0.3 * home.offsetHeight);
              // THIS CODE BELOW IS ABOUT IMAGE SLIDER  SCROLLING TO LEFT EFFECT ! BUT !  WITH  PROBLEMS BECAUSE OF WINDOW.SCROLLY NOT SCROLLING SMOOTHLY AND JUMPING
              //  clearTimeout(timer);
              //               timer =
              //               setTimeout(() => {
              //               centerContentSection2.scrollLeft = `${
              //                 -(windowWidth * coeffSizing.current) * 8 +
              //                 ((window.scrollY +
              //                   distanceToTranslate -
              //                   (section2Open + 0.3 * home.offsetHeight)) /
              //                   distanceToTranslate) *
              //                   (windowWidth * coeffSizing.current) *
              //                   8
              //               } `;
              // centerContentSection2.scrollTop = 0;
              // for (let i = 0; i < figcaptions.length; i++) {
              //   figcaptions[i].style.transform = `translateY(${
              //     (figures[i].getBoundingClientRect().right /
              //       figures[i].getBoundingClientRect().width) *
              //     100
              //   }%)`;
              // }
              // }, 5);

              // THIS CODE BELOW IS ABOUT IMAGE SLIDER  SCROLLING TO LEFT EFFECT ! BUT !  WITH TRANSLATE IN ORDER TO SOLVE JUMPING PROBLEMS

              if (browserName !== 'firefox') {
                // clearTimeout(timer);
                // timer =
                setTimeout(() => {
                  imageSlider.style.transform = `translateX(calc(${
                    -1.25 * window.innerWidth
                  }px - ${
                    -window.innerWidth * 6.95 +
                    ((window.scrollY +
                      distanceToTranslate -
                      (section2Open + 0.3 * home.offsetHeight)) /
                      distanceToTranslate) *
                      window.innerWidth *
                      6.95
                  }px))`;
                  centerContentSection2.scrollTop = 0;
                  for (let i = 0; i < figcaptions.length; i++) {
                    figcaptions[i].style.transform = `translateY(${
                      (figures[i].getBoundingClientRect().right /
                        figures[i].getBoundingClientRect().width) *
                      100
                    }%)`;
                  }
                }, 5);
              } else {
                imageSlider.style.transform = `translateX(calc(${
                  -1.25 * window.innerWidth
                }px - ${
                  -window.innerWidth * 6.95 +
                  ((window.scrollY +
                    distanceToTranslate -
                    (section2Open + 0.3 * home.offsetHeight)) /
                    distanceToTranslate) *
                    window.innerWidth *
                    6.95
                }px))`;
                centerContentSection2.scrollTop = 0;
                for (let i = 0; i < figcaptions.length; i++) {
                  figcaptions[i].style.transform = `translateY(${
                    (figures[i].getBoundingClientRect().right /
                      figures[i].getBoundingClientRect().width) *
                    100
                  }%)`;
                }
              }
              centerContentSection2.style.opacity = '1';
            } else {
              centerContentSection2.style.opacity = '0.05';
              coeffSizing.current = window.innerWidth / homeWidth.current;
              // centerContentSection2.scrollLeft = 8 * window.innerWidth;
              imageSlider.style.transform = `translateX(-${
                8.15 * window.innerWidth
              }px)`;
            }
          } else {
            h3[0].style.top = `0`;
            h3[1].style.bottom = `0`;
          }
        } else {
          section2.style.position = 'absolute';
          section2.style.top = `${
            welcomeH2Position.height * 2.5 + section2Top.current
          }px`;
          section2.style.left = '0';
        }
      }
    }
  };

  return (
    <div className='Home'>
      <header translate='no'>
        <h1 translate='no' style={menuIsItOpenedStyle}>
          <span data-data={'R'}>r</span>
          <span data-data={'E'}>e</span>
          <span data-data={'C'}>c</span>
          <span data-data={'I'}>i</span>
          <span data-data={'P'}>p</span>
          <span data-data={'E'}>e</span>
          <span data-data={'S'}>s</span>
          <span data-data={'S'}>s</span>
          <span data-data={'T'}>t</span>
          <span data-data={'U'}>u</span>
          <span data-data={'D'}>d</span>
          <span data-data={'I'}>i</span>
          <span data-data={'O'}>o</span>
          <span data-data={'S'}>s</span>
        </h1>
        <h2 style={menuIsItOpenedStyle}>
          <span>par the </span>body<span> arch</span>itect
        </h2>
        <h3 style={menuIsItOpenedStyle}>scroll</h3>
        <Nav hideFor3dOpening={hideFor3dOpening} visibility={visibility} />
      </header>
      <main style={menuIsItOpenedStyle}>
        <section style={menuIsItOpenedStyle}>
          <h2 className='welcomeH2'>
            <span className='welcomeSpan' data-welcome='salut !'>
              salut !
            </span>
            <br />
            <span className='welcomeSpan' data-welcome='laisse moi te'>
              laisse moi te
            </span>
            <br />
            <span className='welcomeSpan' data-welcome=' guider pas à pas .'>
              guider pas à pas .
            </span>
          </h2>
          <aside>
            <article>
              <h3 className='welcomeH3'>
                Qu'est-ce- que l'on peut bien faire avec l'application
                "recipes-studios" proposée par the body architect ?
              </h3>
              <p>
                {' '}
                Avec cette apllication, il est question de répondre à un besoin
                fondamental et élementaire qui constitue le socle de tout
                service diététique : LA CONCEPTION DES RECETTES, À PROPORTIONS
                UNIVERSELLES. Avec cette application, tu pourras élaborer des
                recettes en étudiant les aliments en fonction de leurs
                propriétés à l'aide du studio des Aliments. Tu trouveras
                d'amples explications et un exemple détaillé plus bas 'LINK'. Tu
                pourras, ensuite, récupérer cette liste d'ingrédients ou bien en
                constituer une nouvelle selon tes envies, dans le studio des
                recettes 'LINK'. Tu pourras dans ce studio, proportionner les
                aliments les uns avec les autres afin qu'ils
                correspondent/matchent avec un équilibre diététique défini, et
                qui sera réutilisable pour N'IMPORTE QUELLE AUTRE PERSONNE à
                l'aide du programme The Body Architect. Tu trouveras d'amples
                explications et un exemple détaillé plus bas. Pour finir, tu
                pourra te rendre dans le livre des recettes 'LINK', où tu y
                trouveras de manière ON NE PEUT PLUS détaillée, l'emsemble des
                informations pratiques et nutritionelles de tes recettes, comme
                nulle part alleurs !
              </p>
            </article>
            <article>
              <h3 className='welcomeH3'>
                Que peux-tu faire avec le studio des aliments ?
              </h3>
              <p>
                Imaginons, par exemple, qu'une femme diabétique et ayant ses
                menstruations cherche à faire une recette à base de fruits
                contenant le moins de glucose possible tout en concentrant le
                plus de fer à la fois afin de répondre à ses besoins
                nutritionnels qui lui sont propres. Si elle devait se rendre sur
                le web et rechercher des listes d'ingrédients répondant à ses
                trois critères puis les comparer et filtrer manuellement, elle
                pourrait y passer des heures, oui et des heures c'est peu dire !
                Avec le studio des aliments 'LINK', cela prend 1 minute, oui UNE
                minute tout au plus ! vous allez pouvoir filtrer selon vos
                conditions avec plus de 40 filtres, plus de 3600 aliments de
                manière instantanée avant de créer votre liste.
              </p>
            </article>
            <article>
              <h3 className='welcomeH3'>
                Que peux-tu faire avec le studio des recettes ?
              </h3>
              <p>
                Des ingrédients proportionnés à des fins gustatives, comme dans
                tout bon livre de recettes, c'est bien beau... Mais si une seule
                recette, et par conséquent un seul plat devait consituer votre
                repas ou collation, que cette recette soit gustativement bien
                équilibrée, ne veut pas pour autant, voir jamais dire qu'elle
                répondra à vos besoins énergétiques. Avec le studio des
                recettes, ce sera chose aisée et au gramme près. Vous pourrez
                ajouter des ingrédients directement depuis le même studio de
                manière simplifiée, ou bien utiliser la liste importée depuis le
                studio des aliments. Il vous suffira de choisir un équilibre
                allimentaire selon la liste proposée avec toutes les
                caractéristiques propres à chacune détaillées. Il vous suffira,
                pour finir, de modifier de manière pratique la quantité des
                ingrédients de votre liste, jusqu'à ce que l'indicateur de
                chaque macro-nutriment passe au vert. La dernière étape sera de
                renseigner le titre, photo, instructions de préparation et
                autres, avant de valider la création de votre recette à
                proportion universelle. Cette recette, qu'elle que soit la
                personne, pourra répondre à elle seule, selon la quantité
                totale, à 100% de ses besoins énergétiques. Mais rassure toi, tu
                peux tout aussi bien créer une bonne recette à proportion libre,
                comme tu l'as toujours fait !
              </p>
            </article>
            <article>
              <h3 className='welcomeH3'>
                Que peux-tu faire avec le livre de recettes ?
              </h3>{' '}
              <p>
                Parfois, tu peux voir accès à quelques infos nutritionelles sur
                les emballages alimentaires ou bien sur certains livres de
                recettes. Mais t'est-il arrivé de pouvoir demander à un
                programme de ne te montrer que les recettes les plus riches en
                fer, ou bien excluant la viande de porc ou encore suelment des
                recettes à base de fraise ? As tu eu déjà accès à la liste de
                TOUS les minéraux et les vitamines en t'affichant la part que
                réprésente cette recette pour chacun des besoins journaliers
                recommandés pour chacun d'entre eux ? As-tu déjà vérifié si
                l'équilibre de tes recettes des Omégas 6 et omagas 3 est bien
                celui préconnisé selon, autre autres, l'agence nationale de
                sécurité sanitaire de l'alimentation, de l'environnement et du
                travail / ANSES ? As-tu de quoi vérifier la charge et l'index
                glycémique de chacun de tes plats afin de maîtriser l'arrivée
                d'un diabète ? Tout cela et bien plus, sera renseigné pour
                chacune des recette, dans le livre des recettes. Je te rassure,
                tu auras aussi accès aux insructions, étape par étape, aux
                informations du niveau de difficulté, temps de préparation ainsi
                que la valeure économique de tes recettes.
              </p>
            </article>
          </aside>
        </section>
        <section style={menuIsItOpenedStyle}>
          <h3>
            des studios
            <span> de pros</span>
          </h3>
          <article className='centerContentSection2'>
            <h4>
              un coup d'oeil
              <br />
              <span>peut-être ?</span>
            </h4>
            <div className='imageSlider'>
              <figure data-img={`recherche`} className='imgGallery1'>
                <img id='imgGallery1' src={imgAliment1} alt='imgGallery1' />
                <figcaption>aliment studio</figcaption>
              </figure>
              <figure data-img={`réglages`} className='imgGallery2'>
                <img id='imgGallery2' src={imgAliment2} alt='imgGallery2' />
                <figcaption>aliment studio</figcaption>
              </figure>
              <figure data-img={`recherche`} className='imgGallery3'>
                <img id='imgGallery3' src={imgRecettes1} alt='imgGallery3' />
                <figcaption>recipe studio</figcaption>
              </figure>
              <figure
                data-img={`équilibre énergétique`}
                className='imgGallery4'>
                <img id='imgGallery4' src={imgRecettes2} alt='imgGallery4' />
                <figcaption>recipe studio</figcaption>
              </figure>
              <figure data-img={`instructions`} className='imgGallery5'>
                <img id='imgGallery5' src={imgRecettes3} alt='imgGallery5' />
                <figcaption>recipe studio</figcaption>
              </figure>
              <figure data-img={`recherche`} className='imgGallery6'>
                <img
                  id='imgGallery6'
                  src={imgRecettesBook1}
                  alt='imgGallery6'
                />
                <figcaption>recipe book</figcaption>
              </figure>
              <figure data-img={`informations`} className='imgGallery7'>
                <img
                  id='imgGallery7'
                  src={imgRecettesBook2}
                  alt='imgGallery7'
                />
                <figcaption>recipe book</figcaption>
              </figure>
              <figure data-img={`nutrition`} className='imgGallery8'>
                <img
                  id='imgGallery8'
                  src={imgRecettesBook3}
                  alt='imgGallery8'
                />
                <figcaption>recipe book</figcaption>
              </figure>
            </div>
          </article>
          <h3>
            à la portée
            <span> de tous</span>
          </h3>
        </section>
      </main>
      <footer style={menuIsItOpenedStyle}>
        <div className='footerContact'>
          <address>
            <i>
              <FaMapMarkerAlt />
            </i>
            Orléans, FRANCE
          </address>

          <a
            onClick={preventHrefScrollTop}
            onMouseDown={preventHrefScrollTop}
            href='mailto:jytessereau@gmail.com'>
            <i>
              <MdAttachEmail />
            </i>
            jytessereau@gmail.com
          </a>
          <a
            onClick={preventHrefScrollTop}
            onMouseDown={preventHrefScrollTop}
            href='tel:+33662370732'>
            <i>
              <BsFillTelephoneOutboundFill />
            </i>
            +336 62 37 07 32
          </a>
        </div>

        <p className='footerCopyright'>
          &copy; 2022-2023 The Body Architect / J.Y.Tessereau. All rights
          reserved{' '}
        </p>
      </footer>
    </div>
  );
}
