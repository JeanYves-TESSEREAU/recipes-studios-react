import React, { Fragment } from 'react';
import anime from 'animejs';

export default function EggRightSvg({ displayEggsSvg }) {
  const initialPath =
    'M13.9227 110.184C22.7687 163.25 72.6431 177.891 104.965 174.25C171.556 166.75 181.467 110.184 171.556 72.2485C164.064 27.3051 126.466 -0.249702 67.4664 16.2517C36.1417 25.0128 6.43079 65.2409 13.9227 110.184Z';
  const secondPath =
    'M15.457 128.433C22.9489 173.377 63.2777 204.1 105.534 197.056C183.403 184.075 231.159 127.01 223.667 82.0665C216.175 37.1232 154.382 9.97781 76.5122 22.9585C34.256 30.0025 7.96506 83.49 15.457 128.433Z';
  const thirdPath =
    'M15.957 128.433C23.4489 173.377 62.2439 241.044 104.5 234C182.37 221.019 231.659 127.01 224.167 82.0665C216.675 37.1232 154.882 9.97781 77.0122 22.9585C34.756 30.0025 8.46506 83.49 15.957 128.433Z';

  const animToAnimate = () => {
    anime({
      targets: '#rightEgg',
      opacity: [{ value: 0 }, { value: 1, duration: 1200, delay: 3000 }],
      scale: [
        { value: 0 },
        { value: 1, duration: 1200, delay: 3000, easing: 'easeInOutCubic' },
      ],

      // rotate: '+=1turn',
    });
    anime({
      targets: '#blueBallEggRight',
      // opacity: [
      //   { value: 0, duration: 500 },
      //   { value: 1, duration: 1000, easing: 'easeInOutCubic' },
      // ],
      scale: [
        { value: 0.8, duration: 400, easing: 'easeInOutCubic', delay: 3000 },
        { value: 1.05, duration: 700, easing: 'easeInQuad' },
        { value: 1, duration: 1700, easing: 'easeInCubic' },
      ],
    });

    anime({
      targets: '.beforeAnimeEggs',
      d: [
        {
          value: initialPath,
          duration: 1800,

          easing: 'easeInCubic',
        },
        {
          value: secondPath,
          duration: 2000,
          delay: 3200,
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
      targets: '#dropShadowBlueBallEggRight',
      dx: [
        { value: 0, duration: 1500, delay: 3000 },
        { value: 13, duration: 1500, easing: 'linear' },
      ],
      dy: [
        { value: 0, duration: 1500, delay: 3000 },
        { value: 15, duration: 1500, easing: 'linear' },
      ],
    });
  };
  const animToAnimateBack = () => {
    anime({
      targets: '#rightEgg',
      opacity: { value: 0 },
      scale: { value: 0 },
    });
  };

  return (
    <Fragment>
      {displayEggsSvg ? animToAnimate() : animToAnimateBack()}{' '}
      <svg
        style={({ opacity: '0' }, { transform: 'scale(0)' })}
        id='rightEgg'
        width='100%'
        height='100%'
        viewBox='0 0 330 330'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g filter='url(#filter0_i)'>
          <path
            className='beforeAnimeEggs'
            d='M13.9227 110.184C22.7687 163.25 72.6431 177.891 104.965 174.25C171.556 166.75 181.467 110.184 171.556 72.2485C164.064 27.3051 126.466 -0.249702 67.4664 16.2517C36.1417 25.0128 6.43079 65.2409 13.9227 110.184Z'
            fill='#F3F9FC'
          />
        </g>

        <g
          id='blueBallEggRight'
          filter='url(#filter2_di)'
          style={{ transform: 'scale(0)' }}>
          <ellipse
            id='path1finalEggRight'
            cx='99.5'
            cy='114.5'
            rx='41.5'
            ry='43.5'
            fill='url(#paint0_radial)'
          />
          <ellipse
            cx='99.5'
            cy='114.5'
            rx='41.5'
            ry='43.5'
            fill='url(#paint1_radial)'
            fillOpacity='0.45'
            // style='mix-blend-mode:lighten'
          />
          <ellipse
            cx='99.5'
            cy='114.5'
            rx='41.5'
            ry='43.5'
            fill='url(#paint2_radial)'
            fillOpacity='0.56'
            // style='mix-blend-mode:multiply'
          />
        </g>
        <defs>
          <filter
            id='filter0_i'
            x='0'
            y='-3.31055'
            width='239.123'
            height='300.121'
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
            id='filter1_iii'
            x='21.9766'
            y='34.0938'
            width='155.633'
            height='160.564'
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
            id='filter2_di'
            x='57'
            y='65'
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
            <feOffset id='dropShadowBlueBallEggRight' dx='13' dy='15' />
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
            id='paint0_radial'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(109.638 89.0423) rotate(129.24) scale(41.5137 41.1694)'>
            <stop offset='0' stopColor='#AEF0FF' />
            <stop offset='1' stopColor='#A6EBFA' />
          </radialGradient>
          <radialGradient
            id='paint1_radial'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(111.838 94.5135) rotate(122.457) scale(36.2263 35.5433)'>
            <stop offset='0' stopColor='white' />
            <stop offset='1' stopColor='white' stopOpacity='0' />
          </radialGradient>
          <radialGradient
            id='paint2_radial'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(113.39 84.1848) rotate(116.908) scale(82.7773 80.7399)'>
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
