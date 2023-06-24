/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './recipeStudio.css';
import { connect } from 'react-redux';
import recetteStudioImg from '../../../assets/img/recipeStudiokWhiteFinal.png';
import EggRightSvg from './EggRightSvg.jsx';
import EggLeftSvg from './EggLeftSvg.jsx';
import EggCenterSvg from './EggCenterSvg';
import Nav from '../../GlobalComponents/navigation/Nav';
import { alertPopup } from '../../../assets/fonctions/alertPopup.js';

import {
  getAliment,
  getAlimentByID,
  getAlimentList,
} from '../../../redux/actions/aliments';
import {
  getRecipe,
  createRecipe,
  getRecipeActive,
} from '../../../redux/actions/recipes';

const RecipeStudio = ({
  getAliment,
  getAlimentByID,
  aliments: { aliments },
  alimentId,
  listToRecipeStudio,
  createRecipe,
  isAuthenticated,
}) => {
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                       __________________________ */
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                       __________________________ */
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                       __________________________ */

  const [alimentName, setAlimentName] = useState('xxx');
  const [name, setName] = useState('');
  const [searchType, setSearchType] = useState(true);
  const [limitPerPage] = useState(100);
  const [saveFilters] = useState([]);
  const [currentPage] = useState(1);
  const [AlimentToStudy, setAlimentToStudy] = useState([]);
  const [alimentID, setAlimentID] = useState('');
  const [jokerAlwaysWorks, setJokerAlwaysWorks] = useState(true);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [count, setCount] = useState(0);
  const [countOfToggleList, setCountOfToggleList] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalGrammes, setTotalGrammes] = useState(0);
  const [totalKcal, setTotalKcal] = useState(0);
  const [searchAlimentOnRecipeStudioOpen, setSearchAlimentOnRecipeStudioOpen] =
    useState(false);
  const [proportionAlimentOpen, setProportionAlimentOpen] = useState(false);

  const [recipeDetailsOpen, setRecipeDetailsOpen] = useState(false);
  const [displayEggsSvg, setDisplayEggsSvg] = useState(true);
  const [messageModal, setMessageModal] = useState('');
  const [formRecipe, setFormRecipe] = useState({ recipeTitle: '' });
  const [instructions, setInstructions] = useState(['']);
  const [lastDeleted, setLastDeleted] = useState('');
  const [recipeImg, setRecipeImg] = useState({ recipeImage: '' });
  const [dietChosen, setDietChosen] = useState('');
  const [goToRecipe, setGoToRecipe] = useState();
  const [recipeDiet, setRecipeDiet] = useState([
    { diet: { protein: false, glucides: false, lipides: false } },
  ]);
  const [visibility, setVisibility] = useState(true);
  const hideFor3dOpening = () => {
    setVisibility(!visibility);
  };

  let browserName = useRef;
  let userAgent = navigator.userAgent;

  // LOAD LISTENER //   // LOAD LISTENER //   // LOAD LISTENER //
  useEffect(() => {
    const callback = () => {
      localStorage.removeItem('goToRecipeBook');
      if (userAgent.match(/chrome|chromium|crios/i)) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        browserName.current = 'chrome';
      } else if (userAgent.match(/firefox|fxios/i)) {
        browserName.current = 'firefox';
      } else if (userAgent.match(/safari/i)) {
        browserName.current = 'safari';
      } else if (userAgent.match(/opr\//i)) {
        browserName.current = 'opera';
      } else if (userAgent.match(/edg/i)) {
        browserName.current = 'edge';
      } else {
        browserName.current = 'No browser detection';
      }
    };
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  }, []);

  useEffect(() => {
    window.onclick = function () {
      setGoToRecipe(localStorage.getItem('goToRecipeBook') === 'true');
    };
  }, []);

  useEffect(() => {
    let tab = 'Asc';
    let nutrimentSelected = 'alimNom';
    let limitPerPage = 25;

    getAliment(
      alimentName,
      tab,
      nutrimentSelected,
      currentPage,
      limitPerPage,
      saveFilters
    );
  }, [currentPage, limitPerPage, alimentName]);

  useEffect(() => {
    getAlimentByID(alimentID);
  }, [alimentID]);
  useEffect(() => {
    getAlimentByID(alimentID);
  }, [alimentID]);

  const handleInputSearchOnChange = (e) => {
    e.preventDefault();
    if (e.target.value === '') {
      return setAlimentName('xxx');
    }
    setAlimentName(e.target.value);
  };
  const toggleSearch = () => {
    setSearchType(!searchType);
  };
  const setIdAndName = (id, name) => {
    setName(name);
    setAlimentID(id);
  };

  const toggleAlimentList = () => {
    let modalSuccesOfAliment = document.querySelector('.modalSucces');

    let checkIfAlreadyExist = AlimentToStudy.find(
      (alim) =>
        alim.id === alimentId.alimentId._id ||
        alim.id === '645af4728b39170ce0740a85'
    );
    let newList = AlimentToStudy.filter(
      (alim) => alim.id !== alimentId.alimentId._id
    );

    if (checkIfAlreadyExist !== undefined) {
      setMessageModal(`${name} Est déjà dans votre Liste`);
    } else {
      setMessageModal(`${name} Ajouté Avec Succès !`);
      setAlimentToStudy([
        ...newList,
        {
          name: alimentId.alimentId.alimNom,
          id: alimentId.alimentId._id,
          glucidesG: Number(alimentId.alimentId.glucidesG),
          initialGlucides: Number(alimentId.alimentId.glucidesG),
          proteinesG: Number(alimentId.alimentId.proteinesG),
          initialProteines: Number(alimentId.alimentId.proteinesG),
          lipidesG: Number(alimentId.alimentId.lipidesG),
          initialLipides: Number(alimentId.alimentId.lipidesG),
          eauG: Number(alimentId.alimentId.eauG),
          initialEau: Number(alimentId.alimentId.eauG),
          sucresG: Number(alimentId.alimentId.sucresG),
          initialSucre: Number(alimentId.alimentId.sucresG),
          fructoseG: Number(alimentId.alimentId.fructoseG),
          initialFructose: Number(alimentId.alimentId.fructoseG),
          galactoseG: Number(alimentId.alimentId.galactoseG),
          initialGalactose: Number(alimentId.alimentId.galactoseG),
          glucoseG: Number(alimentId.alimentId.glucoseG),
          initialGlucose: Number(alimentId.alimentId.glucoseG),
          lactoseG: Number(alimentId.alimentId.lactoseG),
          initialLactose: Number(alimentId.alimentId.lactoseG),
          maltoseG: Number(alimentId.alimentId.maltoseG),
          initialMaltose: Number(alimentId.alimentId.maltoseG),
          saccharoseG: Number(alimentId.alimentId.saccharoseG),
          initialSaccharose: Number(alimentId.alimentId.saccharoseG),
          amidonG: Number(alimentId.alimentId.amidonG),
          initialAmidon: Number(alimentId.alimentId.amidonG),
          fibresAlimentairesG: Number(alimentId.alimentId.fibresAlimentairesG),
          initialFibresAlimentaires: Number(
            alimentId.alimentId.fibresAlimentairesG
          ),
          polyolsTotauxG: Number(alimentId.alimentId.polyolsTotauxG),
          initialPolyolsTotaux: Number(alimentId.alimentId.polyolsTotauxG),
          alcoolG: Number(alimentId.alimentId.alcoolG),
          initialAlcool: Number(alimentId.alimentId.alcoolG),
          acidesOrganiquesG: Number(alimentId.alimentId.acidesOrganiquesG),
          initialAcidesOrganiques: Number(
            alimentId.alimentId.acidesOrganiquesG
          ),
          agSaturesG: Number(alimentId.alimentId.agSaturesG),
          initialAgSatures: Number(alimentId.alimentId.agSaturesG),
          agMonoinsaturésG: Number(alimentId.alimentId.agMonoinsaturésG),
          initialAgMonoinsatures: Number(alimentId.alimentId.agMonoinsaturésG),
          agPolyinsaturésG: Number(alimentId.alimentId.agPolyinsaturésG),
          initialAgPolyinsatures: Number(alimentId.alimentId.agPolyinsaturésG),
          agButyriqueG: Number(alimentId.alimentId.agButyriqueG),
          initialAgButyrique: Number(alimentId.alimentId.agButyriqueG),
          agCaproiqueG: Number(alimentId.alimentId.agCaproiqueG),
          initialAgCaproique: Number(alimentId.alimentId.agCaproiqueG),
          agCapryliqueG: Number(alimentId.alimentId.agCapryliqueG),
          initialAgCaprylique: Number(alimentId.alimentId.agCapryliqueG),
          agCapriqueG: Number(alimentId.alimentId.agCapriqueG),
          initialAgCaprique: Number(alimentId.alimentId.agCapriqueG),
          agLauriqueG: Number(alimentId.alimentId.agLauriqueG),
          initialAgLaurique: Number(alimentId.alimentId.agLauriqueG),
          agMyristiqueG: Number(alimentId.alimentId.agMyristiqueG),
          initialAgMyristique: Number(alimentId.alimentId.agMyristiqueG),
          agPalmitiqueG: Number(alimentId.alimentId.agPalmitiqueG),
          initialAgPalmitique: Number(alimentId.alimentId.agPalmitiqueG),
          agSteariqueG: Number(alimentId.alimentId.agSteariqueG),
          initialAgStearique: Number(alimentId.alimentId.agSteariqueG),
          agOleiqueG: Number(alimentId.alimentId.agOleiqueG),
          initialAgOleique: Number(alimentId.alimentId.agOleiqueG),
          agLinoleiqueG: Number(alimentId.alimentId.agLinoleiqueG),
          initialAgLinoleique: Number(alimentId.alimentId.agLinoleiqueG),
          agAlphalinoleniqueG: Number(alimentId.alimentId.agAlphalinoleniqueG),
          initialAgAlphalinolenique: Number(
            alimentId.alimentId.agAlphalinoleniqueG
          ),
          agArachidoniqueG: Number(alimentId.alimentId.agArachidoniqueG),
          initialAgArachidonique: Number(alimentId.alimentId.agArachidoniqueG),
          agEpaG: Number(alimentId.alimentId.agEpaG),
          initialAgEpa: Number(alimentId.alimentId.agEpaG),
          agDhaG: Number(alimentId.alimentId.agDhaG),
          initialAgDha: Number(alimentId.alimentId.agDhaG),
          cholesterolMg: Number(alimentId.alimentId.cholesterolMg),
          initialCholesterol: Number(alimentId.alimentId.cholesterolMg),
          selChlorureDeSodiumG: Number(
            alimentId.alimentId.selChlorureDeSodiumG
          ),
          initialSelChlorureDeSodium: Number(
            alimentId.alimentId.selChlorureDeSodiumG
          ),
          calciumMg: Number(alimentId.alimentId.calciumMg),
          initialCalcium: Number(alimentId.alimentId.calciumMg),
          chlorureMg: Number(alimentId.alimentId.chlorureMg),
          initialChlorure: Number(alimentId.alimentId.chlorureMg),
          cuivreMg: Number(alimentId.alimentId.cuivreMg),
          initialCuivre: Number(alimentId.alimentId.cuivreMg),
          ferMg: Number(alimentId.alimentId.ferMg),
          initialFer: Number(alimentId.alimentId.ferMg),
          iodeµg: Number(alimentId.alimentId.iodeµg),
          initialIode: Number(alimentId.alimentId.iodeµg),
          magnesiumMg: Number(alimentId.alimentId.magnesiumMg),
          initialMagnesium: Number(alimentId.alimentId.magnesiumMg),
          manganeseMg: Number(alimentId.alimentId.manganeseMg),
          initialManganese: Number(alimentId.alimentId.manganeseMg),
          phosphoreMg: Number(alimentId.alimentId.phosphoreMg),
          initialPhosphore: Number(alimentId.alimentId.phosphoreMg),
          potassiumMg: Number(alimentId.alimentId.potassiumMg),
          initialPotassium: Number(alimentId.alimentId.potassiumMg),
          seleniumµg: Number(alimentId.alimentId.seleniumµg),
          initialSelenium: Number(alimentId.alimentId.seleniumµg),
          sodiumMg: Number(alimentId.alimentId.sodiumMg),
          initialSodium: Number(alimentId.alimentId.sodiumMg),
          zincMg: Number(alimentId.alimentId.zincMg),
          initialZinc: Number(alimentId.alimentId.zincMg),
          retinolµg: Number(alimentId.alimentId.retinolµg),
          initialRetinol: Number(alimentId.alimentId.retinolµg),
          betaCaroteneµg: Number(alimentId.alimentId.betaCaroteneµg),
          initialBetaCarotene: Number(alimentId.alimentId.betaCaroteneµg),
          vitamineDµg: Number(alimentId.alimentId.vitamineDµg),
          initialVitamineD: Number(alimentId.alimentId.vitamineDµg),
          vitamineEmg: Number(alimentId.alimentId.vitamineEmg),
          initialVitamineE: Number(alimentId.alimentId.vitamineEmg),
          vitamineK1µg: Number(alimentId.alimentId.vitamineK1µg),
          initialVitamineK1: Number(alimentId.alimentId.vitamineK1µg),
          vitamineK2µg: Number(alimentId.alimentId.vitamineK2µg),
          initialVitamineK2: Number(alimentId.alimentId.vitamineK2µg),
          vitamineCmg: Number(alimentId.alimentId.vitamineCmg),
          initialVitamineC: Number(alimentId.alimentId.vitamineCmg),
          vitamineB1ThiamineMg: Number(
            alimentId.alimentId.vitamineB1ThiamineMg
          ),
          initialVitamineB1Thiamine: Number(
            alimentId.alimentId.vitamineB1ThiamineMg
          ),
          vitamineB2RiboflavineMg: Number(
            alimentId.alimentId.vitamineB2RiboflavineMg
          ),
          initialVitamineB2Riboflavine: Number(
            alimentId.alimentId.vitamineB2RiboflavineMg
          ),
          vitamineB3PpNiacineMg: Number(
            alimentId.alimentId.vitamineB3PpNiacineMg
          ),
          initialVitamineB3PpNiacine: Number(
            alimentId.alimentId.vitamineB3PpNiacineMg
          ),
          vitamineB5AcidePantotheniqueMg: Number(
            alimentId.alimentId.vitamineB5AcidePantotheniqueMg
          ),
          initialVitamineB5AcidePantothenique: Number(
            alimentId.alimentId.vitamineB5AcidePantotheniqueMg
          ),
          vitamineB6Mg: Number(alimentId.alimentId.vitamineB6Mg),
          initialVitamineB6: Number(alimentId.alimentId.vitamineB6Mg),
          vitamineB9FolatesTotauxµg: Number(
            alimentId.alimentId.vitamineB9FolatesTotauxµg
          ),
          initialVitamineB9FolatesTotaux: Number(
            alimentId.alimentId.vitamineB9FolatesTotauxµg
          ),
          vitamineB12µg: Number(alimentId.alimentId.vitamineB12µg),
          initialVitamineB12: Number(alimentId.alimentId.vitamineB12µg),
          iG: Number(alimentId.alimentId.iG),
          initialIG: Number(alimentId.alimentId.iG),

          initialQuantity: 100,
          quantity: 100,
        },
      ]);
    }
    modalSuccesOfAliment.style.display = 'grid';

    setTimeout(() => {
      modalSuccesOfAliment.style.display = 'none';
    }, 4000);
  };
  const toggleProportionsModal = () => {
    setCount(0);
    let dietProportionsOptions = document.querySelector(
      '#dietProportionsOptions'
    );
    let formDietProportionsOptions = document.querySelector(
      '#formDietProportionsOptions'
    );
    let validDietOptions = document.querySelector('.validDietOptions');

    dietProportionsOptions.style.animationName = 'dietProportionsOptions2';
    formDietProportionsOptions.style.animationName =
      'dietProportionsOptionsSubmitAnim2';
    validDietOptions.style.animationName = 'dietProportionsOptionsSubmitAnim2';
    console.log(dietProportionsOptions.style);
  };

  const CheckProportions = () => {
    let totalGlucides = 0;
    let totalLipides = 0;
    let totalProteines = 0;
    let totalKc;
    let proteinProportion = {};
    let lipidesProportion = {};
    let glucidesProportion = {};
    for (let i of AlimentToStudy) {
      totalGlucides += i.glucidesG;
      totalLipides += i.lipidesG;
      totalProteines += i.proteinesG;
    }
    if (totalGlucides === 0 && totalLipides === 0 && totalProteines === 0) {
      totalKc = 0;
    } else {
      totalKc = totalProteines * 4 + totalGlucides * 4 + totalLipides * 9;
    }

    if (GenericDiet.checked === true) {
      if (GenericDiet.checked === true) {
        if (
          (totalProteines * 4).toFixed(2) > 0.18 * totalKc.toFixed(2) &&
          (totalProteines * 4).toFixed(2) < 0.22 * totalKc.toFixed(2)
        ) {
          proteinProportion = { protein: true };
        } else {
          proteinProportion = { protein: false };
        }
      }
      if (GenericDiet.checked === true) {
        if (
          (totalGlucides * 4).toFixed(2) < 0.52 * totalKc.toFixed(2) &&
          (totalGlucides * 4).toFixed(2) > 0.48 * totalKc.toFixed(2)
        ) {
          glucidesProportion = { glucides: true };
        } else {
          glucidesProportion = { glucides: false };
        }
      }
      if (GenericDiet.checked === true) {
        if (
          (totalLipides * 9).toFixed(2) > 0.28 * totalKc.toFixed(2) &&
          (totalLipides * 9).toFixed(2) < 0.32 * totalKc.toFixed(2)
        ) {
          lipidesProportion = { lipides: true };
        } else {
          lipidesProportion = { lipides: false };
        }
      }

      setRecipeDiet([
        {
          GenericDiet: {
            protein: proteinProportion.protein,

            glucides: glucidesProportion.glucides,
            lipides: lipidesProportion.lipides,
          },
        },
      ]);
    }

    if (KetoDiet.checked === true) {
      if (KetoDiet.checked === true) {
        if (
          (totalProteines * 4).toFixed(2) > 0.18 * totalKc.toFixed(2) &&
          (totalProteines * 4).toFixed(2) < 0.22 * totalKc.toFixed(2)
        ) {
          proteinProportion = { protein: true };
        } else {
          proteinProportion = { protein: false };
        }
      }
      if (KetoDiet.checked === true) {
        if (
          (totalGlucides * 4).toFixed(2) < 0.07 * totalKc.toFixed(2) &&
          (totalGlucides * 4).toFixed(2) > 0.03 * totalKc.toFixed(2)
        ) {
          glucidesProportion = { glucides: true };
        } else {
          glucidesProportion = { glucides: false };
        }
      }
      if (KetoDiet.checked === true) {
        if (
          (totalLipides * 9).toFixed(2) < 0.77 * totalKc.toFixed(2) &&
          (totalLipides * 9).toFixed(2) > 0.73 * totalKc.toFixed(2)
        ) {
          lipidesProportion = { lipides: true };
        } else {
          lipidesProportion = { lipides: false };
        }
      }

      setRecipeDiet([
        {
          KetoDiet: {
            protein: proteinProportion.protein,

            glucides: glucidesProportion.glucides,
            lipides: lipidesProportion.lipides,
          },
        },
      ]);
    }
    if (BodyArchitectDiet.checked === true) {
      if (BodyArchitectDiet.checked === true) {
        if (
          (totalProteines * 4).toFixed(2) > 0.23 * totalKc.toFixed(2) &&
          (totalProteines * 4).toFixed(2) < 0.27 * totalKc.toFixed(2)
        ) {
          proteinProportion = { protein: true };
        } else {
          proteinProportion = { protein: false };
        }
      }
      if (BodyArchitectDiet.checked === true) {
        if (
          (totalGlucides * 4).toFixed(2) < 0.395 * totalKc.toFixed(2) &&
          (totalGlucides * 4).toFixed(2) > 0.355 * totalKc.toFixed(2)
        ) {
          glucidesProportion = { glucides: true };
        } else {
          glucidesProportion = { glucides: false };
        }
      }
      if (BodyArchitectDiet.checked === true) {
        if (
          (totalLipides * 9).toFixed(2) < 0.395 * totalKc.toFixed(2) &&
          (totalLipides * 9).toFixed(2) > 0.355 * totalKc.toFixed(2)
        ) {
          lipidesProportion = { lipides: true };
        } else {
          lipidesProportion = { lipides: false };
        }
      }

      setRecipeDiet([
        {
          BodyArchitectDiet: {
            protein: proteinProportion.protein,
            glucides: glucidesProportion.glucides,
            lipides: lipidesProportion.lipides,
          },
        },
      ]);
    }
  };

  const Totals = () => {
    let totalGlucides = 0;
    let totalLipides = 0;
    let totalProteines = 0;
    for (let i of AlimentToStudy) {
      totalGlucides += i.glucidesG;
      totalLipides += i.lipidesG;
      totalProteines += i.proteinesG;
    }
    let totalGr = 0;
    let inputNumberTotal = document.querySelectorAll('input[type=number]');
    for (let i of inputNumberTotal) {
      totalGr += Number(i.value);
    }
    let totalKc;
    if (totalGlucides === 0 && totalLipides === 0 && totalProteines === 0) {
      totalKc = 0;
    } else {
      totalKc = totalProteines * 4 + totalGlucides * 4 + totalLipides * 9;
    }

    setTotalGrammes(totalGr);
    setTotalKcal(totalKc);
    setTotalCarbs(totalGlucides);
    setTotalFat(totalLipides);
    setTotalProtein(totalProteines);
  };
  useEffect(() => {
    Totals();
    if (countOfToggleList === 1) {
      setTimeout(() => {
        toggleAlimentList();
        setCountOfToggleList(0);
      }, 500);
    }
  }, [Totals]);

  const onChangeValues = (id) => {
    let allInput = document.querySelectorAll('input[type=number]');
    let input;
    for (let i of allInput) {
      if (i.id === id) {
        input = i;
      }
    }
    let alimentToModify = AlimentToStudy.find((alim) => alim.id === input.id);
    let index = AlimentToStudy.indexOf(alimentToModify);

    alimentToModify.glucidesG = Number(
      alimentToModify.initialGlucides / (100 / input.value)
    );
    alimentToModify.lipidesG = Number(
      alimentToModify.initialLipides / (100 / input.value)
    );
    alimentToModify.proteinesG = Number(
      alimentToModify.initialProteines / (100 / input.value)
    );
    alimentToModify.eauG = Number(
      alimentToModify.initialEau / (100 / input.value)
    );
    alimentToModify.sucresG = Number(
      alimentToModify.initialSucre / (100 / input.value)
    );
    alimentToModify.fructoseG = Number(
      alimentToModify.initialFructose / (100 / input.value)
    );
    alimentToModify.galactoseG = Number(
      alimentToModify.initialGalactose / (100 / input.value)
    );
    alimentToModify.glucoseG = Number(
      alimentToModify.initialGlucose / (100 / input.value)
    );
    alimentToModify.lactoseG = Number(
      alimentToModify.initialLactose / (100 / input.value)
    );
    alimentToModify.maltoseG = Number(
      alimentToModify.initialMaltose / (100 / input.value)
    );
    alimentToModify.saccharoseG = Number(
      alimentToModify.initialSaccharose / (100 / input.value)
    );
    alimentToModify.amidonG = Number(
      alimentToModify.initialAmidon / (100 / input.value)
    );
    alimentToModify.fibresAlimentairesG = Number(
      alimentToModify.initialFibresAlimentaires / (100 / input.value)
    );
    alimentToModify.polyolsTotauxG = Number(
      alimentToModify.initialPolyolsTotaux / (100 / input.value)
    );
    alimentToModify.alcoolG = Number(
      alimentToModify.initialAlcool / (100 / input.value)
    );
    alimentToModify.acidesOrganiquesG = Number(
      alimentToModify.initialAcidesOrganiques / (100 / input.value)
    );
    alimentToModify.agSaturesG = Number(
      alimentToModify.initialAgSatures / (100 / input.value)
    );
    alimentToModify.agMonoinsaturésG = Number(
      alimentToModify.initialAgMonoinsatures / (100 / input.value)
    );
    alimentToModify.agPolyinsaturésG = Number(
      alimentToModify.initialAgPolyinsatures / (100 / input.value)
    );
    alimentToModify.agButyriqueG = Number(
      alimentToModify.initialAgButyrique / (100 / input.value)
    );
    alimentToModify.agCaproiqueG = Number(
      alimentToModify.initialAgCaproique / (100 / input.value)
    );
    alimentToModify.agCapryliqueG = Number(
      alimentToModify.initialAgCaprylique / (100 / input.value)
    );
    alimentToModify.agCapriqueG = Number(
      alimentToModify.initialAgCaprique / (100 / input.value)
    );
    alimentToModify.agLauriqueG = Number(
      alimentToModify.initialAgLaurique / (100 / input.value)
    );
    alimentToModify.agMyristiqueG = Number(
      alimentToModify.initialAgMyristique / (100 / input.value)
    );
    alimentToModify.agPalmitiqueG = Number(
      alimentToModify.initialAgPalmitique / (100 / input.value)
    );
    alimentToModify.agSteariqueG = Number(
      alimentToModify.initialAgStearique / (100 / input.value)
    );
    alimentToModify.agOleiqueG = Number(
      alimentToModify.initialAgOleique / (100 / input.value)
    );
    alimentToModify.agLinoleiqueG = Number(
      alimentToModify.initialAgLinoleique / (100 / input.value)
    );
    alimentToModify.agAlphalinoleniqueG = Number(
      alimentToModify.initialAgAlphalinolenique / (100 / input.value)
    );
    alimentToModify.agArachidoniqueG = Number(
      alimentToModify.initialAgArachidonique / (100 / input.value)
    );
    alimentToModify.agEpaG = Number(
      alimentToModify.initialAgEpa / (100 / input.value)
    );
    alimentToModify.agDhaG = Number(
      alimentToModify.initialAgDha / (100 / input.value)
    );
    alimentToModify.cholesterolMg = Number(
      alimentToModify.initialCholesterol / (100 / input.value)
    );
    alimentToModify.selChlorureDeSodiumG = Number(
      alimentToModify.initialSelChlorureDeSodium / (100 / input.value)
    );
    alimentToModify.calciumMg = Number(
      alimentToModify.initialCalcium / (100 / input.value)
    );
    alimentToModify.chlorureMg = Number(
      alimentToModify.initialChlorure / (100 / input.value)
    );
    alimentToModify.cuivreMg = Number(
      alimentToModify.initialCuivre / (100 / input.value)
    );
    alimentToModify.ferMg = Number(
      alimentToModify.initialFer / (100 / input.value)
    );
    alimentToModify.iodeµg = Number(
      alimentToModify.initialIode / (100 / input.value)
    );
    alimentToModify.magnesiumMg = Number(
      alimentToModify.initialMagnesium / (100 / input.value)
    );
    alimentToModify.manganeseMg = Number(
      alimentToModify.initialManganese / (100 / input.value)
    );
    alimentToModify.phosphoreMg = Number(
      alimentToModify.initialPhosphore / (100 / input.value)
    );
    alimentToModify.potassiumMg = Number(
      alimentToModify.initialPotassium / (100 / input.value)
    );
    alimentToModify.seleniumµg = Number(
      alimentToModify.initialSelenium / (100 / input.value)
    );
    alimentToModify.sodiumMg = Number(
      alimentToModify.initialSodium / (100 / input.value)
    );
    alimentToModify.zincMg = Number(
      alimentToModify.initialZinc / (100 / input.value)
    );
    alimentToModify.retinolµg = Number(
      alimentToModify.initialRetinol / (100 / input.value)
    );
    alimentToModify.betaCaroteneµg = Number(
      alimentToModify.initialBetaCarotene / (100 / input.value)
    );
    alimentToModify.vitamineDµg = Number(
      alimentToModify.initialVitamineD / (100 / input.value)
    );
    alimentToModify.vitamineEmg = Number(
      alimentToModify.initialVitamineE / (100 / input.value)
    );
    alimentToModify.vitamineK1µg = Number(
      alimentToModify.initialVitamineK1 / (100 / input.value)
    );
    alimentToModify.vitamineK2µg = Number(
      alimentToModify.initialVitamineK2 / (100 / input.value)
    );
    alimentToModify.vitamineCmg = Number(
      alimentToModify.initialVitamineC / (100 / input.value)
    );
    alimentToModify.vitamineB1ThiamineMg = Number(
      alimentToModify.initialVitamineB1Thiamine / (100 / input.value)
    );
    alimentToModify.vitamineB2RiboflavineMg = Number(
      alimentToModify.initialVitamineB2Riboflavine / (100 / input.value)
    );
    alimentToModify.vitamineB3PpNiacineMg = Number(
      alimentToModify.initialVitamineB3PpNiacine / (100 / input.value)
    );
    alimentToModify.vitamineB5AcidePantotheniqueMg = Number(
      alimentToModify.initialVitamineB5AcidePantothenique / (100 / input.value)
    );
    alimentToModify.vitamineB6Mg = Number(
      alimentToModify.initialVitamineB6 / (100 / input.value)
    );
    alimentToModify.vitamineB9FolatesTotauxµg = Number(
      alimentToModify.initialVitamineB9FolatesTotaux / (100 / input.value)
    );
    alimentToModify.vitamineB12µg = Number(
      alimentToModify.initialVitamineB12 / (100 / input.value)
    );
    alimentToModify.iG = Number(
      alimentToModify.initialIG / (100 / input.value)
    );

    alimentToModify.quantity = Number(input.value);

    let Arr = [
      ...AlimentToStudy,
      AlimentToStudy.splice(index, 1, alimentToModify),
    ];
    console.log(Arr);
    setJokerAlwaysWorks(!jokerAlwaysWorks);
    CheckProportions();
    Totals();
  };
  const togglesearchAlimentOnRecipeStudio = () => {
    setSearchAlimentOnRecipeStudioOpen(!searchAlimentOnRecipeStudioOpen);
    setDisplayEggsSvg(!displayEggsSvg);
  };

  const toggleproportionAlimentRecipeStudio = () => {
    setProportionAlimentOpen(!proportionAlimentOpen);
    setDisplayEggsSvg(!displayEggsSvg);
  };
  const toggleRecipeDetailsRecipeStudio = () => {
    if (!recipeDetailsOpen && isAuthenticated.isAuthenticated !== true) {
      alertPopup(
        'Attention il faut être connecté afin de créer et enregistrer votre recette',
        'warning'
      );
    }
    setRecipeDetailsOpen(!recipeDetailsOpen);
    setDisplayEggsSvg(!displayEggsSvg);
  };

  const deleteAlimTolistToStudy = (id) => {
    let newListAfterFilter = AlimentToStudy.filter((alim) => alim.id !== id);
    CheckProportions();
    console.log(newListAfterFilter);
    setAlimentToStudy(newListAfterFilter);
  };
  const onChangeDatas = () => {
    let elementSForm = document.getElementsByName('recipeForm');
    let inputs = document.querySelectorAll('input[type=checkbox]');
    let fullDatas = {};
    for (let data of elementSForm) {
      fullDatas[data.id] = data.value;
    }
    for (let data of inputs) {
      fullDatas[data.id] = data.checked;
    }
    setFormRecipe({
      ...fullDatas,
      recipeInstructions: instructions,
      recipeImage: recipeImg.recipeImage,
      totalKcal: totalKcal,
      totalGrammes: totalGrammes,
      totalProtein: totalProtein,
      totalCarbs: totalCarbs,
      totalFat: totalFat,
    });
  };
  const onChangeInsctruction = (e) => {
    let index = e.target.id.slice(-1);
    let EtapesInstructionsArray = instructions;
    EtapesInstructionsArray[index] = e.target.value;
    setInstructions(EtapesInstructionsArray);
  };
  const addInstructionStep = (e) => {
    e.preventDefault();
    setInstructions([...instructions, '']);
  };
  const deleteInstructionStep = (e) => {
    e.preventDefault();
    let arr = instructions;
    arr.pop();
    setLastDeleted(`recipeInstructions${instructions.length}`);
    setTimeout(() => {
      setLastDeleted('');
    }, 100);
    setInstructions(arr);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    if (isAuthenticated.isAuthenticated !== true) {
      alertPopup(
        'Attention il faut être connecté afin de créer et enregistrer votre recette',
        'error'
      );
    } else {
      const recipeIngredients = AlimentToStudy;
      if (
        recipeDiet[recipeDiet.length - 1][
          Object.keys(recipeDiet[recipeDiet.length - 1])
        ].lipides &&
        recipeDiet[recipeDiet.length - 1][
          Object.keys(recipeDiet[recipeDiet.length - 1])
        ].glucides &&
        recipeDiet[recipeDiet.length - 1][
          Object.keys(recipeDiet[recipeDiet.length - 1])
        ].protein &&
        AlimentToStudy.length !== 0
      ) {
        setFormRecipe({
          ...formRecipe,
          recipeIngredients,
          recipeDiet: dietChosen,
          // totalKcal: totalKcal,
          // totalGrammes: totalGrammes,
          // totalProtein: totalProtein,
          // totalCarbs: totalCarbs,
          // totalFat: totalFat,
        });
        createRecipe({
          ...formRecipe,
          recipeIngredients,
          recipeDiet: dietChosen,
          // totalKcal: totalKcal,
          // totalGrammes: totalGrammes,
          // totalProtein: totalProtein,
          // totalCarbs: totalCarbs,
          // totalFat: totalFat,
        });
        toggleRecipeDetailsRecipeStudio();
        // setNavigate(!navigate);
      } else {
        alertPopup(
          `il semblerait que vous n'avez pas choisi d'ingrédients ou respecté Les proportions de votre recette, vous devez d'abord Vous rendre à L'étape Numéro 2`,
          'warning'
        );
      }
    }
  };

  function loadImage(e) {
    const file = e.target.files[0];
    document.getElementById('frame').src = window.URL.createObjectURL(file);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      setRecipeImg({ recipeImage: e.target.result });
    };
  }
  let BodyArchitectDiet = document.querySelector('input[id=BodyArchitectDiet]');
  let KetoDiet = document.querySelector('input[id=KetoDiet]');
  let GenericDiet = document.querySelector('input[id=GenericDiet]');
  let FreeDiet = document.querySelector('input[id=FreeDiet]');

  const spinnerUpActions = (id) => {
    let allInput = document.querySelectorAll('input[type=number]');
    let input;
    for (let i of allInput) {
      if (i.id === id) {
        input = i;
      }
    }
    input.stepUp();
    onChangeValues(id);
  };
  const spinnerDownActions = (id) => {
    let allInput = document.querySelectorAll('input[type=number]');
    let input;
    for (let i of allInput) {
      if (i.id === id) {
        input = i;
      }
    }
    input.stepDown();
    onChangeValues(id);
  };

  const submitDietOptions = (e) => {
    e.preventDefault();

    if (document.querySelector('input[type=radio]:checked') !== null) {
      setDietChosen(document.querySelector('input[type=radio]:checked').id);
      setCount(1);
    }

    if (BodyArchitectDiet.checked === true) {
      setRecipeDiet([
        {
          BodyArchitectDiet: {
            protein: false,
            glucides: false,
            lipides: false,
          },
        },
      ]);
    } else if (KetoDiet.checked === true) {
      setRecipeDiet([
        { KetoDiet: { protein: false, glucides: false, lipides: false } },
      ]);
    } else if (GenericDiet.checked === true) {
      setRecipeDiet([
        { GenericDiet: { protein: false, glucides: false, lipides: false } },
      ]);
    } else if (FreeDiet.checked === true) {
      setRecipeDiet([
        { FreeDiet: { protein: true, glucides: true, lipides: true } },
      ]);
    }
    console.log(document.querySelector('input[type=radio]:checked'));
  };

  //  DYNAMIC STYLE VARIABLES   //  ON BELOW  //  DYNAMIC STYLE VARIABLES
  //  DYNAMIC STYLE VARIABLES   //  ON BELOW  //  DYNAMIC STYLE VARIABLES
  const menuIsItOpenedStyle = {
    opacity: visibility ? '1' : '0',
  };

  const dietProportionsOptionsStyle = {
    display: ` ${proportionAlimentOpen && count === 0 ? 'block' : 'none'}`,
    opacity: visibility ? '1' : '0',
  };
  const searchAlimentOnRecipeStudioStyle = {
    display: `${recipeDetailsOpen || proportionAlimentOpen ? 'none' : ''}`,
    opacity: visibility ? '1' : '0',
  };
  const tbodyStyle = { display: `${searchType ? '' : 'none'}` };
  const tbodyStyle2 = { display: `${!searchType ? '' : 'none'}` };
  const linkStyle = {
    textDecoration: 'none',
    color: 'rgba(8, 6, 30,0.6)',
    fontFamily: 'Geomanist-ExtraLight',
    whiteSpace: 'nowrap',
  };
  const proportionAlimentStyle = {
    display: `${
      searchAlimentOnRecipeStudioOpen || recipeDetailsOpen ? 'none' : ''
    }`,
    opacity: visibility ? '1' : '0',
  };
  const centerEggContainerStyle = {
    display: `${proportionAlimentOpen && visibility ? 'none' : ''}`,
  };
  const footerStyle = {
    display: `${proportionAlimentOpen ? '' : 'none'}`,
    opacity: visibility ? '1' : '0',
  };
  const glucidesTotalStyle = {
    borderColor: `${
      recipeDiet[recipeDiet.length - 1][
        Object.keys(recipeDiet[recipeDiet.length - 1])
      ].glucides
        ? 'lightGreen'
        : ''
    }`,
  };
  const proteinesTotalStyle = {
    borderColor: `${
      recipeDiet[recipeDiet.length - 1][
        Object.keys(recipeDiet[recipeDiet.length - 1])
      ].protein
        ? 'lightGreen'
        : ''
    }`,
  };
  const lipidesTotalStyle = {
    borderColor: `${
      recipeDiet[recipeDiet.length - 1][
        Object.keys(recipeDiet[recipeDiet.length - 1])
      ].lipides
        ? 'lightGreen'
        : ''
    }`,
  };
  const toggleproportionAlimentRecipeStudioStyle = {
    display: `${proportionAlimentOpen ? '' : 'none'}`,
  };

  const recipeDetailsStyle = {
    display: `${
      searchAlimentOnRecipeStudioOpen || proportionAlimentOpen ? 'none' : ''
    }`,
    opacity: visibility ? '1' : '0',
  };
  const stepsStyle = { background: 'white', cursor: 'pointer' };
  const asideStyle = {
    display: `${recipeDetailsOpen ? '' : 'none'}`,
    opacity: visibility ? '1' : '0',
  };
  const recipeStudioStyle = { background: visibility ? '': 'none' }
  //  DYNAMIC STYLE VARIABLES   //  ABOVE  //  DYNAMIC STYLE VARIABLES
  //  DYNAMIC STYLE VARIABLES   //  ABOVE  //  DYNAMIC STYLE VARIABLES

  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */
  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */
  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */

  return (
    <div style={recipeStudioStyle} className='recipeStudio'>
      {/*  _________     HERE IS  THE BACKGROUND IMAGE WHICH SHOULD HAVE DIFFERENT ANIMATIONS AND SIZE DEPENDING OF DEVICES AND RATIOS, STILL NOT DONE FOR WIDE SCREENS   ___________ */}
      <img
        id='recetteStudioImg'
        style={menuIsItOpenedStyle}
        src={recetteStudioImg}
        alt='recetteStudioImage'></img>
      <Nav hideFor3dOpening={hideFor3dOpening} visibility={visibility} />
      {/* ______________________    HERE IS THE MODAL WITH OPTIONS OF DIET'S PROPORTIONS   __________________________ */}

      <div id='dietProportionsOptions' style={dietProportionsOptionsStyle}>
        <button className='exit' onClick={(e) => setCount(1)}>
          X
        </button>

        <form id='formDietProportionsOptions' onSubmit={submitDietOptions}>
          <fieldset>
            <legend> Définissez L'équilibre Énergétique / Diète</legend>
            <p>
              {' '}
              Ici il est question d'équilibrer votre recette en besoins
              énergétiques selon plusieurs diètes et recommandations majeures.
              Les quantités sont affichés mais il est inutil d'ésssayer de les
              ajuster maintenant car le programme le fera automatiquement selon
              les besoins énergétiques du client/patient respectant TOUJOURS les
              mêmes proportions. Par défaut, la recette sera ensuite convertie
              pour un Total de 100G.
            </p>

            <label htmlFor='BodyArchitectDiet'>
              <span>
                <strong>Body Architect Diète </strong> <br></br>(37.5% Lipides,
                37,5% Glucides, 25% Protéines, tolérance +/- 2%)
              </span>
              <input
                type='radio'
                id='BodyArchitectDiet'
                name='dietProportionsOptions'
              />
              <span className='checkboxInner'>
                <span className='blueBall'></span>{' '}
              </span>
            </label>
            <label htmlFor='KetoDiet'>
              <span>
                {' '}
                <strong>Diète Cétogène </strong> <br></br>(75% Lipides, 5%
                Glucides, 20% Protéines, tolérance +/- 2%)
              </span>
              <input type='radio' id='KetoDiet' name='dietProportionsOptions' />
              <span className='checkboxInner'>
                <span className='blueBall'></span>{' '}
              </span>
            </label>
            <label htmlFor='GenericDiet'>
              <span>
                <strong>Diète Générique & Sports D'endurance </strong>
                <br></br> (30% Lipides, 50% Glucides, 20% Protéines, tolérance
                +/- 2%)
              </span>
              <input
                type='radio'
                id='GenericDiet'
                name='dietProportionsOptions'
              />
              <span className='checkboxInner'>
                <span className='blueBall'></span>{' '}
              </span>
            </label>
            <label htmlFor='FreeDiet'>
              <span>
                <strong>Aucune Diète, Proportions Libres </strong>
                <br></br> (non recommandé)
              </span>
              <input type='radio' id='FreeDiet' name='dietProportionsOptions' />
              <span className='checkboxInner'>
                <span className='blueBall'></span>{' '}
              </span>
            </label>
          </fieldset>
          <input className='validDietOptions' type='submit' value='Ok'></input>
        </form>
      </div>

      {/*  _________     HERE IS THE  MODAL TO SHOW THE ALIMENT JUST ADDED OR ALREADY ADDED TO THE PROPORTION ALIMENT'S SECTION ___________ */}

      <aside className='modalSucces' style={menuIsItOpenedStyle}>
        <span>{AlimentToStudy.length > 0 ? messageModal : ''}</span>
      </aside>

      {/*  _________     HERE IS  THE SECTION / STEP NUMBER 1,  TO SEARCH ALIMENT TO SEND TO THE  PROPORTION ALIMENT'S SECTION ___________ */}

      <section
        className={
          searchAlimentOnRecipeStudioOpen
            ? 'searchAlimentOnRecipeStudioOpen'
            : 'searchAlimentOnRecipeStudioClose'
        }
        onClick={
          searchAlimentOnRecipeStudioOpen
            ? null
            : togglesearchAlimentOnRecipeStudio
        }
        style={searchAlimentOnRecipeStudioStyle}>
        <h3>ETAPE N° 1</h3>
        <h2>Ajouter Des Aliments</h2>
        <div
          style={{ display: visibility ? 'block' : 'none' }}
          className='leftEggContainer'>
          <EggLeftSvg displayEggsSvg={displayEggsSvg} />
        </div>
        {searchType ? (
          <table className='recipeStudioTableSearchOpened'>
            <thead>
              <tr>
                <th className='alimNom'>
                  1 - Recherche Rapide D'Aliments
                  <form>
                    <label htmlFor='search-aliment'>
                      <input
                        onChange={handleInputSearchOnChange}
                        placeholder='Recherche...'
                        type='search'
                        id='search-aliment'
                        name='search-aliment'
                        aria-label='Search Aliment'></input>
                    </label>
                  </form>
                  <button className='switchSearchType' onClick={toggleSearch}>
                    ⮂
                  </button>
                </th>
              </tr>
            </thead>
            <tbody style={tbodyStyle}>
              {aliments &&
                aliments.map((alim) => {
                  return (
                    <tr onClick={(e) => setCountOfToggleList(1)} key={alim._id}>
                      <td
                        onClick={(e) => setIdAndName(alim._id, alim.alimNom)}
                        className='alimNomRecetteStudio'>
                        {alim.alimNom}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <table className='recipeStudioTableSearchOpened'>
            <thead>
              <tr>
                <th className='alimNomRecetteStudio'>
                  1 - Liste Du Studio Des Aliments
                  <button className='switchSearchType' onClick={toggleSearch}>
                    ⮂
                  </button>
                </th>
              </tr>
            </thead>
            <tbody style={tbodyStyle2}>
              {listToRecipeStudio.listToRecipeStudio.length === 0 ? (
                <tr>
                  <td>
                    <Link style={linkStyle} to='/aliments-studio'>
                      Votre Liste est Vide, Aller Au Studio Des Aliments
                    </Link>
                  </td>
                </tr>
              ) : (
                listToRecipeStudio.listToRecipeStudio.map((alim) => {
                  return (
                    <Fragment key={alim._id}>
                      <tr onClick={(e) => setCountOfToggleList(1)}>
                        <td onClick={(e) => setIdAndName(alim._id, alim.Name)}>
                          {alim.Name}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Link style={linkStyle} to='/aliments-studio'>
                            Recherche Avancée ? Aller Au Studio Des Aliments
                          </Link>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        )}

        <button
          onClick={togglesearchAlimentOnRecipeStudio}
          className='sendSearchRecipeStudio'>
          C'est Tout Bon !
        </button>
      </section>

      {/*  _________     HERE IS  THE SECTION AND HIS FOOTER / STEP NUMBER 2,  TO MODIFY QUANTITY AND PROPORTIONS OF ALL ALIMENTS SELECTED  ___________ */}

      <section
        className={
          proportionAlimentOpen
            ? 'proportionAlimentOpen'
            : 'proportionAlimentClose'
        }
        onClick={
          proportionAlimentOpen ? null : toggleproportionAlimentRecipeStudio
        }
        style={proportionAlimentStyle}>
        <h3>ETAPE N° 2</h3>
        <h2>Proportions Des Aliments</h2>
        <div className='centerEggContainer' style={centerEggContainerStyle}>
          <EggCenterSvg displayEggsSvg={displayEggsSvg} />
        </div>

        <h2>
          2 - Proportions Des Aliments{' '}
          <button className='switchSearchType' onClick={toggleProportionsModal}>
            →
          </button>
        </h2>
        <div className='tbody'>
          {AlimentToStudy.map((alim) => {
            return (
              <div className='tr' key={alim.id}>
                <div className='td'>
                  <h4>{alim.name}</h4>
                  <div className='macroNutriments'>
                    <div className='glucides'>
                      <h5>Glucides</h5>
                      <h4> {alim.glucidesG.toFixed(2)}</h4>
                    </div>
                    <div className='proteines'>
                      <h5>Protéines</h5>
                      <h4>{alim.proteinesG.toFixed(2)} </h4>
                    </div>
                    <div className='lipides'>
                      <h5>Lipides</h5>
                      <h4> {alim.lipidesG.toFixed(2)}</h4>
                    </div>
                    <label key={alim.id}>
                      <input
                        id={alim.id}
                        type='number'
                        placeholder='100'
                        min='0'
                        onChange={(e) => onChangeValues(alim.id)}
                        defaultValue='100'></input>
                      <span
                        style={{
                          pointerEvents:
                            browserName.current === 'firefox' ? '' : 'none',
                        }}
                        className='spinner-button'>
                        {' '}
                        <span
                          id='inc-button'
                          onClick={(e) => spinnerUpActions(alim.id)}>
                          +
                        </span>
                        <span
                          id='dec-button'
                          onClick={(e) => spinnerDownActions(alim.id)}>
                          -
                        </span>
                      </span>
                      <span>G</span>{' '}
                    </label>
                    <label className='deleteAlimentFromRecipeStudioListLabel'>
                      <button
                        className='deleteAlimentFromRecipeStudioList'
                        onClick={(e) => deleteAlimTolistToStudy(alim.id)}>
                        X
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <footer style={footerStyle}>
        <div className='glucidesTotal' style={glucidesTotalStyle}>
          {' '}
          <h5>Total Glucides</h5>
          <h4> {totalCarbs.toFixed(2)} G</h4>
          <h3>
            {totalCarbs === 0
              ? '0'
              : `${((totalCarbs * 4 * 100) / totalKcal).toFixed(1)}`}
            % <span>(Kcal)</span>
          </h3>
        </div>
        <div className='proteinesTotal' style={proteinesTotalStyle}>
          <h5> Total Protéines</h5>
          <h4> {totalProtein.toFixed(2)} G</h4>

          <h3>
            {totalProtein === 0
              ? '0'
              : `${((totalProtein * 4 * 100) / totalKcal).toFixed(1)}`}
            % <span>(Kcal)</span>
          </h3>
        </div>
        <div className='lipidesTotal' style={lipidesTotalStyle}>
          <h5>Total Lipides</h5> <h4>{totalFat.toFixed(2)} G</h4>
          <h3>
            {totalFat === 0
              ? '0'
              : `${((totalFat * 9 * 100) / totalKcal).toFixed(1)}`}
            % <span>(Kcal)</span>
          </h3>
        </div>
        <div className='totalMacro'>
          <h5>Total De La Recette En Cours</h5>
          <div>
            <h4>{totalGrammes} G</h4>
            <h3>{totalKcal.toFixed(1)} Kcal</h3>

            {/* <button className='convert'>Convertir</button> */}
          </div>
        </div>
        <button
          onClick={toggleproportionAlimentRecipeStudio}
          className='sendpProportionAlimentRecipeStudio'
          style={toggleproportionAlimentRecipeStudioStyle}>
          {recipeDiet[recipeDiet.length - 1][
            Object.keys(recipeDiet[recipeDiet.length - 1])
          ].lipides &&
          recipeDiet[recipeDiet.length - 1][
            Object.keys(recipeDiet[recipeDiet.length - 1])
          ].glucides &&
          recipeDiet[recipeDiet.length - 1][
            Object.keys(recipeDiet[recipeDiet.length - 1])
          ].protein
            ? `Youpi C'est Bon !`
            : 'Revenir En arrière'}
        </button>
      </footer>

      {/*  _________     HERE IS  THE SECTION / FINAL STEP, NUMBER 3,  TO ADD ALL DETAILS AND  INFOS OF THE RECIPE   ___________ */}

      <section
        className={
          recipeDetailsOpen ? 'recipeDetailsOpen' : 'recipeDetailsClose'
        }
        onClick={recipeDetailsOpen ? null : toggleRecipeDetailsRecipeStudio}
        style={recipeDetailsStyle}>
        <h3>ETAPE N° 3</h3>
        <h2>Détails Et Instructions</h2>
        <div className='rightEggContainer' style={menuIsItOpenedStyle}>
          <EggRightSvg displayEggsSvg={displayEggsSvg} />
        </div>
        {recipeDetailsOpen ? (
          <Fragment>
            <h2>
              3 - Détails Et Instructions De <span> </span>
              {formRecipe.recipeTitle === ''
                ? ' Votre Recette'
                : formRecipe.recipeTitle}
            </h2>
            <form onSubmit={onSubmitHandle}>
              <fieldset>
                <legend>Donnez Un Titre à Votre Recette</legend>
                <label htmlFor='recipeTitle'>
                  <input
                    name='recipeForm'
                    onChange={onChangeDatas}
                    id='recipeTitle'
                    type='text'
                    placeholder='Quel Est le Titre De La Recette ?'
                    required></input>
                </label>
              </fieldset>
              <fieldset>
                <legend>Donnez Une Image à Votre Recette</legend>
                <label htmlFor='recipeImage' className='recipeImglabel'>
                  <input
                    name='recipeForm'
                    // dataMaxSize='3215'
                    onChange={loadImage}
                    id='recipeImage'
                    type='file'
                    accept='image/*'
                    required></input>

                  <img
                    style={{
                      display: `${recipeImg.recipeImage !== '' ? '' : 'none'}`,
                    }}
                    id='frame'
                    src=''
                    width='90%'
                    height='90%'
                    alt={formRecipe.recipeTitle}
                  />
                </label>
              </fieldset>
              <fieldset>
                <legend className='classificationRecipeOpened'>
                  Classification
                </legend>
                <fieldset>
                  <legend>Catégorie Initiale</legend>
                  <label htmlFor='recipeInitialCategory'>
                    <select
                      name='recipeForm'
                      id='recipeInitialCategory'
                      onChange={onChangeDatas}
                      required>
                      <option value=''>
                        --Définissez La Catégorie Initiale --
                      </option>
                      <option value='heartyDish'>
                        Plats Ou Ensemble De Plats Consistants
                      </option>
                      <option value='fastFood'>
                        Encas, Smoothies Et Petits Déjeuners
                      </option>
                    </select>
                  </label>
                </fieldset>
                {formRecipe.recipeInitialCategory === 'heartyDish' ? (
                  <fieldset>
                    <legend>
                      Sous Catégorie De : Plats Ou Ensemble De Plats Consistants
                    </legend>
                    <label htmlFor='recipeSubCategory'>
                      <select
                        name='recipeForm'
                        id='recipeSubCategory'
                        onChange={onChangeDatas}
                        required>
                        <option value=''>
                          --Définissez Le nombre de plats --
                        </option>
                        <option value='starter'>Entrée seule</option>
                        <option value='dish'>Plat seul</option>
                        <option value='starter+Dish '>Entrée + Plat</option>
                        <option value='starter+Dish+Cheese'>
                          Entrée + Plat + Fromage
                        </option>
                        <option value='starter+Dish+Cheese+Dessert'>
                          Entrée + Plat + Fromage + Dessert
                        </option>
                        <option value='dish+Cheese+Dessert'>
                          Plat + Fromage + Dessert
                        </option>
                        <option value='starter+Cheese'>Entrée + Fromage</option>
                        <option value='starter+Dessert'>
                          Entrée + Dessert
                        </option>
                        <option value='dish+Cheese'>Plat + Fromage</option>
                        <option value='dish+Dessert'>Plat + Dessert</option>
                      </select>
                    </label>
                    {formRecipe.recipeSubCategory !== 'starter' &&
                    formRecipe.recipeSubCategory !== 'starter+Cheese' &&
                    formRecipe.recipeSubCategory !== 'starter+Dessert' &&
                    formRecipe.recipeSubCategory !== '' &&
                    formRecipe.recipeSubCategory !== undefined ? (
                      <fieldset>
                        <legend>Contenu principal de Votre Plat</legend>
                        <label htmlFor='recipeSubSubCategory'>
                          <select
                            name='recipeForm'
                            id='recipeSubSubCategory'
                            onChange={onChangeDatas}
                            required>
                            <option value=''>
                              --Définissez Le Contenu De votre Plat Principal --
                            </option>
                            <option value='vegan'>Végétarien</option>
                            <option value='meat'>Viande</option>
                            <option value='seeFood'>
                              Poisson Et Fruits de Mer
                            </option>
                            <option value='chicken'>
                              Poulet et Autres Volailles
                            </option>
                            <option value='blend'>Mixte</option>
                          </select>
                        </label>
                      </fieldset>
                    ) : null}
                  </fieldset>
                ) : null}
                {formRecipe.recipeInitialCategory === 'fastFood' ? (
                  <fieldset>
                    <legend>
                      Sous Catégorie De : Encas, Smoothies Et Petits Déjeuners
                    </legend>
                    <label htmlFor='recipeSubCategory'>
                      <select
                        name='recipeForm'
                        id='recipeSubCategory'
                        onChange={onChangeDatas}
                        required>
                        <option value=''>
                          --Définissez Le Type d'Encas --
                        </option>
                        <option value='coldFastFood'>Encas froid</option>
                        <option value='hotFastFood'>Encas Chaud</option>
                        <option value='smoothiesAndMilkShakes '>
                          Smoothies et MilkShakes
                        </option>
                        <option value='breakFasts'>petits Déjeuners</option>
                      </select>
                    </label>
                  </fieldset>
                ) : null}
              </fieldset>
              <fieldset>
                <legend>Instructions De Préparation Par étape</legend>

                {instructions.map((item, index) => {
                  return lastDeleted === `recipeInstructions${index}` ? null : (
                    <Fragment key={index}>
                      <label htmlFor='recipeInstructions'>
                        <legend>{`Etape n°${index + 1}`}</legend>
                        <textarea
                          style={{ marginTop: '2vw', marginBottom: '2.5vw' }}
                          id={`recipeInstructions${index}`}
                          name='recipeForm'
                          rows='7'
                          cols='35'
                          required
                          maxLength='400'
                          onChange={onChangeInsctruction}
                          placeholder='Soyez explicite pour le lecteur, Et le programme gèrera une belle mise en forme pour vous.'></textarea>
                      </label>
                    </Fragment>
                  );
                })}

                <button
                  className='addStep'
                  onClick={addInstructionStep}
                  style={stepsStyle}>
                  Ajouter Une Etape
                </button>
                {instructions.length > 1 ? (
                  <button
                    className='deleteStep'
                    onClick={deleteInstructionStep}
                    style={stepsStyle}>
                    Supprimer Cette Etape
                  </button>
                ) : (
                  ''
                )}
              </fieldset>

              <fieldset>
                <legend>Détails</legend>
                <fieldset>
                  <legend>Prix</legend>
                  <label htmlFor='recipePrice'>
                    <select
                      name='recipeForm'
                      id='recipePrice'
                      onChange={onChangeDatas}
                      required>
                      <option value=''>--Définissez Le prix --</option>
                      <option value='economic'>Économic</option>
                      <option value='affordable'>Abordable</option>
                      <option value='consequent'>Conséquent</option>
                    </select>
                  </label>
                </fieldset>
                <fieldset>
                  <legend>Difficulté</legend>
                  <label htmlFor='recipeLevel'>
                    <select
                      name='recipeForm'
                      id='recipeLevel'
                      onChange={onChangeDatas}
                      required>
                      <option value=''>--Définissez Le Niveau --</option>
                      <option value='easyLevel'>Apprenti</option>
                      <option value='mediumLevel'>Commis</option>
                      <option value='expertLevel'>Chef</option>
                    </select>
                  </label>
                </fieldset>
                <fieldset>
                  <legend>Temps de Préparation</legend>
                  <label htmlFor='recipeCookingTime'>
                    <input
                      name='recipeForm'
                      onChange={onChangeDatas}
                      id='recipeCookingTime'
                      type='number'
                      placeholder='temps en minutes'
                      min='0'
                      required></input>
                    <span>Minutes</span>
                  </label>
                </fieldset>
                <fieldset>
                  <legend>Temps de Cuisson</legend>
                  <label htmlFor='recipeHeatingTime'>
                    <input
                      name='recipeForm'
                      onChange={onChangeDatas}
                      id='recipeHeatingTime'
                      type='number'
                      placeholder='temps en minutes'
                      min='0'
                      required></input>{' '}
                    <span>Minutes</span>
                  </label>
                </fieldset>
              </fieldset>
              <fieldset>
                <legend>Infos Nutritionelles</legend>
                <fieldset>
                  <legend>Régime Alimentaire</legend>
                  <label htmlFor='recipeRegime'>
                    <select
                      name='recipeForm'
                      id='recipeRegime'
                      onChange={onChangeDatas}
                      required>
                      <option value=''>
                        --Définissez Le Type de Régime --
                      </option>
                      <option value='veganStrict'>
                        Végétarien Stricte / Végétalien
                      </option>
                      <option value='vegan'>Végétarien</option>
                      <option value='omnivorousWithPorc'>
                        Omnivore Tolérant le Porc
                      </option>
                      <option value='omnivorousWithoutPorc'>
                        Omnivore Excluant le Porc
                      </option>
                    </select>
                  </label>
                </fieldset>
                <fieldset className='fieldsetForBlueCheckbox'>
                  <legend>Liste des Allergènes</legend>
                  <label htmlFor='gluten'>
                    Gluten
                    <input
                      type='checkbox'
                      id='gluten'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>{' '}
                    </span>
                  </label>
                  <label htmlFor='shellfish'>
                    Crustacés
                    <input
                      type='checkbox'
                      id='shellfish'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                  <label htmlFor='eggs'>
                    Oeufs
                    <input
                      type='checkbox'
                      id='eggs'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                  <label htmlFor='fish'>
                    Poissons
                    <input
                      type='checkbox'
                      id='fish'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                  <label htmlFor='peanuts'>
                    Arachides
                    <input
                      type='checkbox'
                      id='peanuts'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                  <label htmlFor='soja'>
                    Soja
                    <input
                      type='checkbox'
                      id='soja'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                  <label htmlFor='milk'>
                    Lait
                    <input
                      type='checkbox'
                      id='milk'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                  <label htmlFor='nuts'>
                    Fruits à coques
                    <input
                      type='checkbox'
                      id='nuts'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                  <label htmlFor='celery'>
                    Céleri
                    <input
                      type='checkbox'
                      id='celery'
                      name='recipeform'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                  <label htmlFor='mustard'>
                    Moutarde
                    <input
                      type='checkbox'
                      id='mustard'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                  <label htmlFor='sesameSeeds'>
                    Graines de sésame
                    <input
                      type='checkbox'
                      id='sesameSeeds'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                  <label htmlFor='sulphites'>
                    sulfites
                    <input
                      type='checkbox'
                      id='sulphites'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                  <label htmlFor='lupine'>
                    Lupin
                    <input
                      type='checkbox'
                      id='lupine'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                  <label htmlFor='mollusks'>
                    Mollusques
                    <input
                      type='checkbox'
                      id='mollusks'
                      name='recipeForm'
                      onChange={onChangeDatas}
                    />
                    <span className='checkboxInner'>
                      <span className='blueBall'></span>
                    </span>
                  </label>
                </fieldset>
              </fieldset>
              <input
                type='submit'
                value='Créer Et Aller Au Livre Des Recettes'></input>
            </form>
          </Fragment>
        ) : (
          ''
        )}
      </section>
      <aside style={asideStyle}>
        <button
          style={menuIsItOpenedStyle}
          onClick={toggleRecipeDetailsRecipeStudio}
          className='sendpRecipeDetailsRecipeStudio'>
          Revenir Aux Étapes Précédentes
        </button>
      </aside>

      {goToRecipe ? <Navigate to='/recettes-book'></Navigate> : ''}
    </div>
  );
};
const mapStateToProps = (state) => ({
  aliments: state.allAliments,
  alimentId: state.allAliments,
  listToRecipeStudio: state.allAliments,
  recipes: state.allRecipes,
  recipeId: state.allRecipes,
  recipeActive: state.allRecipes,
  isAuthenticated: state.auth,
});
export default connect(mapStateToProps, {
  getAliment,
  getAlimentByID,
  getAlimentList,
  getRecipe,
  createRecipe,
  getRecipeActive,
})(RecipeStudio);
