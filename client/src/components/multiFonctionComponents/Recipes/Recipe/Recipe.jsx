/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import './recipe.css';
import { getRecipeByID } from '../../../../redux/actions/recipes';
import svgHat from '../../../../assets/img/dish-cap.svg';
import svgMoney from '../../../../assets/img/euro-money-bag.svg';
import svgSandTime from '../../../../assets/img/sandTime.svg';
import svgOneStar from '../../../../assets/img/oneStar.svg';
import svgTwoStars from '../../../../assets/img/twoStars.svg';
import svgThreeStars from '../../../../assets/img/threeStars.svg';
import svgOneEuro from '../../../../assets/img/oneEuro.svg';
import svgTwoEuros from '../../../../assets/img/twoEuros.svg';
import svgThreeEuros from '../../../../assets/img/threeEuros.svg';
import svgHeat from '../../../../assets/img/heatingTime.svg';
import Fish from '../../../svgComponents/Allergen/Fish';
import Peanuts from '../../../svgComponents/Allergen/Peanuts';
import Milk from '../../../svgComponents/Allergen/Milk';
import Nuts from '../../../svgComponents/Allergen/Nuts';
import Molluscs from '../../../svgComponents/Allergen/Molluscs';
import Mustard from '../../../svgComponents/Allergen/Mustard';
import Gluten from '../../../svgComponents/Allergen/Gluten';
import Crustaceans from '../../../svgComponents/Allergen/Crustaceans';
import Eggs from '../../../svgComponents/Allergen/Eggs';
import Soy from '../../../svgComponents/Allergen/Soy';
import Sulfites from '../../../svgComponents/Allergen/Sulfites';
import Sesame from '../../../svgComponents/Allergen/Sesame';
import Celery from '../../../svgComponents/Allergen/Celery';
import Lupin from '../../../svgComponents/Allergen/Lupin';
import {
  ProgressEllipseGlucides,
  ProgressEllipseProteines,
  ProgressEllipseLipides,
  ProgressEllipseBetaCarotene,
  ProgressEllipseRetinol,
  ProgressEllipseVitamineD,
  ProgressEllipseVitamineE,
  ProgressEllipseVitamineK1,
  ProgressEllipseVitamineK2,
  ProgressEllipseVitamineC,
  ProgressEllipseVitamineB1,
  ProgressEllipseVitamineB2,
  ProgressEllipseVitamineB3Pp,
  ProgressEllipseVitamineB5,
  ProgressEllipseVitamineB6,
  ProgressEllipseVitamineB9,
  ProgressEllipseVitamineB12,
  ProgressEllipseSelChlorureDeSodium,
  ProgressEllipseCalcium,
  ProgressEllipseChlorure,
  ProgressEllipseCuivre,
  ProgressEllipseFer,
  ProgressEllipseIode,
} from '../../../svgComponents/ProgressEllipse';
import { Adult2000Kcal } from '../../../../assets/fonctions/nutrimentsNeeds';
import { alertPopup } from '../../../../assets/fonctions/alertPopup.js';

import Slide from '../../../svgComponents/Slide';

