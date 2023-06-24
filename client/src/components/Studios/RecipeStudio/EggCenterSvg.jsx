import React, { Fragment } from 'react';
import anime from 'animejs';

export default function EggCenterSvg({ displayEggsSvg }) {
  const initialPath =
    'M96.0256 188.473C138.001 185.5 173.389 151 177.728 110.762C182.5 66.4988 159.002 -7.50088 76.5008 0.998529C31.4998 10.9981 -3.49887 51.9995 0.501902 102C4.05242 146.374 52.3667 186.914 96.0256 188.473Z';
  const secondPath =
    'M100.021 220.473C143.68 222.032 171.845 186.129 181.723 142.762C194.994 84.4902 114.499 -22.5005 66.4977 5.00002C11.9993 51.9984 61.972 41.1526 16.9988 99.9984C-36.5003 170 56.3618 218.914 100.021 220.473Z';
  const thirdPath =
    'M98.023 222.474C141.682 224.032 169.848 188.13 179.725 144.763C192.997 86.4911 143.5 -7.49909 60.9994 1.00032C-9.50102 16.5005 18.5 89.5 2.4993 136.001C-11.9688 178.048 54.3641 220.915 98.023 222.474Z';
  const animToAnimate = () => {
    anime({
      targets: '#centerEgg',
      opacity: [{ value: 0 }, { value: 1, duration: 1200, delay: 2000 }],
      scale: [
        { value: 0 },
        { value: 1, duration: 1200, delay: 2000, easing: 'easeInOutCubic' },
      ],

      // rotate: '+=1turn',
    });
    anime({
      targets: '#blueBallEggCenter',

      scale: [
        { value: 0.8, duration: 400, easing: 'easeInOutCubic', delay: 2000 },
        { value: 1.05, duration: 700, easing: 'easeInQuad' },
        { value: 1, duration: 1700, easing: 'easeInCubic' },
      ],
    });

    anime({
      targets: '.beforeAnimeEggsCenter',

      d: [
        {
          value: initialPath,
          duration: 1800,

          easing: 'easeInCubic',
        },
        {
          value: secondPath,
          duration: 2000,
          easing: 'easeInCubic',
        },
        {
          value: thirdPath,
          duration: 2200,
          easing: 'easeInCubic',
        },
      ],
      loop: true,
    });
    anime({
      targets: '#dropShadowBlueBallEggRight',
      dx: [
        { value: 0, duration: 1500, delay: 2000 },
        { value: 13, duration: 1500, easing: 'linear' },
      ],
      dy: [
        { value: 0, duration: 1500, delay: 2000 },
        { value: 15, duration: 1500, easing: 'linear' },
      ],
    });
  };
  const animToAnimateBack = () => {
    anime({
      targets: '#centerEgg',
      opacity: { value: 0 },
      scale: { value: 0 },
    });
  };

  return (
    <Fragment>
      {displayEggsSvg ? animToAnimate() : animToAnimateBack()}
      <svg
        id='centerEgg'
        style={({ opacity: '0' }, { transform: 'scale(0)' })}
        width='100%'
        height='100%'
        viewBox='0 0 182 223'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g filter='url(#filter0_i0)'>
          <path
            className='beforeAnimeEggsCenter'
            d='M96.0256 188.473C138.001 185.5 173.389 151 177.728 110.762C182.5 66.4988 159.002 -7.50088 76.5008 0.998529C31.4998 10.9981 -3.49887 51.9995 0.501902 102C4.05242 146.374 52.3667 186.914 96.0256 188.473Z'
            fill='#F3F9FC'
          />
        </g>

        <g id='blueBallEggCenter' filter='url(#filter2_di0)'>
          <ellipse
            cx='95.5'
            cy='135.5'
            rx='41.5'
            ry='43.5'
            fill='url(#paint0_radial0)'
          />
          <ellipse
            cx='95.5'
            cy='135.5'
            rx='41.5'
            ry='43.5'
            fill='url(#paint1_radial0)'
            fillOpacity='0.45'
            // style='mix-blend-mode:lighten'
          />
          <ellipse
            cx='95.5'
            cy='135.5'
            rx='41.5'
            ry='43.5'
            fill='url(#paint2_radial0)'
            fillOpacity='0.56'
            // style='mix-blend-mode:multiply'
          />
        </g>
        <defs>
          <filter
            id='filter0_i0'
            x='0.474609'
            y='-3.53906'
            width='300.391'
            height='226.062'
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
            id='filter1_iii0'
            x='26.4551'
            y='64.793'
            width='138.482'
            height='140.695'
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
            id='filter2_di0'
            x='53'
            y='86'
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
            id='paint0_radial0'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(105.638 110.042) rotate(129.24) scale(41.5137 41.1694)'>
            <stop offset='0' stopColor='#AEF0FF' />
            <stop offset='1' stopColor='#A6EBFA' />
          </radialGradient>
          <radialGradient
            id='paint1_radial0'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(107.838 115.514) rotate(122.457) scale(36.2263 35.5433)'>
            <stop offset='0' stopColor='white' />
            <stop offset='1' stopColor='white' stopOpacity='0' />
          </radialGradient>
          <radialGradient
            id='paint2_radial0'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(109.39 105.185) rotate(116.908) scale(82.7773 80.7399)'>
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
