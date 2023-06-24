import React, { Fragment } from 'react';
import anime from 'animejs';

export default function EggLeftSvg({ displayEggsSvg }) {
  const initialPath =
    'M217 110.5C189.5 191 111.5 181.578 94 179.5C37.057 172.739 -13.4389 142.226 4.50095 72.9997C15.9311 28.8932 58.4383 -14.6961 135.576 5.29398C177.434 16.1416 229.5 39.5 217 110.5Z';
  const thirdPath =
    'M229.671 132.798C218.241 176.905 176.383 210.458 133.443 205.36C45.9589 194.973 -2.3681 187.019 15.5718 117.793C27.0019 73.6863 97.438 13.3048 174.575 33.2949C216.434 44.1425 241.101 88.6916 229.671 132.798Z';
  const secondPath =
    'M217.671 103.798C206.241 147.905 217.671 244 121.443 176.36C49.3685 125.698 -14.3681 158.019 3.57177 88.7928C15.0019 44.6863 85.438 -15.6952 162.575 4.29487C204.434 15.1425 229.101 59.6916 217.671 103.798Z';
  const animToAnimate = () => {
    anime({
      targets: '#leftEgg',
      opacity: [{ value: 0 }, { value: 1, duration: 1200, delay: 500 }],
      scale: [
        { value: 0 },
        { value: 1, duration: 1200, delay: 500, easing: 'easeInOutCubic' },
      ],

      //   rotate: '+=1turn',
    });
    anime({
      targets: '#blueBallEggLeft',
      // opacity: [
      //   { value: 0, duration: 500 },
      //   { value: 1, duration: 1000, easing: 'easeInOutCubic' },
      // ],
      scale: [
        { value: 0.8, duration: 400, easing: 'easeInOutCubic', delay: 500 },
        { value: 1.05, duration: 700, easing: 'easeInQuad' },
        { value: 1, duration: 1700, easing: 'easeInCubic' },
      ],
    });

    anime({
      targets: '.beforeAnimeEggsLeft',
      d: [
        {
          value: initialPath,
          duration: 2000,

          easing: 'easeInCubic',
        },
        {
          value: secondPath,
          duration: 2000,
          delay: 100,
          easing: 'easeInCubic',
        },
        {
          value: thirdPath,
          duration: 2000,

          easing: 'easeInCubic',
        },
      ],
      loop: true,
    });
    anime({
      targets: '#dropShadowBlueBallEggLeft',
      dx: [
        { value: 0, duration: 1500, delay: 500 },
        { value: 13, duration: 1500, easing: 'linear' },
      ],
      dy: [
        { value: 0, duration: 1500, delay: 500 },
        { value: 15, duration: 1500, easing: 'linear' },
      ],
    });
  };
  const animToAnimateBack = () => {
    anime({
      targets: '#leftEgg',
      opacity: { value: 0 },
      scale: { value: 0 },
    });
  };

  return (
    <Fragment>
      {displayEggsSvg ? animToAnimate() : animToAnimateBack()}{' '}
      <svg
        id='leftEgg'
        style={({ opacity: '0' }, { transform: 'scale(0)' })}
        width='100%'
        height='100%'
        viewBox='0 0 251 231'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g filter='url(#filter0_i1)'>
          <path
            className='beforeAnimeEggsLeft'
            d='M217 110.5C189.5 191 111.5 181.578 94 179.5C37.057 172.739 -13.4389 142.226 4.50095 72.9997C15.9311 28.8932 58.4383 -14.6961 135.576 5.29398C177.434 16.1416 229.5 39.5 217 110.5Z'
            fill='#F3F9FC'
          />
        </g>

        <g id='blueBallEggLeft' filter='url(#filter2_di1)'>
          <ellipse
            cx='146.629'
            cy='104.213'
            rx='41.5'
            ry='43.5'
            fill='url(#paint0_radial1)'
          />
          <ellipse
            cx='146.629'
            cy='104.213'
            rx='41.5'
            ry='43.5'
            fill='url(#paint1_radial1)'
            fillOpacity='0.45'
            style={{ mixBlendMode: 'lighten' }}
          />
          <ellipse
            cx='146.629'
            cy='104.213'
            rx='41.5'
            ry='43.5'
            fill='url(#paint2_radial1)'
            fillOpacity='0.56'
            style={{ mixBlendMode: 'multiply' }}
          />
        </g>
        <defs>
          <filter
            id='filter0_i1'
            x='0'
            y='-4'
            width='250.367'
            height='234.82'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='-4' />
            <feGaussianBlur stdDeviation='3.5' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
            />
            <feBlend mode='normal' in2='shape' result='effect1_innerShadow' />
          </filter>
          <filter
            id='filter1_iii1'
            x='78.1289'
            y='36.7129'
            width='137'
            height='143'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dx='-10' dy='-10' />
            <feGaussianBlur stdDeviation='15' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'
            />
            <feBlend mode='normal' in2='shape' result='effect1_innerShadow' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dx='10' dy='10' />
            <feGaussianBlur stdDeviation='15' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.682353 0 0 0 0 0.682353 0 0 0 0 0.752941 0 0 0 0.4 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_innerShadow'
              result='effect2_innerShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='14.5' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0'
            />
            <feBlend
              mode='normal'
              in2='effect2_innerShadow'
              result='effect3_innerShadow'
            />
          </filter>
          <filter
            id='filter2_di1'
            x='104.129'
            y='54.7129'
            width='111'
            height='122'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='2'
              operator='erode'
              in='SourceAlpha'
              result='effect1_dropShadow'
            />
            <feOffset dx='13' dy='15' />
            <feGaussianBlur stdDeviation='8' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dx='4' dy='-6' />
            <feGaussianBlur stdDeviation='16' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
            />
            <feBlend mode='normal' in2='shape' result='effect2_innerShadow' />
          </filter>
          <radialGradient
            id='paint0_radial1'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(156.767 78.7552) rotate(129.24) scale(41.5137 41.1694)'>
            <stop offset='0' stopColor='#AEF0FF' />
            <stop offset='1' stopColor='#A6EBFA' />
          </radialGradient>
          <radialGradient
            id='paint1_radial1'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(158.967 84.2264) rotate(122.457) scale(36.2263 35.5433)'>
            <stop offset='0' stopColor='white' />
            <stop offset='1' stopColor='white' stopOpacity='0' />
          </radialGradient>
          <radialGradient
            id='paint2_radial1'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(160.519 73.8977) rotate(116.908) scale(82.7773 80.7399)'>
            <stop
              offset='0.0520833'
              stopColor='#91D9E3'
              stopOpacity='0.0371975'
            />
            <stop offset='0.177083' stopColor='#6DC7DB' stopOpacity='0.03' />
            <stop offset='0.760417' stopColor='#549DA7' stopOpacity='0.81' />
          </radialGradient>
        </defs>
      </svg>
    </Fragment>
  );
}