const Recipe = ({ recipeActived, recipeId, getRecipeByID }) => {
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                     __________________________ */
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                       __________________________ */
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                       __________________________ */

  const scrollY = useRef(0);
  const [nutritionalProfil, setNutritionalProfil] = useState(Adult2000Kcal);
  const [scrollForAnim, setScrollForAnim] = useState(true);
  const backGroundWidth = useRef(0);
  const backGroundHeight = useRef(1);
  const [isItScrollingDown, setIsItScrollingDown] = useState(false);
  const [currentLi, setCurrentLi] = useState(0);
  const [prevLi, setPrevLi] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [portion, setPortion] = useState(100);
  const [arrayList, setArrayList] = useState([]);
  const [ingredientListNumber, setIngredientListNumber] = useState(0);
  const [previngredientListNumber, setPrevingredientListNumber] = useState(0);
  const [instructionListNumber, setInstructionListNumber] = useState(0);
  const [previnstructionListNumber, setPrevinstructionListNumber] = useState(0);
  const [stepVitamine, setStepVitamine] = useState(1);
  const [numberOfAllergens, setNumberOfAllergens] = useState(0);
  const [time, setTime] = useState(0);
  const [lag, setLag] = useState(0);
  const [lag2, setLag2] = useState(0);
  const [transformRotate, setTransformRotate] = useState('0deg');

  useEffect(() => {
    getRecipeByID(recipeActived);

    if (time === 3) {
      newArrayIngredientList();
      changenumberOfAllergens();
    }

    let roundMenu = document.querySelector('.roundMenu');
    let backGround = document.querySelector('.backGroundOfRecipe ');
    const displayIntro = () => {
      let nav = document.querySelector(' .backGroundOfRecipe nav');
      let intro = document.querySelector('#intro');
      if (currentLi === 0) {
        nav.style.display = 'block';
        intro.style.display = 'grid';
      }
    };
    const displayIntro2 = () => {
      let roundMenu = document.querySelector('.roundMenu');
      roundMenu.style.display = 'block';
    };

    roundMenu.addEventListener('animationend', displayIntro);
    backGround.addEventListener('animationend', displayIntro2);

    ratioMedia();
    fast();

    nutriments();
  }, [recipeActived, time, currentLi, transformRotate]);

  // RESIZE LISTENER
  useEffect(() => {
    let roundMenu = document.querySelector('.roundMenu');
    const resizeListener = () => {
      roundMenu.style.animation = 'none';
      if (window.matchMedia('(max-aspect-ratio: 5/10)').matches) {
        setTransformRotate('10deg');
      } else if (window.matchMedia('(max-aspect-ratio: 10/12)').matches) {
        console.log('10/12');
      } else if (window.matchMedia('(min-aspect-ratio: 10/5)').matches) {
        setTransformRotate('-22deg');
      } else {
        setTransformRotate('0deg');
      }
    };
    window.addEventListener('resize', resizeListener);
  }, [transformRotate]);

  useEffect(() => {
    if (!isItScrollingDown && currentLi === 0)
      setTimeout(() => {
        setIngredientListNumber(0);
        setInstructionListNumber(0);
        setPrevingredientListNumber(0);
        setPrevinstructionListNumber(0);
        switchOnAnim();
        setCurrentLi(0);
        setPrevLi(0);
        setStepVitamine(1);
      }, 50);
  }, [
    currentLi,
    prevScrollY,
    prevLi,
    scrollY,
    isItScrollingDown,
    stepVitamine,
  ]);

  useEffect(() => {
    if (lag2 !== 0 && !scrollForAnim) {
      setScrollForAnim(!scrollForAnim);
    }
    if (lag !== 0 && scrollForAnim) {
      setScrollForAnim(!scrollForAnim);
    }
  }, [scrollForAnim, lag, lag2]);

  // "FAST" IS THE SOLUTION FOUND ABOUT RENDERING PROBLEM
  const fast = () => {
    setTimeout(() => {
      if (time < 3) {
        setTime(time + 1);
      }
    }, 300);
  };

  const switchOffAnim = () => {
    setLag(lag + 1);
    setTimeout(() => {
      setLag(0);
    }, 50);
  };
  const switchOnAnim = () => {
    setLag2(lag2 + 1);
    setTimeout(() => {
      setLag2(0);
    }, 50);
  };

  // "newArrayIngredientList" IS THE ARRAY NEEDED TO CREATE NEW LISTS OF INGREDIENT  WITH  A MAXIMUM OF 8 ONES PER SLIDE

  const newArrayIngredientList = () => {
    let firstList = [];
    let secondList = [];
    let thirdList = [];
    let totalList = [];

    recipeId.recipeId.recipeIngredients.filter((aa, i) => {
      if (i < 8) {
        firstList = [...firstList, aa];
        totalList = [firstList];
      }
    });

    recipeId.recipeId.recipeIngredients.filter((aa, i) => {
      if (i > 7 && i < 16) {
        secondList = [...secondList, aa];
        totalList = [firstList, secondList];
      }
    });
    recipeId.recipeId.recipeIngredients.filter((aa, i) => {
      if (i > 15) {
        thirdList = [...thirdList, aa];
        totalList = [firstList, secondList, thirdList];
      }
    });

    setArrayList(totalList);
  };

  const changenumberOfAllergens = () => {
    let newValue = 0;

    Object.values(recipeId.recipeId).map((aa, i) => {
      if (aa === true) {
        newValue = newValue + 1;
      }

      setNumberOfAllergens(newValue);
    });
  };

  const ArrayForNav = [
    'Intro',
    'Ingredients',
    'Allergènes',
    'Instructions',
    'Macro-Nutriments',
    'Vitamines',
    'Minéreaux',
    'Lipides',
    'Glucides',
    'Divers',
    'Indices',
  ];
  let coefForRecipe = portion / recipeId.recipeId.totalGrammes;

  let totalRetinolµg = useRef(0);
  let betaCaroteneµg = useRef(0);
  let vitamineDµg = useRef(0);
  let vitamineK1µg = useRef(0);
  let vitamineEmg = useRef(0);
  let vitamineK2µg = useRef(0);
  let vitamineCmg = useRef(0);
  let vitamineB1ThiamineMg = useRef(0);
  let vitamineB2RiboflavineMg = useRef(0);
  let vitamineB3PpNiacineMg = useRef(0);
  let vitamineB5AcidePantotheniqueMg = useRef(0);
  let vitamineB6Mg = useRef(0);
  let vitamineB9FolatesTotauxµg = useRef(0);
  let vitamineB12µg = useRef(0);
  let selChlorureDeSodiumG = useRef(0);
  let calciumMg = useRef(0);
  let chlorureMg = useRef(0);
  let cuivreMg = useRef(0);
  let ferMg = useRef(0);
  let iodeµg = useRef(0);

  const nutriments = () => {
    let retinol = 0;
    let betaCarotene = 0;
    let vitamineD = 0;
    let vitamineE = 0;
    let vitamineK1 = 0;
    let vitamineK2 = 0;
    let vitamineC = 0;
    let vitamineB1 = 0;
    let vitamineB2 = 0;
    let vitamineB5 = 0;
    let vitamineB6 = 0;
    let vitamineB9 = 0;
    let vitamineB12 = 0;
    let selChlorureDeSodium = 0;
    let calcium = 0;
    let chlorure = 0;
    let cuivre = 0;
    let fer = 0;
    let iode = 0;

    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.retinolµg)) {
        i.retinolµg = 0;
      }
      retinol = retinol + i.retinolµg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.betaCaroteneµg)) {
        i.betaCaroteneµg = 0;
      }
      betaCarotene = betaCarotene + i.betaCaroteneµg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.vitamineDµg)) {
        i.vitamineDµg = 0;
      }
      vitamineD = vitamineD + i.vitamineDµg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.vitamineEmg)) {
        i.vitamineEmg = 0;
      }
      vitamineE = vitamineE + i.vitamineEmg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.vitamineK1µg)) {
        i.vitamineK1µg = 0;
      }
      vitamineK1 = vitamineK1 + i.vitamineK1µg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.vitamineK2µg)) {
        i.vitamineK2µg = 0;
      }
      vitamineK2 = vitamineK2 + i.vitamineK2µg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.vitamineCmg)) {
        i.vitamineCmg = 0;
      }
      vitamineC = vitamineC + i.vitamineCmg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.vitamineB1ThiamineMg)) {
        i.vitamineB1ThiamineMg = 0;
      }
      vitamineB1 = vitamineB1 + i.vitamineB1ThiamineMg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.vitamineB1ThiamineMg)) {
        i.vitamineB1ThiamineMg = 0;
      }
      vitamineB2 = vitamineB2 + i.vitamineB1ThiamineMg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.vitamineB5AcidePantotheniqueMg)) {
        i.vitamineB5AcidePantotheniqueMg = 0;
      }
      vitamineB5 = vitamineB5 + i.vitamineB5AcidePantotheniqueMg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.vitamineB6Mg)) {
        i.vitamineB6Mg = 0;
      }
      vitamineB6 = vitamineB6 + i.vitamineB6Mg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.vitamineB9FolatesTotauxµg)) {
        i.vitamineB9FolatesTotauxµg = 0;
      }
      vitamineB9 = vitamineB9 + i.vitamineB9FolatesTotauxµg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.vitamineB12µg)) {
        i.vitamineB12µg = 0;
      }
      vitamineB12 = vitamineB12 + i.vitamineB12µg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.selChlorureDeSodiumG)) {
        i.selChlorureDeSodiumG = 0;
      }
      selChlorureDeSodium = selChlorureDeSodium + i.selChlorureDeSodiumG;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.calciumMg)) {
        i.calciumMg = 0;
      }
      calcium = calcium + i.calciumMg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.chlorureMg)) {
        i.chlorureMg = 0;
      }
      chlorure = chlorure + i.chlorureMg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.chlorureMg)) {
        i.chlorureMg = 0;
      }
      cuivre = cuivre + i.cuivreMg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.ferMg)) {
        i.ferMg = 0;
      }
      fer = fer + i.ferMg;
    }
    for (let i of recipeId.recipeId.recipeIngredients) {
      if (isNaN(i.iodeµg)) {
        i.iodeµg = 0;
      }
      iode = iode + i.iodeµg;
    }

    totalRetinolµg.current = retinol;
    betaCaroteneµg.current = betaCarotene;
    vitamineDµg.current = vitamineD;
    vitamineEmg.current = vitamineE;
    vitamineK1µg.current = vitamineK1;
    vitamineK2µg.current = vitamineK2;
    vitamineCmg.current = vitamineC;
    vitamineB1ThiamineMg.current = vitamineB1;
    vitamineB2RiboflavineMg.current = vitamineB2;
    vitamineB5AcidePantotheniqueMg.current = vitamineB5;
    vitamineB6Mg.current = vitamineB6;
    vitamineB9FolatesTotauxµg.current = vitamineB9;
    vitamineB12µg.current = vitamineB12;
    selChlorureDeSodiumG.current = selChlorureDeSodium;
    calciumMg.current = calcium;
    chlorureMg.current = chlorure;
    cuivreMg.current = cuivre;
    ferMg.current = fer;
    iodeµg.current = iode;
  };

  const ratioMedia = () => {
    if (window.matchMedia('(max-aspect-ratio: 5/10)').matches) {
      setTransformRotate('10deg');
    } else if (window.matchMedia('(max-aspect-ratio: 10/12)').matches) {
      setTransformRotate('0deg');
    } else if (window.matchMedia('(min-aspect-ratio: 10/5)').matches) {
      setTransformRotate('-22deg');
    } else {
      setTransformRotate('0deg');
    }
  };

  // eslint-disable-next-line no-unused-vars
  let path = `path('m ${1109.77 * backGroundHeight.current}${
    9.7207 * backGroundHeight.current
  } v 0 c -${376.9 * backGroundHeight.current} ${
    172.1773 * backGroundHeight.current
  } -${692.561 * backGroundHeight.current} ${
    462.1073 * backGroundHeight.current
  } -${893.934 * backGroundHeight.current} ${
    824.2543 * backGroundHeight.current
  } v 0 l -${9.048 * backGroundHeight.current} ${
    17.488 * backGroundHeight.current
  } c -${168.7149 * backGroundHeight.current} ${
    326.117 * backGroundHeight.current
  } -${230.9713 * backGroundHeight.current} ${
    696.917 * backGroundHeight.current
  } -${178.0144 * backGroundHeight.current} ${
    1060.257 * backGroundHeight.current
  } v 0')`;

  // HERE IS THE MOST IMPORTANT FONCTION ON SCROLL !!!! HERE IS THE MOST IMPORTANT FONCTION ON SCROLL !!!! HERE IS THE MOST IMPORTANT FONCTION ON SCROLL !!!! HERE IS THE MOST IMPORTANT FONCTION ON SCROLL !!!!
  // HERE IS THE MOST IMPORTANT FONCTION ON SCROLL !!!! HERE IS THE MOST IMPORTANT FONCTION ON SCROLL !!!! HERE IS THE MOST IMPORTANT FONCTION ON SCROLL !!!! HERE IS THE MOST IMPORTANT FONCTION ON SCROLL !!!!

  const onScroll = (e) => {
    let elementForclientHeight = document.getElementById('sect1');
    let backgroundRatio = document.getElementById('svgSlide');
    let clientHeightOfElement = elementForclientHeight.clientHeight;
    let clientHeightOfBackgroundRatio = backgroundRatio.clientHeight;
    let clientWidthOfBackgroundRatio = backgroundRatio.clienWidth;
    let numberOfPixelsForEachStep = clientHeightOfElement / ArrayForNav.length;

    let currentScrollY = e.target.scrollTop;
    scrollY.current = currentScrollY;
    const coefHeight = clientHeightOfBackgroundRatio / 1914;
    backGroundHeight.current = coefHeight;
    backGroundWidth.current = clientWidthOfBackgroundRatio;
    const path = document.querySelector('#slidePath');
    const pathTotalLength = path.getTotalLength();

    let glucides = document.querySelector('.glucidesInfos');
    let glucideEllipse = document.querySelector(
      '.glucidesInfos .ellipseProgressGlucides'
    );
    let proteines = document.querySelector('.proteinesInfos');
    let proteinesEllipse = document.querySelector(
      '.proteinesInfos .ellipseProgressProteines'
    );

    let lipides = document.querySelector('.lipidesInfos');
    let lipidesEllipse = document.querySelector(
      '.lipidesInfos .ellipseProgressLipides'
    );
    let retinol = document.querySelector('.retinolInfos');
    let retinolEllipse = document.querySelector(
      '.retinolInfos .ellipseProgressRetinol'
    );
    let betaCarotene = document.querySelector('.betaCaroteneInfos');
    let betaCaroteneEllipse = document.querySelector(
      '.betaCaroteneInfos .ellipseProgressBetaCarotene'
    );
    let vitamineD = document.querySelector('.vitamineDInfos');
    let vitamineDEllipse = document.querySelector(
      '.vitamineDInfos .ellipseProgressVitamineD'
    );
    let vitamineE = document.querySelector('.vitamineEInfos');
    let vitamineEEllipse = document.querySelector(
      '.vitamineEInfos .ellipseProgressVitamineE'
    );
    let vitamineK1 = document.querySelector('.vitamineK1Infos');
    let vitamineK1Ellipse = document.querySelector(
      '.vitamineK1Infos .ellipseProgressVitamineK1'
    );
    let vitamineK2 = document.querySelector('.vitamineK2Infos');
    let vitamineK2Ellipse = document.querySelector(
      '.vitamineK2Infos .ellipseProgressVitamineK2'
    );
    let vitamineC = document.querySelector('.vitamineCInfos');
    let vitamineCEllipse = document.querySelector(
      '.vitamineCInfos .ellipseProgressVitamineC'
    );
    let vitamineB1 = document.querySelector('.vitamineB1Infos');
    let vitamineB1Ellipse = document.querySelector(
      '.vitamineB1Infos .ellipseProgressVitamineB1'
    );
    let vitamineB2 = document.querySelector('.vitamineB2Infos');
    let vitamineB2Ellipse = document.querySelector(
      '.vitamineB2Infos .ellipseProgressVitamineB2'
    );
    let vitamineB3Pp = document.querySelector('.vitamineB3PpInfos');
    let vitamineB3PpEllipse = document.querySelector(
      '.vitamineB3PpInfos .ellipseProgressVitamineB3Pp'
    );
    let vitamineB5 = document.querySelector('.vitamineB5Infos');
    let vitamineB5Ellipse = document.querySelector(
      '.vitamineB5Infos .ellipseProgressVitamineB5'
    );
    let vitamineB6 = document.querySelector('.vitamineB6Infos');
    let vitamineB6Ellipse = document.querySelector(
      '.vitamineB6Infos .ellipseProgressVitamineB6'
    );
    let vitamineB9 = document.querySelector('.vitamineB9Infos');
    let vitamineB9Ellipse = document.querySelector(
      '.vitamineB9Infos .ellipseProgressVitamineB9'
    );
    let vitamineB12 = document.querySelector('.vitamineB12Infos');
    let vitamineB12Ellipse = document.querySelector(
      '.vitamineB12Infos .ellipseProgressVitamineB12'
    );
    let selChlorureDeSodium = document.querySelector(
      '.selChlorureDeSodiumInfos'
    );
    let selChlorureDeSodiumEllipse = document.querySelector(
      '.selChlorureDeSodiumInfos .ellipseProgressSelChlorureDeSodium'
    );
    let calcium = document.querySelector('.calciumInfos');
    let calciumEllipse = document.querySelector(
      '.calciumInfos .ellipseProgressCalcium'
    );
    let chlorure = document.querySelector('.chlorureInfos');
    let chlorureEllipse = document.querySelector(
      '.chlorureInfos .ellipseProgressChlorure'
    );
    let cuivre = document.querySelector('.cuivreInfos');
    let cuivreEllipse = document.querySelector(
      '.cuivreInfos .ellipseProgressCuivre'
    );
    let fer = document.querySelector('.ferInfos');
    let ferEllipse = document.querySelector('.ferInfos .ellipseProgressFer');
    let iode = document.querySelector('.iodeInfos');
    let iodeEllipse = document.querySelector('.iodeInfos .ellipseProgressIode');
    const getProgress = ({ elapsed, total }) => elapsed / total;
    const easeOut = (t) => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;

    // HERE IS THE CLASS ( ACTIONS) ABOUT ALL INCOMING LAST SLIDE'S NUTRIMENT ANIMATION
    class NutrimentInAnimLastOne {
      constructor(
        nutriment,
        pathPoint,
        nutrimentValue,
        ellipse,
        nutritionalProfilNutriment
      ) {
        this.nutriment = nutriment;
        this.pathPoint = pathPoint;
        this.nutrimentValue = nutrimentValue;
        this.ellipse = ellipse;
        this.nutritionalProfilNutriment = nutritionalProfilNutriment;
      }

      methodeTessereau() {
        const finalPosition = pathTotalLength * this.pathPoint;
        this.nutriment.style.display = 'grid';
        this.nutriment.style.opacity = '1';
        let count = 0;
        const time = {
          start: performance.now(),
          total: 800,
        };

        const transitionAnim = (now) => {
          time.elapsed = now - time.start;
          const progress = getProgress(time);
          const easing = easeOut(progress);
          const position = path.getPointAtLength(
            0 * pathTotalLength + easing * finalPosition
          );

          this.nutriment.style.transform = `translate(

          calc(${position.x}px ),
          calc(${position.y}px )
            ) rotate(${transformRotate})`;
          if (progress > 0.98) {
            if (count === 0) {
              count++;
              setTimeout(() => {
                this.nutrimentValue * coefForRecipe >=
                this.nutritionalProfilNutriment
                  ? (this.ellipse.style.strokeDashoffset = '0')
                  : (this.ellipse.style.strokeDashoffset = ` ${
                      980 -
                      980 *
                        (
                          (this.nutrimentValue * coefForRecipe) /
                          this.nutritionalProfilNutriment
                        ).toFixed(2)
                    }`);
                switchOffAnim();
                // e.target.scrollTop = currentScrollY;
              }, 300);
            }
          }
          if (progress < 1) requestAnimationFrame(transitionAnim);
        };
        requestAnimationFrame(transitionAnim);
      }
    }

    // HERE IS ANIM IN FOR GLUCIDES
    let glucidesInAnim = new NutrimentInAnimLastOne(
      glucides,
      0.3,
      recipeId.recipeId.totalCarbs,
      glucideEllipse,
      nutritionalProfil.glucidesG
    );
    // glucidesInAnim.methodeTessereau();

    // HERE IS ANIM IN FOR RETINOL
    let retinolInAnim = new NutrimentInAnimLastOne(
      retinol,
      0.25,
      totalRetinolµg.current,
      retinolEllipse,
      nutritionalProfil.retinolµg
    );
    // retinolInAnim.methodeTessereau();

    // HERE IS ANIM IN FOR RETINOL
    let ferInAnim = new NutrimentInAnimLastOne(
      fer,
      0.25,
      ferMg.current,
      ferEllipse,
      nutritionalProfil.ferMg
    );

    // HERE IS THE CLASS ( ACTIONS) ABOUT ALL INCOMING BETWEEN SLIDE'S NUTRIMENT ANIMATION
    class NutrimentInAnimBetweenOne {
      constructor(
        nutriment,
        pathPoint,
        nutrimentValue,
        ellipse,
        nutritionalProfilNutriment
      ) {
        this.nutriment = nutriment;
        this.pathPoint = pathPoint;
        this.nutrimentValue = nutrimentValue;
        this.ellipse = ellipse;
        this.nutritionalProfilNutriment = nutritionalProfilNutriment;
      }

      methodeTessereau() {
        const finalPosition = pathTotalLength * this.pathPoint;
        this.nutriment.style.display = 'grid';
        this.nutriment.style.opacity = '1';
        let count = 0;
        let count2 = 0;
        const time = {
          start: performance.now(),
          total: 800,
        };

        const transitionAnim = (now) => {
          time.elapsed = now - time.start;
          const progress = getProgress(time);
          const easing = easeOut(progress);
          const position = path.getPointAtLength(
            0 * pathTotalLength + easing * finalPosition
          );

          this.nutriment.style.transform = `translate(

        calc(${position.x}px ),
        calc(${position.y}px )
          ) rotate(${transformRotate})`;
          if (progress > 0.5) {
            if (count === 0) {
              count++;

              switch (this.nutriment) {
                case proteines:
                  glucidesInAnim.methodeTessereau();
                  break;
                case betaCarotene:
                  retinolInAnim.methodeTessereau();
                  break;
                case vitamineD:
                  betaCaroteneInAnim.methodeTessereau();
                  break;
                case vitamineE:
                  vitamineDInAnim.methodeTessereau();
                  break;
                case calcium:
                  chlorureInAnim.methodeTessereau();
                  break;
                case chlorure:
                  cuivreInAnim.methodeTessereau();
                  break;
                case cuivre:
                  ferInAnim.methodeTessereau();
                  break;
                default:
                // do nothing
              }
            }
          }

          if (progress > 0.98) {
            if (count2 === 0) {
              count2++;
              setTimeout(() => {
                this.nutrimentValue * coefForRecipe >=
                this.nutritionalProfilNutriment
                  ? (this.ellipse.style.strokeDashoffset = '0')
                  : (this.ellipse.style.strokeDashoffset = ` ${
                      980 -
                      980 *
                        (
                          (this.nutrimentValue * coefForRecipe) /
                          this.nutritionalProfilNutriment
                        ).toFixed(2)
                    }`);

                // e.target.scrollTop = currentScrollY;
              }, 300);
            }
          }
          if (progress < 1) requestAnimationFrame(transitionAnim);
        };
        requestAnimationFrame(transitionAnim);
      }
    }

    // HERE IS ANIM IN FOR PROTEINES
    let proteinesInAnim = new NutrimentInAnimBetweenOne(
      proteines,
      0.5,
      recipeId.recipeId.totalProtein,
      proteinesEllipse,
      nutritionalProfil.proteinesG
    );
    // proteinesInAnim.methodeTessereau();
    // HERE IS ANIM IN FOR BETACAROTENE
    let betaCaroteneInAnim = new NutrimentInAnimBetweenOne(
      betaCarotene,
      0.4,
      betaCaroteneµg.current,
      betaCaroteneEllipse,
      nutritionalProfil.betaCaroteneµg
    );
    // betaCaroteneInAnim.methodeTessereau();
    // HERE IS ANIM IN FOR VITAMINE D
    let vitamineDInAnim = new NutrimentInAnimBetweenOne(
      vitamineD,
      0.55,
      vitamineDµg.current,
      vitamineDEllipse,
      nutritionalProfil.vitamineDµg
    );
    // vitamineDInAnim.methodeTessereau();
    // HERE IS ANIM IN FOR VITAMINE E
    let vitamineEInAnim = new NutrimentInAnimBetweenOne(
      vitamineE,
      0.7,
      vitamineEmg.current,
      vitamineEEllipse,
      nutritionalProfil.vitamineEmg
    );
    let cuivreInAnim = new NutrimentInAnimBetweenOne(
      cuivre,
      0.4,
      cuivreMg.current,
      cuivreEllipse,
      nutritionalProfil.cuivreMg
    );
    let chlorureInAnim = new NutrimentInAnimBetweenOne(
      chlorure,
      0.55,
      chlorureMg.current,
      chlorureEllipse,
      nutritionalProfil.chlorureMg
    );

    let calciumInAnim = new NutrimentInAnimBetweenOne(
      calcium,
      0.7,
      calciumMg.current,
      calciumEllipse,
      nutritionalProfil.calciumMg
    );

    // HERE IS THE CLASS ( ACTIONS) ABOUT ALL INCOMING FIRST SLIDE'S NUTRIMENT ANIMATION
    class NutrimentInAnimFirstOne {
      constructor(
        nutriment,
        pathPoint,
        nutrimentValue,
        ellipse,
        nutritionalProfilNutriment
      ) {
        this.nutriment = nutriment;
        this.pathPoint = pathPoint;
        this.nutrimentValue = nutrimentValue;
        this.ellipse = ellipse;
        this.nutritionalProfilNutriment = nutritionalProfilNutriment;
      }

      methodeTessereau() {
        const finalPosition = pathTotalLength * this.pathPoint;
        this.nutriment.style.display = 'grid';
        this.nutriment.style.opacity = '1';
        let count = 0;
        let count2 = 0;
        const time = {
          start: performance.now(),
          total: 800,
        };

        const transitionAnim = (now) => {
          time.elapsed = now - time.start;
          const progress = getProgress(time);
          const easing = easeOut(progress);
          const position = path.getPointAtLength(
            0 * pathTotalLength + easing * finalPosition
          );

          this.nutriment.style.transform = `translate(

        calc(${position.x}px ),
        calc(${position.y}px )
          ) rotate(${transformRotate})`;
          if (progress > 0.5) {
            if (count === 0) {
              count++;

              switch (this.nutriment) {
                case lipides:
                  proteinesInAnim.methodeTessereau();
                  break;
                case vitamineK1:
                  vitamineEInAnim.methodeTessereau();
                  break;
                case selChlorureDeSodium:
                  calciumInAnim.methodeTessereau();
                  break;
                default:
                // do nothing
              }
            }
          }

          if (progress > 0.98) {
            if (count2 === 0) {
              count2++;
              setTimeout(() => {
                this.nutrimentValue * coefForRecipe >=
                this.nutritionalProfilNutriment
                  ? (this.ellipse.style.strokeDashoffset = '0')
                  : (this.ellipse.style.strokeDashoffset = ` ${
                      980 -
                      980 *
                        (
                          (this.nutrimentValue * coefForRecipe) /
                          this.nutritionalProfilNutriment
                        ).toFixed(2)
                    }`);

                // e.target.scrollTop = currentScrollY;
              }, 300);
            }
          }
          if (progress < 1) requestAnimationFrame(transitionAnim);
        };
        requestAnimationFrame(transitionAnim);
      }
    }
    // HERE IS ANIM IN FOR LIPIDES
    let lipidesInAnim = new NutrimentInAnimFirstOne(
      lipides,
      0.7,
      recipeId.recipeId.totalFat,
      lipidesEllipse,
      nutritionalProfil.lipidesG
    );
    // lipidesInAnim.methodeTessereau();
    // HERE IS ANIM IN FOR VITAMINE K1
    let vitamineK1InAnim = new NutrimentInAnimFirstOne(
      vitamineK1,
      0.85,
      vitamineK1µg.current,
      vitamineK1Ellipse,
      nutritionalProfil.vitamineK1µg
    );
    // vitamineK1InAnim.methodeTessereau();
    let selChlorureDeSodiumInAnim = new NutrimentInAnimFirstOne(
      selChlorureDeSodium,
      0.85,
      selChlorureDeSodiumG.current,
      selChlorureDeSodiumEllipse,
      nutritionalProfil.selChlorureDeSodiumG
    );
    // selChlorureDeSodiumInAnim.methodeTessereau();

    // HERE IS THE CLASS ( ACTIONS) ABOUT ALL INCOMING FIRST AND BETWEEN SLIDE'S NUTRIMENT ANIMATION
    class NutrimentOutAnimReverseFirstOne {
      constructor(
        nutriment,
        pathPoint,
        nutrimentValue,
        ellipse,
        nutritionalProfilNutriment
      ) {
        this.nutriment = nutriment;
        this.pathPoint = pathPoint;
        this.nutrimentValue = nutrimentValue;
        this.ellipse = ellipse;
        this.nutritionalProfilNutriment = nutritionalProfilNutriment;
      }

      methodeTessereau() {
        const finalPosition = pathTotalLength * this.pathPoint;
        this.nutriment.style.display = 'grid';
        this.nutriment.style.opacity = '1';
        let count = 0;
        let count2 = 0;
        const time = {
          start: performance.now(),
          total: 800,
        };

        const transitionAnim = (now) => {
          time.elapsed = now - time.start;
          const progress = getProgress(time);
          const easing = easeOut(progress);
          const position = path.getPointAtLength(
            pathTotalLength - easing * finalPosition
          );

          this.nutriment.style.transform = `translate(

        calc(${position.x}px ),
        calc(${position.y}px )
          ) rotate(${transformRotate})`;
          if (progress > 0.5) {
            if (count === 0) {
              count++;

              switch (this.nutriment) {
                case glucides:
                  proteinesOutAnimReverse.methodeTessereau();
                  break;
                case proteines:
                  lipidesOutAnimReverse.methodeTessereau();
                  break;
                case vitamineB12:
                  vitamineB9OutAnimReverse.methodeTessereau();
                  break;
                case vitamineB9:
                  vitamineB6OutAnimReverse.methodeTessereau();
                  break;
                case vitamineB6:
                  vitamineB5OutAnimReverse.methodeTessereau();
                  break;
                case vitamineB5:
                  vitamineB3PpOutAnimReverse.methodeTessereau();
                  break;
                default:
                // do nothing
              }
            }
          }

          if (progress > 0.98) {
            if (count2 === 0) {
              count2++;
              setTimeout(() => {
                this.nutrimentValue * coefForRecipe >=
                this.nutritionalProfilNutriment
                  ? (this.ellipse.style.strokeDashoffset = '0')
                  : (this.ellipse.style.strokeDashoffset = ` ${
                      980 -
                      980 *
                        (
                          (this.nutrimentValue * coefForRecipe) /
                          this.nutritionalProfilNutriment
                        ).toFixed(2)
                    }`);

                // e.target.scrollTop = currentScrollY;
              }, 300);
            }
          }
          if (progress < 1) requestAnimationFrame(transitionAnim);
        };
        requestAnimationFrame(transitionAnim);
      }
    }

    // HERE IS ANIM OUT REVERSE FOR GLUCIDES
    let glucidesOutAnimReverse = new NutrimentOutAnimReverseFirstOne(
      glucides,
      0.7,
      recipeId.recipeId.totalCarbs,
      glucideEllipse,
      nutritionalProfil.glucidesG
    );
    // glucidesOutAnimReverse.methodeTessereau();

    // HERE IS ANIM OUT REVERSE FOR PROTEINES
    let proteinesOutAnimReverse = new NutrimentOutAnimReverseFirstOne(
      proteines,
      0.5,
      recipeId.recipeId.totalProtein,
      proteinesEllipse,
      nutritionalProfil.proteinesG
    );
    // proteinesOutAnimReverse.methodeTessereau();

    // HERE IS ANIM OUT REVERSE FOR VITAMINE B12
    let vitamineB12OutAnimReverse = new NutrimentOutAnimReverseFirstOne(
      vitamineB12,
      0.75,
      vitamineB12µg.current,
      vitamineB12Ellipse,
      nutritionalProfil.vitamineB12µg
    );
    //  vitamineB12OutAnimReverse.methodeTessereau();

    // HERE IS ANIM OUT REVERSE FOR VITAMINE B9
    let vitamineB9OutAnimReverse = new NutrimentOutAnimReverseFirstOne(
      vitamineB9,
      0.6,
      vitamineB9FolatesTotauxµg.current,
      vitamineB9Ellipse,
      nutritionalProfil.vitamineB9FolatesTotauxµg
    );
    //  vitamineB9OutAnimReverse.methodeTessereau();

    // HERE IS ANIM OUT REVERSE FOR VITAMINE B6
    let vitamineB6OutAnimReverse = new NutrimentOutAnimReverseFirstOne(
      vitamineB6,
      0.45,
      vitamineB6Mg.current,
      vitamineB6Ellipse,
      nutritionalProfil.vitamineB6Mg
    );
    //  vitamineB6OutAnimReverse.methodeTessereau();

    // HERE IS ANIM OUT REVERSE FOR VITAMINE B5
    let vitamineB5OutAnimReverse = new NutrimentOutAnimReverseFirstOne(
      vitamineB5,
      0.3,
      vitamineB5AcidePantotheniqueMg.current,
      vitamineB5Ellipse,
      nutritionalProfil.vitamineB5AcidePantotheniqueMg
    );
    //  vitamineB5OutAnimReverse.methodeTessereau();

    // HERE IS THE CLASS ( ACTIONS) ABOUT ALL INCOMING LAST SLIDE'S NUTRIMENT ANIMATION
    class NutrimentOutAnimReverseLastOne {
      constructor(
        nutriment,
        pathPoint,
        nutrimentValue,
        ellipse,
        nutritionalProfilNutriment
      ) {
        this.nutriment = nutriment;
        this.pathPoint = pathPoint;
        this.nutrimentValue = nutrimentValue;
        this.ellipse = ellipse;
        this.nutritionalProfilNutriment = nutritionalProfilNutriment;
      }

      methodeTessereau() {
        const finalPosition = pathTotalLength * this.pathPoint;
        this.nutriment.style.display = 'grid';
        this.nutriment.style.opacity = '1';
        let count = 0;
        const time = {
          start: performance.now(),
          total: 800,
        };

        const transitionAnim = (now) => {
          time.elapsed = now - time.start;
          const progress = getProgress(time);
          const easing = easeOut(progress);
          const position = path.getPointAtLength(
            pathTotalLength - easing * finalPosition
          );

          this.nutriment.style.transform = `translate(
  
          calc(${position.x}px ),
          calc(${position.y}px )
            ) rotate(${transformRotate})`;

          if (progress > 0.98) {
            if (count === 0) {
              count++;
              switch (this.nutriment) {
                case lipides:
                  e.target.scrollTop = numberOfPixelsForEachStep * 4;
                  scrollY.current = numberOfPixelsForEachStep * 4;
                  currentScrollY = numberOfPixelsForEachStep * 4;
                  break;
                case vitamineB3Pp:
                  e.target.scrollTop = numberOfPixelsForEachStep * 6;
                  scrollY.current = numberOfPixelsForEachStep * 6;
                  currentScrollY = numberOfPixelsForEachStep * 6;
                  break;
                default:
                // do nothing
              }

              setTimeout(() => {
                this.nutrimentValue * coefForRecipe >=
                this.nutritionalProfilNutriment
                  ? (this.ellipse.style.strokeDashoffset = '0')
                  : (this.ellipse.style.strokeDashoffset = ` ${
                      980 -
                      980 *
                        (
                          (this.nutrimentValue * coefForRecipe) /
                          this.nutritionalProfilNutriment
                        ).toFixed(2)
                    }`);
                switchOffAnim();
                // e.target.scrollTop = currentScrollY;
              }, 300);
            }
          }
          if (progress < 1) requestAnimationFrame(transitionAnim);
        };
        requestAnimationFrame(transitionAnim);
      }
    }

    // HERE IS ANIM OUT REVERSE FOR  LIPIDES
    let lipidesOutAnimReverse = new NutrimentOutAnimReverseLastOne(
      lipides,
      0.3,
      recipeId.recipeId.totalFat,
      lipidesEllipse,
      nutritionalProfil.lipidesG
    );
    // lipidesOutAnimReverse.methodeTessereau();

    // HERE IS ANIM OUT REVERSE FOR VITAMINE B3Pp
    let vitamineB3PpOutAnimReverse = new NutrimentOutAnimReverseLastOne(
      vitamineB3Pp,
      0.15,
      vitamineB3PpNiacineMg.current,
      vitamineB3PpEllipse,
      nutritionalProfil.vitamineB3PpNiacineMg
    );
    // vitamineB3PpOutAnimReverse.methodeTessereau();

    const glucidesInAnimReverse = () => {
      switchOnAnim();
      let count = 0;
      const finalPosition = pathTotalLength * 0.3;
      const time = {
        start: Date.now(),
        total: 800,
      };
      glucideEllipse.style.strokeDashoffset = ` 980`;

      const transitionAnim = (now) => {
        time.elapsed = Date.now() - time.start;
        const progress = getProgress(time);
        const easing = easeOut(progress);
        const position = path.getPointAtLength(
          pathTotalLength * 0.3 - easing * finalPosition
        );
        glucides.style.transform = `translate(

          calc(${position.x}px ),
          calc(${position.y}px )
            ) rotate(${transformRotate})`;

        if (progress < 1) requestAnimationFrame(transitionAnim);
        glucides.style.opacity = progress > 0.8 ? '0' : '';

        if (progress > 0.5) {
          if (count === 0) {
            count++;
            proteinesInAnimReverse();
          }
        }
      };

      requestAnimationFrame(transitionAnim);
    };

    const glucidesOutAnim = () => {
      let count = 0;
      const finalPosition = pathTotalLength * 0.7;
      glucideEllipse.style.strokeDashoffset = ` 980`;
      const time = {
        start: Date.now(),
        total: 800,
      };

      const transitionAnim = () => {
        time.elapsed = Date.now() - time.start;
        const progress = getProgress(time);
        const easing = easeOut(progress);
        const position = path.getPointAtLength(
          0.3 * pathTotalLength + easing * finalPosition
        );
        glucides.style.transform = `translate(

          calc(${position.x}px ),
          calc(${position.y}px - 0%)
            ) rotate(${transformRotate})`;

        if (progress > 0.95) {
          if (count === 0) {
            count++;
            setCurrentLi(currentLi + 1);
            setTimeout(() => {
              setPrevLi(prevLi + 1);
              vitamineK1InAnim.methodeTessereau();
              e.target.scrollTop = numberOfPixelsForEachStep * 5;
              scrollY.current = numberOfPixelsForEachStep * 5;
              currentScrollY = numberOfPixelsForEachStep * 5;
            }, 300);
          }
        }
        if (progress < 1) requestAnimationFrame(transitionAnim);

        glucides.style.opacity = easing > 0.99 ? '0' : '';
      };

      requestAnimationFrame(transitionAnim);
    };

    // HERE IS ANIMS FOR PROTEINES
    const proteinesInAnimReverse = () => {
      let count = 0;
      const time = {
        start: Date.now(),
        total: 800,
      };
      proteinesEllipse.style.strokeDashoffset = ` 980`;

      const transitionAnim = (now) => {
        const finalPosition = pathTotalLength * 0.5;
        time.elapsed = Date.now() - time.start;
        const progress = getProgress(time);
        const easing = easeOut(progress);
        const position = path.getPointAtLength(
          pathTotalLength * 0.5 - easing * finalPosition
        );
        proteines.style.transform = `translate(

          calc(${position.x}px ),
          calc(${position.y}px )
            ) rotate(${transformRotate})`;

        if (progress < 1) requestAnimationFrame(transitionAnim);
        if (progress > 0.5) {
          if (count === 0) {
            count++;
            lipidesInAnimReverse();
          }
        }
      };
      requestAnimationFrame(transitionAnim);
    };

    const proteinesOutAnim = () => {
      const finalPosition = pathTotalLength * 0.5;
      let count = 0;
      const time = {
        start: performance.now(),
        total: 800,
      };
      proteinesEllipse.style.strokeDashoffset = ` 980`;

      const transitionAnim = (now) => {
        time.elapsed = now - time.start;
        const progress = getProgress(time);
        const easing = easeOut(progress);
        const position = path.getPointAtLength(
          0.5 * pathTotalLength + easing * finalPosition
        );
        proteines.style.transform = `translate(

          calc(${position.x}px ),
          calc(${position.y}px )
            ) rotate(${transformRotate})`;

        if (progress > 0.5) {
          if (count === 0) {
            count++;
            glucidesOutAnim();
          }
        }
        if (progress < 1) requestAnimationFrame(transitionAnim);
      };
      requestAnimationFrame(transitionAnim);
    };

    // HERE IS ANIMS FOR LIPIDES

    const lipidesInAnimReverse = () => {
      let count = 0;
      const finalPosition = pathTotalLength * 0.7;
      const time = {
        start: Date.now(),
        total: 800,
      };
      lipidesEllipse.style.strokeDashoffset = ` 980`;

      const transitionAnim = (now) => {
        time.elapsed = Date.now() - time.start;
        const progress = getProgress(time);
        const easing = easeOut(progress);
        const position = path.getPointAtLength(
          pathTotalLength * 0.7 - easing * finalPosition
        );
        lipides.style.transform = `translate(

          calc(${position.x}px ),
          calc(${position.y}px )
            ) rotate(${transformRotate})`;

        if (progress < 1) requestAnimationFrame(transitionAnim);
        if (progress > 0.95) {
          if (count === 0) {
            count++;
            setCurrentLi(currentLi - 1);
            setTimeout(() => {
              setPrevLi(prevLi - 1);
            }, 150);
          }
        }

        lipides.style.opacity = progress > 0.8 ? '0' : '';
      };

      requestAnimationFrame(transitionAnim);
    };

    const lipidesOutAnim = () => {
      switchOnAnim();
      let count = 0;
      const finalPosition = pathTotalLength * 0.3;
      lipidesEllipse.style.strokeDashoffset = ` 980`;
      const time = {
        start: Date.now(),
        total: 800,
      };

      const transitionAnim = () => {
        time.elapsed = Date.now() - time.start;
        const progress = getProgress(time);
        const easing = easeOut(progress);
        const position = path.getPointAtLength(
          0.7 * pathTotalLength + easing * finalPosition
        );
        lipides.style.transform = `translate(

          calc(${position.x}px ),
          calc(${position.y}px - 0%)
            ) rotate(${transformRotate})`;
        if (progress > 0.5) {
          if (count === 0) {
            count++;
            proteinesOutAnim();
          }
        }

        if (progress < 1) requestAnimationFrame(transitionAnim);
      };

      requestAnimationFrame(transitionAnim);
    };

    // HERE IS ABOUT SCROLL DIRECTION    // HERE IS ABOUT SCROLL DIRECTION    // HERE IS ABOUT SCROLL DIRECTION

    if (currentScrollY > prevScrollY && isItScrollingDown === false) {
      setIsItScrollingDown(!isItScrollingDown);
    } else if (currentScrollY < prevScrollY && isItScrollingDown === true) {
      setIsItScrollingDown(!isItScrollingDown);
    }
    // SCROLLING ACTIONS NO MATTER DIRECTION  // SCROLLING ACTIONS NO MATTER DIRECTION  // SCROLLING ACTIONS NO MATTER DIRECTION
    if (currentLi === 5) {
      let ratioTransitionForVitamines =
        (currentScrollY,
        (currentScrollY - numberOfPixelsForEachStep * 5) /
          numberOfPixelsForEachStep) * 1.45;

      // CLASS FOR ALL VITAMINES ACTIONS ON SCROLL // CLASS FOR ALL VITAMINES ACTIONS // CLASS FOR ALL VITAMINES ACTIONS

      class VitaminesScrollOnPathActions {
        constructor(
          nutriment,
          pathPoint,
          nutrimentValue,
          ellipse,
          nutritionalProfilNutriment
        ) {
          this.nutriment = nutriment;
          this.pathPoint = pathPoint;
          this.nutrimentValue = nutrimentValue;
          this.ellipse = ellipse;
          this.nutritionalProfilNutriment = nutritionalProfilNutriment;
        }

        methodeTessereau() {
          const position = path.getPointAtLength(
            pathTotalLength * (this.pathPoint + ratioTransitionForVitamines)
          );
          let reverse = path.getPointAtLength(
            pathTotalLength * (0.85 + ratioTransitionForVitamines)
          );
          let out = path.getPointAtLength(
            pathTotalLength * (-1.2 + ratioTransitionForVitamines)
          );
          this.nutriment.style.opacity = 1;
          this.nutriment.style.transform = `translate(
              calc(${position.x}px ),
              calc(${position.y}px )
                ) rotate(${transformRotate})`;
          if (
            position.y < path.getPointAtLength(pathTotalLength * 0.01).y ||
            position.y > path.getPointAtLength(pathTotalLength * 0.99).y
          ) {
            this.nutriment.style.display = 'none';
          } else this.nutriment.style.display = 'grid';
          if (
            position.y < path.getPointAtLength(pathTotalLength * 0.2).y ||
            position.y > path.getPointAtLength(pathTotalLength * 0.9).y
          ) {
            this.ellipse.style.strokeDashoffset = ` 980`;
            this.nutriment.querySelector('h2').style.opacity = 0;
            this.nutriment
              .querySelectorAll('h3, div:nth-child(2)')
              .forEach((el) => (el.style.display = 'none'));
          } else {
            this.nutriment.querySelector('h2').style.opacity = 1;
            this.nutriment
              .querySelectorAll('h3, div:nth-child(2)')
              .forEach((el) => (el.style.display = 'block'));
            this.nutrimentValue.current * coefForRecipe >=
            this.nutritionalProfilNutriment
              ? (this.ellipse.style.strokeDashoffset = '0')
              : (this.ellipse.style.strokeDashoffset = ` ${
                  980 -
                  980 *
                    (
                      (this.nutrimentValue.current * coefForRecipe) /
                      this.nutritionalProfilNutriment
                    ).toFixed(2)
                }`);
          }
          if (reverse.y <= path.getPointAtLength(0 * pathTotalLength).y) {
            switchOnAnim();
            e.target.scrollTop = numberOfPixelsForEachStep * 4;
            scrollY.current = numberOfPixelsForEachStep * 4;
            currentScrollY = numberOfPixelsForEachStep * 4;
            setTimeout(() => {
              setCurrentLi(currentLi - 1);
              setPrevLi(prevLi - 1);
              setTimeout(() => {
                glucidesOutAnimReverse.methodeTessereau();
              }, 250);
            }, 200);
          }

          if (out.y >= path.getPointAtLength(pathTotalLength).y) {
            switchOnAnim();
            setTimeout(() => {
              setCurrentLi(currentLi + 1);
              setPrevLi(prevLi + 1);

              setTimeout(() => {
                e.target.scrollTop = numberOfPixelsForEachStep * 6;
                scrollY.current = numberOfPixelsForEachStep * 6;
                currentScrollY = numberOfPixelsForEachStep * 6;

                selChlorureDeSodiumInAnim.methodeTessereau();
              }, 250);
            }, 200);
          }
        }
      }
      // VITAMINE K1  SCROLLING ACTIONS // VITAMINE K1 SCROLLING ACTIONS
      let vitamineK1Scroll = new VitaminesScrollOnPathActions(
        vitamineK1,
        0.85,
        vitamineK1µg,
        vitamineK1Ellipse,
        nutritionalProfil.vitamineK1µg
      );
      vitamineK1Scroll.methodeTessereau();
      // VITAMINE E  SCROLLING ACTIONS // VITAMINE E SCROLLING ACTIONS
      let vitamineEScroll = new VitaminesScrollOnPathActions(
        vitamineE,
        0.7,
        vitamineEmg,
        vitamineEEllipse,
        nutritionalProfil.vitamineEmg
      );
      vitamineEScroll.methodeTessereau();
      // VITAMINE D  SCROLLING ACTIONS // VITAMINE D SCROLLING ACTIONS
      let vitamineDScroll = new VitaminesScrollOnPathActions(
        vitamineD,
        0.55,
        vitamineDµg,
        vitamineDEllipse,
        nutritionalProfil.vitamineDµg
      );
      vitamineDScroll.methodeTessereau();
      // BETACAROTENE SCROLLING ACTIONS // BETACAROTENE SCROLLING ACTIONS
      let betaCaroteneScroll = new VitaminesScrollOnPathActions(
        betaCarotene,
        0.4,
        betaCaroteneµg,
        betaCaroteneEllipse,
        nutritionalProfil.betaCaroteneµg
      );
      betaCaroteneScroll.methodeTessereau();
      // RETINOL  SCROLLING ACTIONS // RETINOL SCROLLING ACTIONS
      let retinolScroll = new VitaminesScrollOnPathActions(
        retinol,
        0.25,
        totalRetinolµg,
        retinolEllipse,
        nutritionalProfil.retinolµg
      );
      retinolScroll.methodeTessereau();
      // VITAMINE K2  SCROLLING ACTIONS // VITAMINE K2 SCROLLING ACTIONS
      let vitamineK2Scroll = new VitaminesScrollOnPathActions(
        vitamineK2,
        0,
        vitamineK2µg,
        vitamineK2Ellipse,
        nutritionalProfil.vitamineK2µg
      );
      vitamineK2Scroll.methodeTessereau();
      // VITAMINE C  SCROLLING ACTIONS // VITAMINE C SCROLLING ACTIONS
      let vitamineCScroll = new VitaminesScrollOnPathActions(
        vitamineC,
        -0.15,
        vitamineCmg,
        vitamineCEllipse,
        nutritionalProfil.vitamineCmg
      );
      vitamineCScroll.methodeTessereau();
      // VITAMINE B1  SCROLLING ACTIONS // VITAMINE B1 SCROLLING ACTIONS
      let vitamineB1Scroll = new VitaminesScrollOnPathActions(
        vitamineB1,
        -0.3,
        vitamineB1ThiamineMg,
        vitamineB1Ellipse,
        nutritionalProfil.vitamineB1ThiamineMg
      );
      vitamineB1Scroll.methodeTessereau();
      // VITAMINE B2  SCROLLING ACTIONS // VITAMINE B2 SCROLLING ACTIONS
      let vitamineB2Scroll = new VitaminesScrollOnPathActions(
        vitamineB2,
        -0.45,
        vitamineB2RiboflavineMg,
        vitamineB2Ellipse,
        nutritionalProfil.vitamineB2RiboflavineMg
      );
      vitamineB2Scroll.methodeTessereau();
      // VITAMINE B3Pp  SCROLLING ACTIONS // VITAMINE B3Pp SCROLLING ACTIONS
      let vitamineB3PpScroll = new VitaminesScrollOnPathActions(
        vitamineB3Pp,
        -0.6,
        vitamineB3PpNiacineMg,
        vitamineB3PpEllipse,
        nutritionalProfil.vitamineB3PpNiacineMg
      );
      vitamineB3PpScroll.methodeTessereau();
      // VITAMINE B5  SCROLLING ACTIONS // VITAMINE B5 SCROLLING ACTIONS
      let vitamineB5Scroll = new VitaminesScrollOnPathActions(
        vitamineB5,
        -0.75,
        vitamineB5AcidePantotheniqueMg,
        vitamineB5Ellipse,
        nutritionalProfil.vitamineB5AcidePantotheniqueMg
      );
      vitamineB5Scroll.methodeTessereau();
      // VITAMINE B6  SCROLLING ACTIONS // VITAMINE B6 SCROLLING ACTIONS
      let vitamineB6Scroll = new VitaminesScrollOnPathActions(
        vitamineB6,
        -0.9,
        vitamineB6Mg,
        vitamineB6Ellipse,
        nutritionalProfil.vitamineB6Mg
      );
      vitamineB6Scroll.methodeTessereau();
      // VITAMINE B9  SCROLLING ACTIONS // VITAMINE B9 SCROLLING ACTIONS
      let vitamineB9Scroll = new VitaminesScrollOnPathActions(
        vitamineB9,
        -1.05,
        vitamineB9FolatesTotauxµg,
        vitamineB9Ellipse,
        nutritionalProfil.vitamineB9FolatesTotauxµg
      );
      vitamineB9Scroll.methodeTessereau();
      // VITAMINE B12  SCROLLING ACTIONS // VITAMINE B12 SCROLLING ACTIONS
      let vitamineB12Scroll = new VitaminesScrollOnPathActions(
        vitamineB12,
        -1.2,
        vitamineB12µg,
        vitamineB12Ellipse,
        nutritionalProfil.vitamineB12µg
      );
      vitamineB12Scroll.methodeTessereau();
    }
    if (currentLi === 6) {
      let ratioTransitionForVitamines =
        (currentScrollY,
        (currentScrollY - numberOfPixelsForEachStep * 6) /
          numberOfPixelsForEachStep) * 1.45;

      // CLASS FOR ALL MINERALS ACTIONS ONSCROLL // CLASS FOR ALL MINERALS ACTIONS // CLASS FOR ALL MINERALS ACTIONS

      class MineralsScrollOnPathActions {
        constructor(
          nutriment,
          pathPoint,
          nutrimentValue,
          ellipse,
          nutritionalProfilNutriment
        ) {
          this.nutriment = nutriment;
          this.pathPoint = pathPoint;
          this.nutrimentValue = nutrimentValue;
          this.ellipse = ellipse;
          this.nutritionalProfilNutriment = nutritionalProfilNutriment;
        }

        methodeTessereau() {
          const position = path.getPointAtLength(
            pathTotalLength * (this.pathPoint + ratioTransitionForVitamines)
          );
          let reverse = path.getPointAtLength(
            pathTotalLength * (0.85 + ratioTransitionForVitamines)
          );
          let out = path.getPointAtLength(
            pathTotalLength * (-1.2 + ratioTransitionForVitamines)
          );
          this.nutriment.style.opacity = 1;
          this.nutriment.style.transform = `translate(
              calc(${position.x}px ),
              calc(${position.y}px )
                ) rotate(${transformRotate})`;
          if (
            position.y < path.getPointAtLength(pathTotalLength * 0.01).y ||
            position.y > path.getPointAtLength(pathTotalLength * 0.99).y
          ) {
            this.nutriment.style.display = 'none';
          } else this.nutriment.style.display = 'grid';
          if (
            position.y < path.getPointAtLength(pathTotalLength * 0.2).y ||
            position.y > path.getPointAtLength(pathTotalLength * 0.9).y
          ) {
            this.ellipse.style.strokeDashoffset = ` 980`;
            this.nutriment.querySelector('h2').style.opacity = 0;
            this.nutriment
              .querySelectorAll('h3, div:nth-child(2)')
              .forEach((el) => (el.style.display = 'none'));
          } else {
            this.nutriment.querySelector('h2').style.opacity = 1;
            this.nutriment
              .querySelectorAll('h3, div:nth-child(2)')
              .forEach((el) => (el.style.display = 'block'));
            this.nutrimentValue.current * coefForRecipe >=
            this.nutritionalProfilNutriment
              ? (this.ellipse.style.strokeDashoffset = '0')
              : (this.ellipse.style.strokeDashoffset = ` ${
                  980 -
                  980 *
                    (
                      (this.nutrimentValue.current * coefForRecipe) /
                      this.nutritionalProfilNutriment
                    ).toFixed(2)
                }`);
          }
          if (reverse.y <= path.getPointAtLength(0 * pathTotalLength).y) {
            switchOnAnim();
            e.target.scrollTop = numberOfPixelsForEachStep * 5;
            scrollY.current = numberOfPixelsForEachStep * 5;
            currentScrollY = numberOfPixelsForEachStep * 5;
            setTimeout(() => {
              setCurrentLi(currentLi - 1);
              setPrevLi(prevLi - 1);
              setTimeout(() => {
                vitamineB12OutAnimReverse.methodeTessereau();
              }, 250);
            }, 200);
          }

          if (
            out.y >= path.getPointAtLength(pathTotalLength).y &&
            isItScrollingDown
          ) {
            alertPopup(
              'Liste de tous les lipides, glucides, index nutritionnels et autres... Seront bientôt disponible :)',
              'info'
            );
            // switchOnAnim();
            // setTimeout(() => {
            //   setCurrentLi(currentLi + 1);
            //   setPrevLi(prevLi + 1);

            //   setTimeout(() => {
            //     e.target.scrollTop = numberOfPixelsForEachStep * 6;
            //     scrollY.current = numberOfPixelsForEachStep * 6;
            //     currentScrollY = numberOfPixelsForEachStep * 6;

            //     selChlorureDeSodiumInAnim.methodeTessereau();
            //   }, 250);
            // }, 200);
          }
        }
      }

      let selChlorureScroll = new MineralsScrollOnPathActions(
        selChlorureDeSodium,
        0.85,
        selChlorureDeSodiumG.current,
        selChlorureDeSodiumEllipse,
        nutritionalProfil.selChlorureDeSodiumG
      );
      selChlorureScroll.methodeTessereau();
      // CALCIUM SCROLLING ACTIONS // CALCIUM SCROLLING ACTIONS
      let calciumScroll = new MineralsScrollOnPathActions(
        calcium,
        0.7,
        calciumMg,
        calciumEllipse,
        nutritionalProfil.calciumMg
      );
      calciumScroll.methodeTessereau();
      // CHLORURE  SCROLLING ACTIONS // CHLORURE  SCROLLING ACTIONS
      let chlorureScroll = new MineralsScrollOnPathActions(
        chlorure,
        0.55,
        chlorureMg,
        chlorureEllipse,
        nutritionalProfil.chlorureMg
      );
      chlorureScroll.methodeTessereau();
      // CUIVRE SCROLLING ACTIONS // CUIVRE SCROLLING ACTIONS
      let cuivreScroll = new MineralsScrollOnPathActions(
        cuivre,
        0.4,
        cuivreMg,
        cuivreEllipse,
        nutritionalProfil.cuivreMg
      );
      cuivreScroll.methodeTessereau();
      // FER  SCROLLING ACTIONS // FER SCROLLING ACTIONS
      let ferScroll = new MineralsScrollOnPathActions(
        fer,
        0.25,
        ferMg,
        ferEllipse,
        nutritionalProfil.ferMg
      );
      ferScroll.methodeTessereau();
      // IODE  SCROLLING ACTIONS // IODE SCROLLING ACTIONS
      let iodeScroll = new MineralsScrollOnPathActions(
        iode,
        0,
        iodeµg,
        iodeEllipse,
        nutritionalProfil.iodeµg
      );
      iodeScroll.methodeTessereau();
      // // VITAMINE C  SCROLLING ACTIONS // VITAMINE C SCROLLING ACTIONS
      // let vitamineCScroll = new VitaminesScrollOnPathActions(
      //   vitamineC,
      //   -0.15,
      //   vitamineCmg,
      //   vitamineCEllipse,
      //   nutritionalProfil.vitamineCmg
      // );
      // vitamineCScroll.methodeTessereau();
      // // VITAMINE B1  SCROLLING ACTIONS // VITAMINE B1 SCROLLING ACTIONS
      // let vitamineB1Scroll = new VitaminesScrollOnPathActions(
      //   vitamineB1,
      //   -0.3,
      //   vitamineB1ThiamineMg,
      //   vitamineB1Ellipse,
      //   nutritionalProfil.vitamineB1ThiamineMg
      // );
      // vitamineB1Scroll.methodeTessereau();
      // // VITAMINE B2  SCROLLING ACTIONS // VITAMINE B2 SCROLLING ACTIONS
      // let vitamineB2Scroll = new VitaminesScrollOnPathActions(
      //   vitamineB2,
      //   -0.45,
      //   vitamineB2RiboflavineMg,
      //   vitamineB2Ellipse,
      //   nutritionalProfil.vitamineB2RiboflavineMg
      // );
      // vitamineB2Scroll.methodeTessereau();
      // // VITAMINE B3Pp  SCROLLING ACTIONS // VITAMINE B3Pp SCROLLING ACTIONS
      // let vitamineB3PpScroll = new VitaminesScrollOnPathActions(
      //   vitamineB3Pp,
      //   -0.6,
      //   vitamineB3PpNiacineMg,
      //   vitamineB3PpEllipse,
      //   nutritionalProfil.vitamineB3PpNiacineMg
      // );
      // vitamineB3PpScroll.methodeTessereau();
      // // VITAMINE B5  SCROLLING ACTIONS // VITAMINE B5 SCROLLING ACTIONS
      // let vitamineB5Scroll = new VitaminesScrollOnPathActions(
      //   vitamineB5,
      //   -0.75,
      //   vitamineB5AcidePantotheniqueMg,
      //   vitamineB5Ellipse,
      //   nutritionalProfil.vitamineB5AcidePantotheniqueMg
      // );
      // vitamineB5Scroll.methodeTessereau();
      // // VITAMINE B6  SCROLLING ACTIONS // VITAMINE B6 SCROLLING ACTIONS
      // let vitamineB6Scroll = new VitaminesScrollOnPathActions(
      //   vitamineB6,
      //   -0.9,
      //   vitamineB6Mg,
      //   vitamineB6Ellipse,
      //   nutritionalProfil.vitamineB6Mg
      // );
      // vitamineB6Scroll.methodeTessereau();
      // // VITAMINE B9  SCROLLING ACTIONS // VITAMINE B9 SCROLLING ACTIONS
      // let vitamineB9Scroll = new VitaminesScrollOnPathActions(
      //   vitamineB9,
      //   -1.05,
      //   vitamineB9FolatesTotauxµg,
      //   vitamineB9Ellipse,
      //   nutritionalProfil.vitamineB9FolatesTotauxµg
      // );
      // vitamineB9Scroll.methodeTessereau();
      // // VITAMINE B12  SCROLLING ACTIONS // VITAMINE B12 SCROLLING ACTIONS
      // let vitamineB12Scroll = new VitaminesScrollOnPathActions(
      //   vitamineB12,
      //   -1.2,
      //   vitamineB12µg,
      //   vitamineB12Ellipse,
      //   nutritionalProfil.vitamineB12µg
      // );
      // vitamineB12Scroll.methodeTessereau();
    }

    setTimeout(() => {
      // SCROLLING DOWN ACTIONS     // SCROLLING DOWN ACTIONS     // SCROLLING DOWN ACTIONS     // SCROLLING DOWN ACTIONS
      if (
        currentLi < ArrayForNav.length - 1 &&
        isItScrollingDown &&
        scrollY.current === currentScrollY
      ) {
        if (currentLi === 1 && arrayList.length !== 1) {
          if (
            ingredientListNumber < arrayList.length - 1 &&
            isItScrollingDown &&
            scrollY.current === currentScrollY
          ) {
            setIngredientListNumber(ingredientListNumber + 1);
            setTimeout(() => {
              setPrevingredientListNumber(previngredientListNumber + 1);
            }, 100);
            setPrevScrollY(currentScrollY);
          } else if (
            ingredientListNumber === arrayList.length - 1 &&
            isItScrollingDown &&
            scrollY.current === currentScrollY
          ) {
            setCurrentLi(currentLi + 1);
            setTimeout(() => {
              setPrevLi(prevLi + 1);
            }, 250);
            setPrevScrollY(currentScrollY);
          }
        } else if (currentLi === 1) {
          setCurrentLi(currentLi + 1);
          setTimeout(() => {
            setPrevLi(prevLi + 1);
          }, 250);
          setPrevScrollY(currentScrollY);
        } else if (
          currentLi === 3 &&
          instructionListNumber <
            recipeId.recipeId.recipeInstructions.length - 1 &&
          isItScrollingDown &&
          scrollY.current === currentScrollY
        ) {
          setInstructionListNumber(instructionListNumber + 1);
          setTimeout(() => {
            setPrevinstructionListNumber(previnstructionListNumber + 1);
          }, 100);
          setPrevScrollY(currentScrollY);
        } else if (
          currentLi === 3 &&
          instructionListNumber ===
            recipeId.recipeId.recipeInstructions.length - 1 &&
          isItScrollingDown &&
          scrollY.current === currentScrollY
        ) {
          setCurrentLi(currentLi + 1);

          setTimeout(() => {
            setPrevLi(prevLi + 1);
            lipidesInAnim.methodeTessereau();
          }, 350);
          setPrevScrollY(currentScrollY);
        } else if (currentLi === 4) {
          lipidesOutAnim();

          setPrevScrollY(currentScrollY);
        } else if (currentScrollY > 0.98 * clientHeightOfElement) {
          setCurrentLi(ArrayForNav.length - 1);
          setPrevScrollY(currentScrollY);
        } else if (currentLi === 5) {
          setPrevScrollY(currentScrollY);
        } else if (currentLi === 6) {
          setPrevScrollY(currentScrollY);
        } else if (currentLi !== 1 && currentLi !== 6) {
          setCurrentLi(currentLi + 1);
          setTimeout(() => {
            setPrevLi(prevLi + 1);
          }, 50);
          setPrevScrollY(currentScrollY);
        }

        // SCROLLING TOP ACTIONS  //  SCROLLING TOP ACTIONS  //  SCROLLING TOP ACTIONS  //  SCROLLING TOP ACTIONS
      } else if (
        currentLi > 0 &&
        !isItScrollingDown &&
        scrollY.current === currentScrollY
      ) {
        if (
          currentLi === 1 &&
          arrayList.length === 1 &&
          !isItScrollingDown &&
          scrollY.current === currentScrollY
        ) {
          setCurrentLi(currentLi - 1);
          setTimeout(() => {
            setPrevLi(prevLi - 1);
          }, 250);
          setPrevScrollY(currentScrollY);
        }
        if (currentLi === 1 && arrayList.length !== 1) {
          if (
            ingredientListNumber <= arrayList.length - 1 &&
            ingredientListNumber !== 0 &&
            !isItScrollingDown &&
            scrollY.current === currentScrollY
          ) {
            setIngredientListNumber(ingredientListNumber - 1);
            setTimeout(() => {
              setPrevingredientListNumber(previngredientListNumber - 1);
            }, 150);
            setPrevScrollY(currentScrollY);
          } else if (
            ingredientListNumber === 0 &&
            !isItScrollingDown &&
            scrollY.current === currentScrollY
          ) {
            setIngredientListNumber(0);
            setTimeout(() => {
              setPrevingredientListNumber(0);
            }, 100);
            setPrevScrollY(currentScrollY);
            setCurrentLi(0);
            setTimeout(() => {
              setPrevLi(0);
            }, 250);
            setPrevScrollY(currentScrollY);
          }
        } else if (currentLi === 2) {
          setCurrentLi(currentLi - 1);
          setTimeout(() => {
            setPrevLi(prevLi - 1);
          }, 250);
        } else if (
          currentLi === 3 &&
          recipeId.recipeId.recipeInstructions.length !== 1
        ) {
          if (
            instructionListNumber <=
              recipeId.recipeId.recipeInstructions.length - 1 &&
            instructionListNumber !== 0 &&
            !isItScrollingDown &&
            scrollY.current === currentScrollY
          ) {
            setInstructionListNumber(instructionListNumber - 1);
            setTimeout(() => {
              setPrevinstructionListNumber(previnstructionListNumber - 1);
            }, 150);
            setPrevScrollY(currentScrollY);
          } else if (
            instructionListNumber === 0 &&
            !isItScrollingDown &&
            scrollY.current === currentScrollY
          ) {
            setInstructionListNumber(0);
            setTimeout(() => {
              setPrevinstructionListNumber(0);
            }, 100);
            setPrevScrollY(currentScrollY);
            setCurrentLi(currentLi - 1);
            setTimeout(() => {
              setPrevLi(prevLi - 1);
            }, 250);
            setPrevScrollY(currentScrollY);
          }
        } else if (currentLi === 4) {
          glucidesInAnimReverse();

          setPrevScrollY(currentScrollY);
        } else if (currentLi === 5) {
          setPrevScrollY(currentScrollY);
        } else if (currentLi === 6) {
          setPrevScrollY(currentScrollY);
          // switchOnAnim()
          // setCurrentLi(currentLi -1); setPrevLi(prevLi -1)
          // e.target.scrollTop = numberOfPixelsForEachStep * 6;
          // scrollY.current = numberOfPixelsForEachStep * 6;
          // currentScrollY = numberOfPixelsForEachStep * 6;
          // setTimeout(() => {

          //   setTimeout(() => {
          //     vitamineB12OutAnimReverse.methodeTessereau()
          //   }, 250) } , 200);
        }

        if (currentScrollY === 0) {
          setCurrentLi(0);
          setPrevLi(0);
          setPrevScrollY(currentScrollY);
        }
      }
    }, 50);
  };

  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */
  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */
  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */

  return (
    <div>
      <Fragment>
        <main className='backGroundOfRecipe'>
          {/*  HERE IS THE ROUND MENU AND NAV */
          /*  HERE IS THE ROUND MENU AND NAV */
          /*  HERE IS THE ROUND MENU AND NAV */
          /*  HERE IS THE ROUND MENU AND NAV */}

          <section
            id='sect1'
            style={{
              width: '100%',
              height: '3000%',
              overflow: 'hidden',
              scrollbarWidth: 'none',
            }}>
            <aside style={{ width: '100%', height: '100%' }}>
              <div className='roundMenu'>
                <div className='roundMenuBis'>
                  <div id='recipeIdImage'>
                    <div
                      style={{
                        backgroundImage: `url(${recipeId.recipeId.recipeImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                      id='recipeIdImage2'></div>
                  </div>

                  <svg
                    width='100%'
                    viewBox='0 0 1461 1461'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <g filter='url(#filter0_i_0_2)'>
                      <circle
                        cx='730.805'
                        cy='730.816'
                        r='720'
                        transform='rotate(86.4896 730.805 730.816)'
                        stroke='#F5FDFF'
                        strokeWidth='20'
                      />
                      <circle
                        strokeDashoffset={`${4800 - currentLi * 225}`}
                        id='circleProgress'
                        cx='730.805'
                        cy='730.816'
                        r='720'
                        transform='rotate(-95 730.805 730.816)'
                        strokeWidth='20'
                      />
                      <linearGradient
                        id='superGradient'
                        x1='1519.27'
                        y1='662.346'
                        x2='-95.9766'
                        y2='699.961'
                        gradientUnits='userSpaceOnUse'>
                        <stop
                          offset='0'
                          stopColor='#71A8FA'
                          stopOpacity='0.4'
                        />
                        <stop
                          offset='0.956889'
                          stopColor='#E74A82'
                          stopOpacity='0.20'
                        />
                      </linearGradient>
                    </g>
                    <g filter='url(#filter1_i_0_1)'></g>
                    <defs>
                      <filter
                        id='filter0_i_0_2'
                        x='0.78125'
                        y='0.792969'
                        width='1460.05'
                        height='1464.05'
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
                        <feComposite
                          in2='hardAlpha'
                          operator='arithmetic'
                          k2='-1'
                          k3='1'
                        />
                        <feColorMatrix
                          type='matrix'
                          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                        />
                        <feBlend
                          mode='normal'
                          in2='shape'
                          result='effect1_innerShadow_0_1'
                        />
                      </filter>
                      <filter
                        id='filter1_i_0_1'
                        x='794.324'
                        y='4.44141'
                        width='413.699'
                        height='189.383'
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
                        <feComposite
                          in2='hardAlpha'
                          operator='arithmetic'
                          k2='-1'
                          k3='1'
                        />
                        <feColorMatrix
                          type='matrix'
                          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                        />
                        <feBlend
                          mode='normal'
                          in2='shape'
                          result='effect1_innerShadow_0_1'
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
              <nav>
                <div
                  // onClick={(e) => setCurrentLi(currentLi - 1)}
                  style={{
                    fontSize: 'max(1.2vw,10px)',
                    position: 'absolute',
                    color: 'black',
                    textShadow: '0px 5px 5px rgba(69, 68, 86, 0.3)',
                    opacity: currentLi === 0 ? '0' : '1',
                    transition: 'linear 0.2s',
                    left: '100%',
                    transform:
                      currentLi > 0
                        ? 'translateX(-50%) translateY(-350%)'
                        : 'translateX(-50%) translateY(-200%)',
                  }}>
                  {' '}
                  &#9650;
                </div>
                <ul>
                  {ArrayForNav.map((index, i) => {
                    return (
                      <li
                        key={index}
                        className={
                          (index === ArrayForNav[currentLi - 1]
                            ? 'liIndexPrevious'
                            : '') +
                          (index === ArrayForNav[currentLi - 2]
                            ? 'liIndexNotDisplayedTop'
                            : '') +
                          (index === ArrayForNav[currentLi + 1]
                            ? 'liIndexNext'
                            : '') +
                          (index === ArrayForNav[currentLi + 2]
                            ? 'liIndexNotDisplayedDown'
                            : '') +
                          (index === ArrayForNav[currentLi]
                            ? 'liIndexCurrent'
                            : '') +
                          (i > currentLi + 2 || i < currentLi - 2
                            ? 'liIndexNotDisplayed'
                            : '')
                        }>
                        {index}
                      </li>
                    );
                  })}
                </ul>
                <div
                  // onClick={(e) => setCurrentLi(currentLi + 1)}
                  style={{
                    fontSize: 'max(1.2vw,10px)',
                    position: 'absolute',
                    opacity: currentLi === 10 ? '0' : '1',
                    color: 'black',
                    textShadow: '0px -5px 5px rgba(69, 68, 86, 0.2)',
                    transition: 'linear 0.2s',

                    left: '100%',
                    transform:
                      currentLi === 10
                        ? 'translateX(-50%) translateY(350%)'
                        : 'translateX(-50%) translateY(500%)',
                  }}>
                  {' '}
                  &#9660;
                </div>
              </nav>
            </aside>
          </section>

          {/* HERE IS THE FIRST MENU SLIDE  */
          /* HERE IS THE FIRST MENU SLIDE  */
          /* HERE IS THE FIRST MENU SLIDE  */
          /* HERE IS THE FIRST MENU SLIDE  */}

          <section
            style={{
              transition:
                currentLi > prevLi
                  ? '0.3s cubic-bezier(0.745, 0.045, 0.355, 1)'
                  : '',
              opacity: currentLi > 0 ? '0' : '',
              transform:
                currentLi > 0
                  ? 'scale(0) translateX(50%) translateY(-100%)'
                  : '',
              // top: currentLi > 0 ? '15%' : '',
              // right: currentLi > 0 ? '0%' : '',
            }}
            id='intro'>
            <header>
              <h2 className={recipeId.recipeId.recipeTitle} id='testH2'>
                {recipeId.recipeId.recipeTitle}
              </h2>
              <h3>
                {recipeId.recipeId.recipeDiet === `GenericDiet`
                  ? '(Diète Générique)'
                  : '' || recipeId.recipeId.recipeDiet === `FreeDiet`
                  ? '(Diète Libre)'
                  : '' || recipeId.recipeId.recipeDiet === `BodyArchitectDiet`
                  ? '(Diète Body Architect)'
                  : '' || recipeId.recipeId.recipeDiet === `KetoDiet`
                  ? '(Diète Cétogène)'
                  : ''}
              </h3>
            </header>
            <div className='introInfosRecipeValues'>
              <h2>
                {Math.round(recipeId.recipeId.totalGrammes * coefForRecipe)}G
              </h2>
              <div className='bar'></div>
              <h2>
                {Math.round(recipeId.recipeId.totalKcal * coefForRecipe)}Kcal
              </h2>
            </div>

            <div className='introInfosRecipe'>
              <div className='introInfosRecipeLevel'>
                <img
                  id='introInfosRecipeLevelImg'
                  src={svgHat}
                  alt='introInfosRecipeLevelImg'
                />
                <img
                  style={{ width: '75%', marginBottom: '15%' }}
                  src={
                    recipeId.recipeId.recipeLevel === 'easyLevel'
                      ? `${svgOneStar}`
                      : recipeId.recipeId.recipeLevel ||
                        recipeId.recipeId.recipeLevel === 'mediumLevel'
                      ? `${svgTwoStars}`
                      : recipeId.recipeId.recipeLevel ||
                        recipeId.recipeId.recipeLevel === 'expertLevel'
                      ? `${svgThreeStars}`
                      : recipeId.recipeId.recipeLevel
                  }
                  alt='level'></img>
              </div>
              <div className='introInfosRecipeHeatTime'>
                <img
                  id='introInfosRecipeHeatTimeImg'
                  src={svgHeat}
                  alt='introInfosRecipeLevelImg'
                />
                <h3>{recipeId.recipeId.recipeHeatingTime} min</h3>
              </div>
              <div className='introInfosRecipeCookingTime'>
                <img
                  id='introInfosRecipeCookingTimeImg'
                  src={svgSandTime}
                  alt='introInfosRecipeCookingTimeImg'
                />
                <h3>{recipeId.recipeId.recipeCookingTime} min</h3>
              </div>
              <div className='introInfosRecipeMoney'>
                <img
                  id='introInfosRecipeMoneyImg'
                  src={svgMoney}
                  alt='introInfosRecipeMoneyImg'
                />
                <img
                  style={{ width: '75%', marginBottom: '15%' }}
                  src={
                    recipeId.recipeId.recipePrice === 'economic'
                      ? `${svgOneEuro}`
                      : recipeId.recipeId.recipePrice ||
                        recipeId.recipeId.recipePrice === 'affordable'
                      ? `${svgTwoEuros}`
                      : recipeId.recipeId.recipePrice ||
                        recipeId.recipeId.recipePrice === 'consequent'
                      ? `${svgThreeEuros}`
                      : recipeId.recipeId.recipePrice
                  }
                  alt='money'></img>
              </div>
            </div>
          </section>

          {/* HERE IS THE SECOND MENU SLIDE  */
          /* HERE IS THE SECOND MENU SLIDE  */
          /* HERE IS THE SECOND MENU SLIDE  */
          /* HERE IS THE SECOND MENU SLIDE  */}
          {arrayList.length !== 0
            ? arrayList.map((IngredientPage, i) => {
                return (
                  <section
                    key={i++}
                    id={i++}
                    style={{
                      animation:
                        currentLi === 1 &&
                        ingredientListNumber === previngredientListNumber
                          ? 'entranceIngredientsList 1.1s'
                          : '',
                      opacity:
                        ingredientListNumber === previngredientListNumber
                          ? '1'
                          : '0',
                    }}
                    className='ingredientsList'>
                    <div
                      style={{
                        position: 'absolute',
                        top: '-5vh',
                        transition: '0.3s cubic-bezier(0.745, 0.045, 0.355, 1)',
                        fontFamily: 'GeomanistExtraLight',

                        opacity: currentLi === 1 ? '1' : '0',
                      }}>
                      {' '}
                      Liste {ingredientListNumber + 1} / {arrayList.length}
                    </div>
                    {arrayList[ingredientListNumber].map((ingredient, i) => {
                      return (
                        <div
                          key={i++}
                          style={{
                            transform:
                              currentLi !== 1
                                ? ' scale(0) translateY(100%)'
                                : '',
                          }}
                          className='ingredientOnlist'>
                          <div className='ingredientOnlistName'>
                            {ingredient.name}
                          </div>
                          <div className='ingredientOnlistQuantities'>
                            <div>
                              {(ingredient.quantity * coefForRecipe).toFixed(1)}{' '}
                              G
                            </div>
                            <div className='bar'></div>
                            <div>
                              {(
                                (ingredient.quantity /
                                  recipeId.recipeId.totalGrammes) *
                                100
                              ).toFixed(1)}{' '}
                              %
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </section>
                );
              })
            : ''}

          {/* HERE IS THE THIRD MENU SLIDE  */}

          {/* HERE IS THE THIRD MENU SLIDE  */}

          {/* HERE IS THE THIRD MENU SLIDE  */}

          {/* HERE IS THE THIRD MENU SLIDE  */}

          <section
            style={{
              display: currentLi === 2 ? '' : 'none',
            }}
            id='allergenList'>
            <header>
              {' '}
              <h2>Allergènes Présents: {numberOfAllergens}</h2>
            </header>
            <div className='allergenGrid'>
              <div
                style={{
                  animation: recipeId.recipeId.peanuts
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.peanuts ? '1' : '',

                  transform:
                    recipeId.recipeId.peanuts && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}
                className='allergenUnit'>
                <Peanuts />

                <h2>ARACHIDES</h2>
              </div>
              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.milk
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.milk ? '1' : '',

                  transform:
                    recipeId.recipeId.milk && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Milk currently={currentLi} />

                <h2>LACTOSE</h2>
              </div>
              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.nuts
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.nuts ? '1' : '',

                  transform:
                    recipeId.recipeId.nuts && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Nuts />

                <h2>FRUITS A COQUE</h2>
              </div>
              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.soja
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.soja ? '1' : '',

                  transform:
                    recipeId.recipeId.soja && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Soy />

                <h2>SOJA</h2>
              </div>

              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.mustard
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.mustard ? '1' : '',

                  transform:
                    recipeId.recipeId.mustard && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Mustard />

                <h2>MOUTARDE</h2>
              </div>
              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.gluten
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.gluten ? '1' : '',

                  transform:
                    recipeId.recipeId.gluten && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Gluten />

                <h2>GLUTEN</h2>
              </div>
              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.shellfish
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.shellfish ? '1' : '',

                  transform:
                    recipeId.recipeId.nushellfishts && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Crustaceans />

                <h2>CRUSTACÉS</h2>
              </div>
              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.eggs
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.eggs ? '1' : '',

                  transform:
                    recipeId.recipeId.eggs && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Eggs />

                <h2>OEUFS</h2>
              </div>
              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.mollusks
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.mollusks ? '1' : '',

                  transform:
                    recipeId.recipeId.mollusks && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Molluscs />

                <h2>MOLLUSQUES</h2>
              </div>

              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.sulphites
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.sulphites ? '1' : '',

                  transform:
                    recipeId.recipeId.sulphites && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Sulfites />

                <h2>SULPHITES</h2>
              </div>
              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.sesameSeeds
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.sesameSeeds ? '1' : '',

                  transform:
                    recipeId.recipeId.sesameSeeds && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Sesame />

                <h2>SÉSAME</h2>
              </div>
              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.celery
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.celery ? '1' : '',

                  transform:
                    recipeId.recipeId.celery && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Celery />

                <h2>CÉLERI</h2>
              </div>
              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.lupine
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.lupine ? '1' : '',

                  transform:
                    recipeId.recipeId.lupine && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Lupin />
                <h2>LUPIN</h2>
              </div>
              <div
                className='allergenUnit'
                style={{
                  animation: recipeId.recipeId.fish
                    ? '2s allergenUnitAnimActive cubic-bezier(0.19, 1, 0.22, 1.1)'
                    : '',
                  opacity: recipeId.recipeId.fish ? '1' : '',

                  transform:
                    recipeId.recipeId.fish && currentLi === 2
                      ? '  translateY(-25%)'
                      : '',
                }}>
                <Fish />

                <h2>POISSON</h2>
              </div>
            </div>
          </section>

          {/* HERE IS THE 4TH MENU SLIDE  */}

          {/* HERE IS THE 4TH MENU SLIDE  */}

          {/* HERE IS THE 4TH MENU SLIDE  */}

          {/* HERE IS THE 4TH MENU SLIDE  */}

          {recipeId.recipeId.recipeInstructions.length !== 0
            ? recipeId.recipeId.recipeInstructions.map((step, i) => {
                return (
                  <section
                    className='instructions'
                    key={i++}
                    style={{
                      transition: currentLi > 3 ? '0s ' : '',
                      animation:
                        currentLi === 3 &&
                        instructionListNumber === previnstructionListNumber &&
                        instructionListNumber === i
                          ? 'entranceInstructionsList 1s'
                          : '',
                      opacity:
                        currentLi === 3 && instructionListNumber === i
                          ? '1'
                          : '',
                    }}>
                    <article>
                      {' '}
                      <h2>
                        - Étape {i + 1}/
                        {recipeId.recipeId.recipeInstructions.length}
                      </h2>
                      <p>{step}</p>
                    </article>
                  </section>
                );
              })
            : ''}

          <section
            className='slideBox'
            style={{
              opacity: currentLi > 3 ? '1' : '0',
            }}>
            <Slide />
            <aside>
              <svg
                id='svgSlide'
                height='100%'
                viewBox={`0 0 ${1114 * backGroundHeight.current} ${
                  1914 * backGroundHeight.current
                }`}
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <g>
                  <path
                    id='slidePath'
                    d={`m ${1109.77 * backGroundHeight.current}${
                      9.7207 * backGroundHeight.current
                    } v 0 c -${376.9 * backGroundHeight.current} ${
                      172.1773 * backGroundHeight.current
                    } -${692.561 * backGroundHeight.current} ${
                      462.1073 * backGroundHeight.current
                    } -${893.934 * backGroundHeight.current} ${
                      824.2543 * backGroundHeight.current
                    } v 0 l -${9.048 * backGroundHeight.current} ${
                      17.488 * backGroundHeight.current
                    } c -${168.7149 * backGroundHeight.current} ${
                      326.117 * backGroundHeight.current
                    } -${230.9713 * backGroundHeight.current} ${
                      696.917 * backGroundHeight.current
                    } -${178.0144 * backGroundHeight.current} ${
                      1060.257 * backGroundHeight.current
                    } v 0`}
                    stroke='#F5FDFF'
                    strokeWidth={18 * backGroundHeight.current}
                  />
                </g>
              </svg>

              <div
                className='glucidesInfos'
                style={{
                  opacity: '0',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Glucides
                </h2>
                <ProgressEllipseGlucides />

                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(recipeId.recipeId.totalCarbs * coefForRecipe).toFixed(
                          1
                        )}{' '}
                        g
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((recipeId.recipeId.totalCarbs * coefForRecipe) /
                            nutritionalProfil.glucidesG) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='proteinesInfos'
                style={{
                  opacity: '0',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Protéines
                </h2>
                <ProgressEllipseProteines />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(
                          recipeId.recipeId.totalProtein * coefForRecipe
                        ).toFixed(1)}{' '}
                        g
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((recipeId.recipeId.totalProtein * coefForRecipe) /
                            nutritionalProfil.proteinesG) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='lipidesInfos'
                style={{
                  opacity: '0',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Lipides
                </h2>
                <ProgressEllipseLipides />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(recipeId.recipeId.totalFat * coefForRecipe).toFixed(
                          1
                        )}{' '}
                        g
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((recipeId.recipeId.totalFat * coefForRecipe) /
                            nutritionalProfil.lipidesG) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='retinolInfos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  className='h2VitA'
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine A
                </h2>
                <ProgressEllipseRetinol />
                <div className='centerOfNutrimentCircle'>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(totalRetinolµg.current * coefForRecipe).toFixed(1)} µg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((totalRetinolµg.current * coefForRecipe) /
                            nutritionalProfil.retinolµg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='betaCaroteneInfos'
                style={{
                  opacity: '0',
                  display: 'none',
                  transform: ` translate(0,0) , rotate(${transformRotate})`,
                }}>
                <h2
                  className='h2ProVitA'
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Pro-Vitamine A
                </h2>
                <ProgressEllipseBetaCarotene />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(betaCaroteneµg.current * coefForRecipe).toFixed(1)} µg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((betaCaroteneµg.current * coefForRecipe) /
                            nutritionalProfil.betaCaroteneµg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='vitamineDInfos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine D
                </h2>
                <ProgressEllipseVitamineD />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(vitamineDµg.current * coefForRecipe).toFixed(1)} µg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((vitamineDµg.current * coefForRecipe) /
                            nutritionalProfil.vitamineDµg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='vitamineEInfos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine E
                </h2>
                <ProgressEllipseVitamineE />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(vitamineEmg.current * coefForRecipe).toFixed(1)} mg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((vitamineEmg.current * coefForRecipe) /
                            nutritionalProfil.vitamineEmg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='vitamineK1Infos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine K1
                </h2>
                <ProgressEllipseVitamineK1 />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(vitamineK1µg.current * coefForRecipe).toFixed(1)} µg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((vitamineK1µg.current * coefForRecipe) /
                            nutritionalProfil.vitamineK1µg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>

              <div
                className='vitamineK2Infos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine K2
                </h2>
                <ProgressEllipseVitamineK2 />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(vitamineK2µg.current * coefForRecipe).toFixed(1)} µg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((vitamineK2µg.current * coefForRecipe) /
                            nutritionalProfil.vitamineK2µg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='vitamineCInfos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  className='h2VitamineC'
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine C
                </h2>
                <ProgressEllipseVitamineC />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(vitamineCmg.current * coefForRecipe).toFixed(1)} mg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((vitamineCmg.current * coefForRecipe) /
                            nutritionalProfil.vitamineCmg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='vitamineB1Infos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  className='h2vitamineB1'
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine B1
                </h2>
                <ProgressEllipseVitamineB1 />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(vitamineB1ThiamineMg.current * coefForRecipe).toFixed(
                          1
                        )}{' '}
                        mg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((vitamineB1ThiamineMg.current * coefForRecipe) /
                            nutritionalProfil.vitamineB1ThiamineMg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='vitamineB2Infos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  className='h2VitamineB2'
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine B2
                </h2>
                <ProgressEllipseVitamineB2 />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(
                          vitamineB2RiboflavineMg.current * coefForRecipe
                        ).toFixed(1)}{' '}
                        mg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((vitamineB2RiboflavineMg.current * coefForRecipe) /
                            nutritionalProfil.vitamineB2RiboflavineMg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='vitamineB3PpInfos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  className='h2VitamineB3Pp'
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine B3PP
                </h2>
                <ProgressEllipseVitamineB3Pp />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(
                          vitamineB3PpNiacineMg.current * coefForRecipe
                        ).toFixed(1)}{' '}
                        mg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((vitamineB3PpNiacineMg.current * coefForRecipe) /
                            nutritionalProfil.vitamineB3PpNiacineMg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='vitamineB5Infos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  className='h2VitamineB5'
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine B5
                </h2>
                <ProgressEllipseVitamineB5 />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(
                          vitamineB5AcidePantotheniqueMg.current * coefForRecipe
                        ).toFixed(1)}{' '}
                        mg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((vitamineB5AcidePantotheniqueMg.current *
                            coefForRecipe) /
                            nutritionalProfil.vitamineB5AcidePantotheniqueMg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='vitamineB6Infos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine B6
                </h2>
                <ProgressEllipseVitamineB6 />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(vitamineB6Mg.current * coefForRecipe).toFixed(1)} mg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((vitamineB6Mg.current * coefForRecipe) /
                            nutritionalProfil.vitamineB6Mg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='vitamineB9Infos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  className='h2VitamineB9'
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine B9
                </h2>
                <ProgressEllipseVitamineB9 />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(
                          vitamineB9FolatesTotauxµg.current * coefForRecipe
                        ).toFixed(1)}{' '}
                        µg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((vitamineB9FolatesTotauxµg.current * coefForRecipe) /
                            nutritionalProfil.vitamineB9FolatesTotauxµg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='vitamineB12Infos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Vitamine B12
                </h2>
                <ProgressEllipseVitamineB12 />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(vitamineB12µg.current * coefForRecipe).toFixed(1)} µg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((vitamineB12µg.current * coefForRecipe) /
                            nutritionalProfil.vitamineB12µg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>

              {/* HERE ARE ALL MINERALS */}

              <div
                className='selChlorureDeSodiumInfos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  className='h2SelChlorureDeSodium'
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Chlorure De Sodium
                </h2>
                <ProgressEllipseSelChlorureDeSodium />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(selChlorureDeSodiumG.current * coefForRecipe).toFixed(
                          1
                        )}{' '}
                        Mg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((selChlorureDeSodiumG.current * coefForRecipe) /
                            nutritionalProfil.selChlorureDeSodiumG) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='calciumInfos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Calcium
                </h2>
                <ProgressEllipseCalcium />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(calciumMg.current * coefForRecipe).toFixed(1)} Mg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((calciumMg.current * coefForRecipe) /
                            nutritionalProfil.calciumMg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='chlorureInfos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Chlorure
                </h2>
                <ProgressEllipseChlorure />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(chlorureMg.current * coefForRecipe).toFixed(1)} Mg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((chlorureMg.current * coefForRecipe) /
                            nutritionalProfil.chlorureMg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='cuivreInfos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Cuivre
                </h2>
                <ProgressEllipseCuivre />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>
                        {(cuivreMg.current * coefForRecipe).toFixed(1)} Mg
                      </h3>
                      <div></div>
                      <h3>
                        {(
                          ((cuivreMg.current * coefForRecipe) /
                            nutritionalProfil.cuivreMg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='ferInfos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Fer
                </h2>
                <ProgressEllipseFer />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>{(ferMg.current * coefForRecipe).toFixed(1)} Mg</h3>
                      <div></div>
                      <h3>
                        {(
                          ((ferMg.current * coefForRecipe) /
                            nutritionalProfil.ferMg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
              <div
                className='iodeInfos'
                style={{
                  opacity: '0',
                  display: 'none',
                }}>
                <h2
                  style={{
                    opacity: scrollForAnim ? '0' : '1',
                  }}>
                  Iode
                </h2>
                <ProgressEllipseIode />
                <div>
                  {scrollForAnim ? (
                    ''
                  ) : (
                    <Fragment>
                      <h3>{(iodeµg.current * coefForRecipe).toFixed(1)} µg</h3>
                      <div></div>
                      <h3>
                        {(
                          ((iodeµg.current * coefForRecipe) /
                            nutritionalProfil.iodeµg) *
                          100
                        ).toFixed(1)}{' '}
                        %*
                      </h3>{' '}
                    </Fragment>
                  )}
                </div>
              </div>
            </aside>
          </section>

          <div
            onScroll={
              (currentLi >= 4 && scrollForAnim) ||
              prevLi !== currentLi ||
              instructionListNumber !== previnstructionListNumber ||
              ingredientListNumber !== previngredientListNumber
                ? null
                : onScroll
            }
            className='toMakeScrollableEveryWhereBody'>
            <div className='toMakeScrollableEveryWhereFalseContent'></div>
          </div>
        </main>
      </Fragment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipeId: state.allRecipes,
});

export default connect(mapStateToProps, {
  getRecipeByID,
})(Recipe);
