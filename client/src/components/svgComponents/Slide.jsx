import React from 'react';

function Slide() {
  return (
    <svg
      className='slideComponent'
      height='100%'
      viewBox='0 0 1114 1914'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g filter='url(#babybaby)'>
        <path
          d='M1109.77 9.7207V9.7207C732.87 181.898 417.209 471.828 215.836 833.975V833.975L206.788 851.463C38.0731 1177.58 -24.1833 1548.38 28.7736 1911.72V1911.72'
          stroke='#F5FDFF'
          strokeWidth='18'
        />
      </g>
      <defs>
        <filter
          id='babybaby'
          x='0.40625'
          y='0.625'
          width='1113.52'
          height='1916.54'
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
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect1_innerShadow_1446_25'
          />
        </filter>
      </defs>
    </svg>
  );
}

export default Slide;
