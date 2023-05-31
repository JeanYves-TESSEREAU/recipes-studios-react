// let pointPercentage =
//   currentScrollY / (clientHeightOfElement / 11) - currentLi;
// let pathPosition = path.getBoundingClientRect();
// const pointOnPath = Math.round(pointPercentage * pathTotalLength);
// const pathPoint = path.getPointAtLength(pointOnPath);
// const pathPoint0 = path.getPointAtLength(0);
// const ytranslate = Math.round(pathPoint.y - pathPoint0.y);
// const xtranslate = Math.round(pathPoint0.x - pathPoint.x);

// HERE IS FOR NORMAL SCREEN SCROLL
// HERE IS FOR NORMAL SCREEN SCROLL

// else {
//   if (currentScrollY < numberOfPixelsForEachStep) {
//     setCurrentLi(0);
//     setTimeout(() => {
//       setPrevLi(0);
//     }, 150);
//   } else if (
//     currentScrollY > numberOfPixelsForEachStep &&
//     currentScrollY < 2 * numberOfPixelsForEachStep
//   ) {
//     setIngredientListNumber(
//       Math.round(
//         (currentScrollY / numberOfPixelsForEachStep - 1) *
//           (arrayList.length - 1)
//       )
//     );

//     setCurrentLi(1);

//     setTimeout(() => {
//       setPrevLi(1);
//     }, 150);

//     if (ingredientListNumber !== previngredientListNumber) {
//       setTimeout(() => {
//         setPrevingredientListNumber(ingredientListNumber);
//       }, 50);
//     }
//   } else if (
//     currentScrollY > 2 * numberOfPixelsForEachStep &&
//     currentScrollY < 3 * numberOfPixelsForEachStep
//   ) {
//     setCurrentLi(2);

//     setTimeout(() => {
//       setPrevLi(2);
//     }, 150);
//   } else if (
//     currentScrollY > 3 * numberOfPixelsForEachStep &&
//     currentScrollY < 4 * numberOfPixelsForEachStep
//   ) {
//     setInstructionListNumber(
//       Math.round(
//         (currentScrollY / numberOfPixelsForEachStep - 3) *
//           (recipeId.recipeId.recipeInstructions.length - 1)
//       )
//     );

//     setCurrentLi(3);

//     setTimeout(() => {
//       setPrevLi(3);
//     }, 150);
//     if (prevLi === 4 && animMAcroIsplaying === false) {
//       setTimeout(() => {
//         div.style.transform = `translate(

//          0px,
//          0px
//             )`;
//       }, 200);

//       setAnimMacroIsPlaying(!animMAcroIsplaying);
//     }

//     if (instructionListNumber !== previnstructionListNumber) {
//       setTimeout(() => {
//         setPrevinstructionListNumber(instructionListNumber);
//       }, 50);
//     }
//   } else if (
//     currentScrollY > 4 * numberOfPixelsForEachStep &&
//     currentScrollY < 5 * numberOfPixelsForEachStep
//   ) {
//     const pathPointInitial = path.getPointAtLength(
//       pointPercentage * pathTotalLength + 0.3 * pathTotalLength
//     );
//     if (!animMAcroIsplaying) {
//       div.style.transform = `translate(

//         calc(${pathPointInitial.x}px - 50%),
//         ${pathPointInitial.y}px
//           )`;
//     }

//     setTimeout(() => {
//       if (animMAcroIsplaying) {
//         setAnimMacroIsPlaying(!animMAcroIsplaying);
//         div.style.transform = `translate(

//           calc(${pathPointInitial.x}px - 50%),
//           ${pathPointInitial.y}px
//             )`;
//       }
//     }, 2000);
//     setCurrentLi(4);
//     setTimeout(() => {
//       setPrevLi(4);
//     }, 120);
//   } else if (
//     currentScrollY > 5 * numberOfPixelsForEachStep &&
//     currentScrollY < 6 * numberOfPixelsForEachStep
//   ) {
//     if (prevLi === 4 && animMAcroIsplaying === false) {
//       setAnimMacroIsPlaying(!animMAcroIsplaying);
//       console.log(animMAcroIsplaying);
//     }
//     setCurrentLi(5);

//     setTimeout(() => {
//       setPrevLi(5);
//     }, 150);
//   } else if (
//     currentScrollY > 6 * numberOfPixelsForEachStep &&
//     currentScrollY < 7 * numberOfPixelsForEachStep
//   ) {
//     setCurrentLi(6);
//     setTimeout(() => {
//       setPrevLi(6);
//     }, 120);
//   } else if (
//     currentScrollY > 7 * numberOfPixelsForEachStep &&
//     currentScrollY < 8 * numberOfPixelsForEachStep
//   ) {
//     setCurrentLi(7);
//     setTimeout(() => {
//       setPrevLi(7);
//     }, 120);
//   } else if (
//     currentScrollY > 8 * numberOfPixelsForEachStep &&
//     currentScrollY < 9 * numberOfPixelsForEachStep
//   ) {
//     setCurrentLi(8);
//     setTimeout(() => {
//       setPrevLi(8);
//     }, 120);
//   } else if (
//     currentScrollY > 9 * numberOfPixelsForEachStep &&
//     currentScrollY < 10 * numberOfPixelsForEachStep
//   ) {
//     setCurrentLi(9);
//     setTimeout(() => {
//       setPrevLi(9);
//     }, 120);
//   } else if (
//     currentScrollY > 10 * numberOfPixelsForEachStep &&
//     currentScrollY < 11 * numberOfPixelsForEachStep
//   ) {
//     setCurrentLi(10);
//     setTimeout(() => {
//       setPrevLi(10);
//     }, 120);
//   } else if (
//     currentScrollY > 11 * numberOfPixelsForEachStep &&
//     currentScrollY < 12 * numberOfPixelsForEachStep
//   ) {
//     setCurrentLi(11);
//     setTimeout(() => {
//       setPrevLi(11);
//     }, 120);
//   }
// }

//  <defs>
/* <filter
id='filter0_i_1446_25'
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
  values={`0 0 0 0 0 0 0 0 0  0 0 0 0 0 0 0 0 ${
    27 * backGroundHeight.current
  } 0`}
  result='hardAlpha'
/>
<feOffset dy={2.5 * backGroundHeight.current} />
<feGaussianBlur stdDeviation='1.1' />
<feComposite
  in2='hardAlpha'
  operator='arithmetic'
  k2='-1'
  k3='1'
/>
<feColorMatrix
  type='matrix'
  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0'
/>
<feBlend
  mode='normal'
  in2='shape'
  result='effect1_innerShadow_1446_25'
/>
</filter>
</defs> */

// const easeOut = (progress) => Math.pow(--progress, 5) + 1;

// const getProgress = ({ elapsed, total }) => Math.min(elapsed / total, 1);
