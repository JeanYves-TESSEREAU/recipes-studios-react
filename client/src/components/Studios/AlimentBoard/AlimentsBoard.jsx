/* eslint-disable no-unused-vars */
import './AlimentBoard.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pagination from './pagination/Pagination.jsx';
import AlimentForm from './AlimentForm/AlimentForm.jsx';
import injectStyle from '../../../assets/fonctions/injectStyle';
import Nav from '../../globalComponents/navigation/Nav';
import { connect } from 'react-redux';
import {
  getAliment,
  getAlimentByID,
  getAlimentList,
} from '../../../redux/actions/aliments';
import recipe from '../../../assets/img/testAlimentStudio.png';
import { alertPopup } from '../../../assets/fonctions/alertPopup.js';

const AlimentBoard = ({
  getAliment,
  getAlimentByID,
  getAlimentList,
  listToRecipeStudio,
  isAuthenticated,
  user,
  aliments: { aliments },
}) => {
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                     __________________________ */
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                       __________________________ */
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                       __________________________ */

  const [sortCount, setSortCount] = useState(0);
  const [nutrimentSelected, setNutrimentSelected] = useState('alimGrpcode');
  const [nutrimentId, setNutrimentId] = useState('');
  const [alimentName, setAlimentName] = useState('');
  const [alimentID, setAlimentID] = useState();
  const [notDisplayedActions, setNotDisplayedActions] = useState(false);
  const [displayedMenu, setDisplayedMenu] = useState(false);
  const [sortSwitch, setSortSwitch] = useState(false);
  const [displayedFilter, setDisplayedFilter] = useState(false);
  const [openTable, setOpenTable] = useState(true);
  const [filteredValues, setFilteredValues] = useState({});
  const [filterActive, setFilterActive] = useState({});
  const [inputChecked, setInputChecked] = useState([]);
  const [saveFilters, setSaveFilters] = useState([]);
  const [checkedBox, setCheckedBox] = useState(false);
  const [listToRecipe, setListToRecipe] = useState([]);
  const [listToRecipeFinal, setListToRecipeFinal] = useState([]);
  const [displayedAlimentForm, setDisplayedAlimentForm] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [onSend, setOnSend] = useState(false);
  const [redirect, setredirect] = useState(false);
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    automaticCheckedBox();
    showAutomaticCheckedBoxes();
  }, []);
  useEffect(() => {
    if (listToRecipeFinal.length > 0) {
      getAlimentList(listToRecipeFinal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listToRecipeFinal]);

  const hideFor3dOpening = () => {
    setVisibility(!visibility);
  };

  const handleInputSearchOnChange = (e) => {
    e.preventDefault();
    getAliment(e.target.value);
    setAlimentName(e.target.value);
  };

  const modifyRecipeList = (e) => {
    e.preventDefault();
    let sendToRecipe = document.querySelector('input[id=sendToRecipe]');
    let editAliment = document.querySelector('input[id=edit]');

    if (sendToRecipe.checked === true) {
      let ifexist = listToRecipe.find(function (el) {
        return el.Name === alimentName;
      });
      if (ifexist === undefined) {
        setListToRecipe([
          ...listToRecipe,
          { Name: alimentName, _id: alimentID },
        ]);
        setAlimentName('');
        alertPopup(`${alimentName} est sur la table !`, 'success');
      } else {
        alertPopup(`${alimentName} est déjà sur la table`, 'warning');
      }
    } else if (editAliment.checked === true) {
      getAlimentByID(alimentID);
      setTimeout(() => {
        setDisplayedAlimentForm(!displayedAlimentForm);
      }, 300);
    } else if (
      sendToRecipe.checked === false &&
      editAliment.checked === false
    ) {
      setAlimentName('');
    }

    setNotDisplayedActions(!notDisplayedActions);
  };
  const toggledisplayedFormToExport = () => {
    setDisplayedAlimentForm(!displayedAlimentForm);
    setAlimentName('');
  };

  const close = (id = '') => {
    setFilterActive({ ...filterActive, [id]: !filterActive });
    let deleteFilter = saveFilters.filter((obj) => obj.id !== id);
    setSaveFilters(deleteFilter);
  };

  const toggleCheckBox = (name = '') => {
    let inputs = document.getElementsByName(name);
    setCheckedBox(!checkedBox);
    for (let input of inputs) {
      if (input.type === 'checkbox') {
        input.checked = checkedBox;
      }
    }
  };

  const automaticCheckedBox = () => {
    document.getElementById('alimGrpCode').checked = true;
    document.getElementById('alimGrpNom').checked = true;
    document.getElementById('alimSgrpNom').checked = true;
    document.getElementById('energieKcal').checked = true;
    document.getElementById('eauG').checked = true;
    document.getElementById('glucidesG').checked = true;
    document.getElementById('proteinesG').checked = true;
    document.getElementById('lipidesG').checked = true;
    document.getElementById('sucresG').checked = true;
  };

  const showAutomaticCheckedBoxes = () => {
    setTimeout(() => {
      const filtered = [
        ...document.querySelectorAll('input[type=checkbox]:checked'),
      ].map((nut) => nut.id);
      setInputChecked(filtered);
    }, 1000);
  };

  const onSubmitMenu = (e) => {
    e.preventDefault();
    const filtered = [
      ...document.querySelectorAll('input[type="checkbox"]:checked'),
    ].map((nut) => nut.id);
    setInputChecked(filtered);
  };

  const toggle = (id = '') => {
    setDisplayedFilter(!displayedFilter);

    setNutrimentId(id);
    console.log(id);
  };
  const toggleMenu = () => {
    setDisplayedMenu(!displayedMenu);
  };

  const selectAliment = (name, id) => {
    setNotDisplayedActions(!notDisplayedActions);
    setAlimentName(name);
    setAlimentID(id);

    getAlimentByID(alimentID);
  };
  const toggleActionsModal = () => {
    setNotDisplayedActions(!notDisplayedActions);
    setAlimentName('');
  };

  // const toggleNoActive = () => {
  //   setOpenTable(!openTable);
  // };

  const onChangeHandlerFilter = (e) => {
    setFilteredValues({
      ...filteredValues,
      id: nutrimentId,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandle = (e, id = '') => {
    e.preventDefault();
    setFilterActive({ ...filterActive, [id]: true });
    setSaveFilters([...saveFilters, filteredValues]);
    setDisplayedFilter(!displayedFilter);
    e.target.reset();
  };

  const handlesortNutriment = (e) => {
    setSortSwitch(true);
    setNutrimentSelected(e.target.name);

    setSortCount(sortCount + 1);
    if (sortCount === 2) {
      setSortCount(0);
    }
  };
  let checkedToSend = document.querySelectorAll('input[groupe=list]:checked');
  let unCheckedToDelete = document.querySelectorAll(
    'input[groupe=list]:not(:checked)'
  );

  const onListSubmit = (e) => {
    e.preventDefault();

    if (onSend) {
      setListToRecipeFinal([]);
      let obj = [];
      for (let aliment of checkedToSend) {
        let name = aliment.name;
        let id = aliment.id;
        obj = [...obj, { Name: name, _id: id }];
      }
      setListToRecipeFinal(obj);
      listToRecipeStudio = listToRecipeFinal;

      toggleMenu();

      getAlimentList(listToRecipeStudio);
      getAlimentList(listToRecipeStudio);
      alertPopup('votre liste est bien enregistrée', 'success');

      setredirect(!redirect);
    } else if (onDelete) {
      setListToRecipe([]);
      let obj = [];
      for (let aliment of unCheckedToDelete) {
        let Name = aliment.name;
        let id = aliment.id;
        obj = [...obj, { Name: Name, _id: id }];
        setListToRecipe(obj);
      }
      toggleMenu();
      window.confirm(
        'Si vous supprimez ces Aliments de cette liste, ils se  supprimeront également de votre espace de travail du Studio des recettes, êtes vous certain de vouloir réaliser cette action ?'
      );
      setTimeout(() => {
        setOnDelete(!onDelete);
      }, 500);
      setListToRecipeFinal([]);
    }
  };
  //  DYNAMIC STYLE VARIABLES   //  ON BELOW  //  DYNAMIC STYLE VARIABLES
  //  DYNAMIC STYLE VARIABLES   //  ON BELOW  //  DYNAMIC STYLE VARIABLES
  //  DYNAMIC STYLE VARIABLES   //  ON BELOW  //  DYNAMIC STYLE VARIABLES
  const menuIsItOpenedStyle = {
    opacity: visibility ? '1' : '0',
  };
  const alimentActionsStyle = {
    display: ` ${notDisplayedActions ? 'block' : 'none'}`,
    opacity: visibility ? '1' : '0',
  };
  const svgStyle = { color: 'white' };
  //  DYNAMIC STYLE VARIABLES   //  ABOVE  //  DYNAMIC STYLE VARIABLES
  //  DYNAMIC STYLE VARIABLES   //  ABOVE  //  DYNAMIC STYLE VARIABLES
  //  DYNAMIC STYLE VARIABLES   //  ABOVE  //  DYNAMIC STYLE VARIABLES

  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */
  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */
  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */

  return (
    <div className='AlimentBoard'>
      {/* ____________    HERE IS THE MODAL WITH DIFFERENTS FILTERS OF REQUEST _________________ */}
      <Nav hideFor3dOpening={hideFor3dOpening} visibility={visibility} />

      <div
        style={menuIsItOpenedStyle}
        className={`filter ${displayedFilter ? 'displayedFilter' : ''}`}>
        <button
          className='exit'
          onClick={(e) => {
            toggle(nutrimentId);
          }}>
          x
        </button>
        <form
          onSubmit={(e) => {
            onSubmitHandle(e, nutrimentId);
          }}>
          <fieldset>
            <legend>Filtres</legend>
            <label htmlFor='filterSelect'>
              Choisissez Un Filtre:
              <select
                onChange={onChangeHandlerFilter}
                name='filterSelect'
                required
                id='filterSelect'>
                <option value=''>--SVP, Choisissez Un Filtre--</option>
                <option value='eq'>Égal (=) </option>
                <option value='lt'>Inférieur à </option>
                <option value='lte'>Inférieur ou bien Égal </option>
                <option value='gt'>Supérieur à </option>
                <option value='gte'>Supérieur ou bien Égal</option>
              </select>
            </label>
            <label htmlFor='filterNumber'>
              Choose a Value:
              <input
                onChange={onChangeHandlerFilter}
                type='number'
                placeholder='000'
                id='filterNumber'
                required
                name='filterNumber'
                min='0'
                max='1000'></input>
            </label>
          </fieldset>
          <input className='sendFilter' type='submit' value='Ok'></input>
        </form>
      </div>

      {/* ______________________    HERE IS THE MODAL WITH ATIONS SEND TO RECIPE / EDIT AN  DELETE   __________________________ */}

      <div className='alimentActions' style={alimentActionsStyle}>
        <button className='exit' onClick={toggleActionsModal}>
          x
        </button>

        <form onSubmit={modifyRecipeList}>
          <fieldset>
            <legend> {alimentName}</legend>
            <label htmlFor='sendToRecipe'>
              Ajouter à Votre Liste de Recette
              <input type='radio' id='sendToRecipe' name='actions' />
              <span className='checkboxInner'>
                <span className='greenBall'></span>
              </span>
            </label>{' '}
            <label
              onClick={(e) =>
                !isAuthenticated.isAuthenticated ||
                isAuthenticated.isAuthenticated == null ||
                user.user !== 'admin'
                  ? alertPopup('Option Interdite', 'error')
                  : ''
              }
              htmlFor='edit'>
              Modifier Les données de L'Aliment
              {!isAuthenticated.isAuthenticated ||
              isAuthenticated.isAuthenticated == null ||
              user.user !== 'admin' ? (
                ''
              ) : (
                <input type='radio' id='edit' name='actions' />
              )}
              <span className='checkboxInner'>
                <span className='greenBall'></span>
              </span>
            </label>
          </fieldset>
          <input className='validAliment' type='submit' value='Ok'></input>
        </form>
      </div>

      {/* ______________________       HERE IS OUR TABLE WITH ALL ALIMENTS TO STUDY       __________________________ */}

      <div className='pagination' style={menuIsItOpenedStyle}>
        <table className={` ${openTable ? 'openTable' : 'closeTable'}`}>
          <caption>
            {/* <button className='toggleNoActive' onClick={toggleNoActive}>
              x
            </button> */}
            <h2>STUDIO DES ALIMENTS</h2>

            <button className='tableMenu' onClick={toggleMenu}>
              <svg
                style={svgStyle}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 256 256'>
                <rect width='256' height='256' fill='none'></rect>
                <path
                  d='M36.4,98.1a16.3,16.3,0,0,1-3.2-13.5C40.5,49.5,80.4,24,128,24s87.5,25.5,94.8,60.6A16,16,0,0,1,207.2,104H48.8A16.2,16.2,0,0,1,36.4,98.1ZM225,152.6l-20.1,8h0L188,167.4l-37-14.8a7.8,7.8,0,0,0-6,0l-37,14.8L71,152.6a7.8,7.8,0,0,0-6,0l-20.1,8h0l-19.9,8A8,8,0,0,0,28,184a8,8,0,0,0,3-.6l9-3.6V184a40,40,0,0,0,40,40h96a40,40,0,0,0,40-40V173.4l15-6a8,8,0,0,0-6-14.8Zm7-32.6H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Z'
                  fill='white'></path>
              </svg>
              {/* <FontAwesomeIcon icon={faHamburger} /> */}
            </button>
          </caption>
          <thead>
            <tr>
              <th className='alimNom'>
                Aliment-Nom
                <form onSubmit={handleInputSearchOnChange}>
                  <label htmlFor='search-aliment'>
                    <input
                      onChange={handleInputSearchOnChange}
                      placeholder='Rechercher'
                      type='search'
                      id='search-aliment'
                      name='search-aliment'
                      aria-label='Search Aliment'></input>
                  </label>
                </form>
              </th>
              <th
                className='alimGrpCode'
                style={{
                  display: ` ${
                    inputChecked.includes('alimGrpCode') ? '' : 'none'
                  }`,
                }}>
                Aliment Groupe Code
                <button
                  className='sort'
                  name='alimGrpCode'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.alimGrpCode ? 'none' : ''}`,
                  }}
                  onClick={(e) => {
                    toggle('alimGrpCode');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.alimGrpCode ? '' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('alimGrpCode');
                  }}>
                  X
                </button>
              </th>
              <th
                className='alimGrpNom'
                style={{
                  display: ` ${
                    inputChecked.includes('alimGrpNom') ? '' : 'none'
                  }`,
                }}>
                Aliment Groupe Nom
                <button
                  className='sort'
                  name='alimGrpNom'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
              </th>
              <th
                className='alimSgrpNom'
                style={{
                  display: ` ${
                    inputChecked.includes('alimSgrpNom') ? '' : 'none'
                  }`,
                }}>
                Aliment Sous Groupe Nom
                <button
                  className='sort'
                  name='alimSgrpNom'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
              </th>
              <th
                className='energieKcal'
                style={{
                  display: ` ${
                    inputChecked.includes('energieKcal') ? '' : 'none'
                  }`,
                }}>
                Energie (Kcal)
                <button
                  className='sort'
                  name='energieKcal'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.energieKcal ? 'none' : ''}`,
                  }}
                  onClick={(e) => {
                    toggle('energieKcal');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.energieKcal ? '' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('energieKcal');
                  }}>
                  X
                </button>
              </th>
              <th
                className='eauG'
                style={{
                  display: ` ${inputChecked.includes('eauG') ? '' : 'none'}`,
                }}>
                Eau (g)
                <button
                  className='sort'
                  name='eauG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.eauG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('eauG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.eauG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('eauG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='proteinesG'
                style={{
                  display: ` ${
                    inputChecked.includes('proteinesG') ? '' : 'none'
                  }`,
                }}>
                Protéines (g)
                <button
                  className='sort'
                  name='proteinesG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.proteinesG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('proteinesG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.proteinesG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('proteinesG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='glucidesG'
                style={{
                  display: ` ${
                    inputChecked.includes('glucidesG') ? '' : 'none'
                  }`,
                }}>
                Glucides (g)
                <button
                  className='sort'
                  name='glucidesG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.glucidesG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('glucidesG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.glucidesG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('glucidesG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='lipidesG'
                style={{
                  display: ` ${
                    inputChecked.includes('lipidesG') ? '' : 'none'
                  }`,
                }}>
                Lipides (g)
                <button
                  className='sort'
                  name='lipidesG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.lipidesG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('lipidesG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.lipidesG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('lipidesG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='sucresG'
                style={{
                  display: ` ${inputChecked.includes('sucresG') ? '' : 'none'}`,
                }}>
                Sucres (g)
                <button
                  className='sort'
                  name='sucresG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.sucresG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('sucresG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.sucresG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('sucresG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='fructoseG'
                style={{
                  display: ` ${
                    inputChecked.includes('fructoseG') ? '' : 'none'
                  }`,
                }}>
                fructose (g)
                <button
                  className='sort'
                  name='fructoseG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.fructoseG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('fructoseG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.fructoseG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('fructoseG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='galactoseG'
                style={{
                  display: ` ${
                    inputChecked.includes('galactoseG') ? '' : 'none'
                  }`,
                }}>
                galactose (g)
                <button
                  className='sort'
                  name='galactoseG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.galactoseG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('galactoseG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.galactoseG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('galactoseG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='glucoseG'
                style={{
                  display: ` ${
                    inputChecked.includes('glucoseG') ? '' : 'none'
                  }`,
                }}>
                glucose (g)
                <button
                  className='sort'
                  name='glucoseG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.glucoseG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('glucoseG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.glucoseG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('glucoseG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='lactoseG'
                style={{
                  display: ` ${
                    inputChecked.includes('lactoseG') ? '' : 'none'
                  }`,
                }}>
                lactose (g)
                <button
                  className='sort'
                  name='lactoseG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.lactoseG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('lactoseG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.lactoseG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('lactoseG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='maltoseG'
                style={{
                  display: ` ${
                    inputChecked.includes('maltoseG') ? '' : 'none'
                  }`,
                }}>
                maltose (g)
                <button
                  className='sort'
                  name='maltoseG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.maltoseG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('maltoseG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.maltoseG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('maltoseG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='saccharoseG'
                style={{
                  display: ` ${
                    inputChecked.includes('saccharoseG') ? '' : 'none'
                  }`,
                }}>
                saccharose (g)
                <button
                  className='sort'
                  name='saccharoseG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.saccharoseG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('saccharoseG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.saccharoseG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('saccharoseG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='amidonG'
                style={{
                  display: ` ${inputChecked.includes('amidonG') ? '' : 'none'}`,
                }}>
                amidon (g)
                <button
                  className='sort'
                  name='amidonG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.amidonG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('amidonG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.amidonG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('amidonG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='fibresAlimentairesG'
                style={{
                  display: ` ${
                    inputChecked.includes('fibresAlimentairesG') ? '' : 'none'
                  }`,
                }}>
                fibresAlimentaires (g)
                <button
                  className='sort'
                  name='fibresAlimentairesG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.fibresAlimentairesG ? 'none' : 'block'
                    }`,
                  }}
                  onClick={(e) => {
                    toggle('fibresAlimentairesG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.fibresAlimentairesG ? 'block' : 'none'
                    }`,
                  }}
                  onClick={(e) => {
                    close('fibresAlimentairesG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='polyolsTotauxG'
                style={{
                  display: ` ${
                    inputChecked.includes('polyolsTotauxG') ? '' : 'none'
                  }`,
                }}>
                polyolsTotaux (g)
                <button
                  className='sort'
                  name='polyolsTotauxG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.polyolsTotauxG ? 'none' : 'block'
                    }`,
                  }}
                  onClick={(e) => {
                    toggle('polyolsTotauxG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.fibresAlimentairesG ? 'block' : 'none'
                    }`,
                  }}
                  onClick={(e) => {
                    close('polyolsTotauxG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='alcoolG'
                style={{
                  display: ` ${inputChecked.includes('alcoolG') ? '' : 'none'}`,
                }}>
                alcool (g)
                <button
                  className='sort'
                  name='alcoolG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.alcoolG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('alcoolG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.alcoolG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('alcoolG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='acidesOrganiquesG'
                style={{
                  display: ` ${
                    inputChecked.includes('acidesOrganiquesG') ? '' : 'none'
                  }`,
                }}>
                acidesOrganiques (g)
                <button
                  className='sort'
                  name='acidesOrganiquesG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.acidesOrganiquesG ? 'none' : 'block'
                    }`,
                  }}
                  onClick={(e) => {
                    toggle('acidesOrganiquesG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.acidesOrganiquesG ? 'block' : 'none'
                    }`,
                  }}
                  onClick={(e) => {
                    close('acidesOrganiquesG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='agSaturesG'
                style={{
                  display: ` ${
                    inputChecked.includes('agSaturesG') ? '' : 'none'
                  }`,
                }}>
                agSatures (g)
                <button
                  className='sort'
                  name='agSaturesG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.agSaturesG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('agSaturesG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.agSaturesG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('agSaturesG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='agMonoinsaturésG'
                style={{
                  display: ` ${
                    inputChecked.includes('agMonoinsaturésG') ? '' : 'none'
                  }`,
                }}>
                agMonoinsaturés (g)
                <button
                  className='sort'
                  name='agMonoinsaturésG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.agMonoinsaturésG ? 'none' : 'block'
                    }`,
                  }}
                  onClick={(e) => {
                    toggle('agMonoinsaturésG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.agMonoinsaturésG ? 'block' : 'none'
                    }`,
                  }}
                  onClick={(e) => {
                    close('agMonoinsaturésG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='agPolyinsaturésG'
                style={{
                  display: ` ${
                    inputChecked.includes('agPolyinsaturésG') ? '' : 'none'
                  }`,
                }}>
                agPolyinsaturés (g)
                <button
                  className='sort'
                  name='agPolyinsaturésG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.agPolyinsaturésG ? 'none' : 'block'
                    }`,
                  }}
                  onClick={(e) => {
                    toggle('agPolyinsaturésG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.agPolyinsaturésG ? 'block' : 'none'
                    }`,
                  }}
                  onClick={(e) => {
                    close('agPolyinsaturésG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='agButyriqueG'
                style={{
                  display: ` ${
                    inputChecked.includes('agButyriqueG') ? '' : 'none'
                  }`,
                }}>
                agButyrique (g)
                <button
                  className='sort'
                  name='agButyriqueG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.agButyriqueG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('agButyriqueG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.agButyriqueG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('agButyriqueG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='agCaproiqueG'
                style={{
                  display: ` ${
                    inputChecked.includes('agCaproiqueG') ? '' : 'none'
                  }`,
                }}>
                agCaproiqueG (g)
                <button
                  className='sort'
                  name='agCaproiqueG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.agCaproiqueG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('agCaproiqueG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.agCaproiqueG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('agCaproiqueG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='agCapryliqueG'
                style={{
                  display: ` ${
                    inputChecked.includes('agCapryliqueG') ? '' : 'none'
                  }`,
                }}>
                agCaprylique (g)
                <button
                  className='sort'
                  name='agCapryliqueG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.agCapryliqueG ? 'none' : 'block'
                    }`,
                  }}
                  onClick={(e) => {
                    toggle('agCapryliqueG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.agCapryliqueG ? 'block' : 'none'
                    }`,
                  }}
                  onClick={(e) => {
                    close('agCapryliqueG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='agCapriqueG'
                style={{
                  display: ` ${
                    inputChecked.includes('agCapriqueG') ? '' : 'none'
                  }`,
                }}>
                agCaprique (g)
                <button
                  className='sort'
                  name='agCapriqueG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.agCapriqueG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('agCapriqueG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.agCapriqueG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('agCapriqueG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='agLauriqueG'
                style={{
                  display: ` ${
                    inputChecked.includes('agLauriqueG') ? '' : 'none'
                  }`,
                }}>
                agLaurique (g)
                <button
                  className='sort'
                  name='agLauriqueG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.agLauriqueG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('agLauriqueG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.agLauriqueG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('agLauriqueG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='agMyristiqueG'
                style={{
                  display: ` ${
                    inputChecked.includes('agMyristiqueG') ? '' : 'none'
                  }`,
                }}>
                agMyristique (g)
                <button
                  className='sort'
                  name='agMyristiqueG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.agMyristiqueG ? 'none' : 'block'
                    }`,
                  }}
                  onClick={(e) => {
                    toggle('agMyristiqueG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.agMyristiqueG ? 'block' : 'none'
                    }`,
                  }}
                  onClick={(e) => {
                    close('agMyristiqueG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='agPalmitiqueG'
                style={{
                  display: ` ${
                    inputChecked.includes('agPalmitiqueG') ? '' : 'none'
                  }`,
                }}>
                agPalmitique (g)
                <button
                  className='sort'
                  name='agPalmitiqueG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.agPalmitiqueG ? 'none' : 'block'
                    }`,
                  }}
                  onClick={(e) => {
                    toggle('agPalmitiqueG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${
                      filterActive.agPalmitiqueG ? 'block' : 'none'
                    }`,
                  }}
                  onClick={(e) => {
                    close('agPalmitiqueG');
                  }}>
                  X
                </button>
              </th>
              <th
                className='agSteariqueG'
                style={{
                  display: ` ${
                    inputChecked.includes('agSteariqueG') ? '' : 'none'
                  }`,
                }}>
                agStearique (g)
                <button
                  className='sort'
                  name='agSteariqueG'
                  onClick={handlesortNutriment}>
                  ⭥
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.agSteariqueG ? 'none' : 'block'}`,
                  }}
                  onClick={(e) => {
                    toggle('agSteariqueG');
                  }}>
                  ☰
                </button>
                <button
                  className='bars'
                  style={{
                    display: ` ${filterActive.agSteariqueG ? 'block' : 'none'}`,
                  }}
                  onClick={(e) => {
                    close('agSteariqueG');
                  }}>
                  X
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {/*   —————————————————————— HERE IS THE MAPPING TO GET ALL THE ALIMENTS IN OUR TAB  ———————————————————————*/}

            {aliments &&
              aliments.map((alim) => {
                return (
                  <tr
                    onClick={(e) => {
                      selectAliment(alim.alimNom, alim._id);
                    }}
                    key={alim._id}>
                    <td className='alimNom'>{alim.alimNom}</td>
                    <td
                      className='alimGrpCode'
                      style={{
                        display: ` ${
                          inputChecked.includes('alimGrpCode') ? '' : 'none'
                        }`,
                      }}>
                      {alim.alimGrpCode}{' '}
                    </td>
                    <td
                      className='alimGrpNom'
                      style={{
                        display: ` ${
                          inputChecked.includes('alimGrpNom') ? '' : 'none'
                        }`,
                      }}>
                      {alim.alimGrpNom}
                    </td>
                    <td
                      className='alimSgrpNom'
                      style={{
                        display: ` ${
                          inputChecked.includes('alimSgrpNom') ? '' : 'none'
                        }`,
                      }}>
                      {alim.alimSgrpNom}
                    </td>
                    <td
                      className='energieKcal'
                      style={{
                        display: ` ${
                          inputChecked.includes('energieKcal') ? '' : 'none'
                        }`,
                      }}>
                      {alim.energieKcal}
                    </td>
                    <td
                      className='eauG'
                      style={{
                        display: ` ${
                          inputChecked.includes('eauG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.eauG}
                    </td>
                    <td
                      className='proteinesG'
                      style={{
                        display: ` ${
                          inputChecked.includes('proteinesG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.proteinesG}
                    </td>
                    <td
                      className='glucidesG'
                      style={{
                        display: ` ${
                          inputChecked.includes('glucidesG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.glucidesG}
                    </td>
                    <td
                      className='lipidesG'
                      style={{
                        display: ` ${
                          inputChecked.includes('lipidesG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.lipidesG}
                    </td>
                    <td
                      className='sucresG'
                      style={{
                        display: ` ${
                          inputChecked.includes('sucresG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.sucresG}
                    </td>
                    <td
                      className='fructoseG'
                      style={{
                        display: ` ${
                          inputChecked.includes('fructoseG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.fructoseG}
                    </td>
                    <td
                      className='galactoseG'
                      style={{
                        display: ` ${
                          inputChecked.includes('galactoseG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.galactoseG}
                    </td>
                    <td
                      className='glucoseG'
                      style={{
                        display: ` ${
                          inputChecked.includes('glucoseG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.glucoseG}
                    </td>
                    <td
                      className='lactoseG'
                      style={{
                        display: ` ${
                          inputChecked.includes('lactoseG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.lactoseG}
                    </td>
                    <td
                      className='maltoseG'
                      style={{
                        display: ` ${
                          inputChecked.includes('maltoseG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.maltoseG}
                    </td>
                    <td
                      className='saccharoseG'
                      style={{
                        display: ` ${
                          inputChecked.includes('saccharoseG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.saccharoseG}
                    </td>
                    <td
                      className='amidonG'
                      style={{
                        display: ` ${
                          inputChecked.includes('amidonG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.amidonG}
                    </td>
                    <td
                      className='fibresAlimentairesG'
                      style={{
                        display: ` ${
                          inputChecked.includes('fibresAlimentairesG')
                            ? ''
                            : 'none'
                        }`,
                      }}>
                      {alim.fibresAlimentairesG}
                    </td>
                    <td
                      className='polyolsTotauxG'
                      style={{
                        display: ` ${
                          inputChecked.includes('polyolsTotauxG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.polyolsTotauxG}
                    </td>
                    <td
                      className='alcoolG'
                      style={{
                        display: ` ${
                          inputChecked.includes('alcoolG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.alcoolG}
                    </td>
                    <td
                      className='acidesOrganiquesG'
                      style={{
                        display: ` ${
                          inputChecked.includes('acidesOrganiquesG')
                            ? ''
                            : 'none'
                        }`,
                      }}>
                      {alim.acidesOrganiquesG}
                    </td>
                    <td
                      className='agSaturesG'
                      style={{
                        display: ` ${
                          inputChecked.includes('agSaturesG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.agSaturesG}
                    </td>
                    <td
                      className='agMonoinsaturésG'
                      style={{
                        display: ` ${
                          inputChecked.includes('agMonoinsaturésG')
                            ? ''
                            : 'none'
                        }`,
                      }}>
                      {alim.agMonoinsaturésG}
                    </td>
                    <td
                      className='agPolyinsaturésG'
                      style={{
                        display: ` ${
                          inputChecked.includes('agPolyinsaturésG')
                            ? ''
                            : 'none'
                        }`,
                      }}>
                      {alim.agPolyinsaturésG}
                    </td>
                    <td
                      className='agButyriqueG'
                      style={{
                        display: ` ${
                          inputChecked.includes('agButyriqueG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.agButyriqueG}
                    </td>
                    <td
                      className='agCaproiqueG'
                      style={{
                        display: ` ${
                          inputChecked.includes('agCaproiqueG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.agCaproiqueG}
                    </td>
                    <td
                      className='agCapryliqueG'
                      style={{
                        display: ` ${
                          inputChecked.includes('agCapryliqueG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.agCapryliqueG}
                    </td>
                    <td
                      className='agCapriqueG'
                      style={{
                        display: ` ${
                          inputChecked.includes('agCapriqueG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.agCapriqueG}
                    </td>
                    <td
                      className='agLauriqueG'
                      style={{
                        display: ` ${
                          inputChecked.includes('agLauriqueG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.agLauriqueG}
                    </td>
                    <td
                      className='agMyristiqueG'
                      style={{
                        display: ` ${
                          inputChecked.includes('agMyristiqueG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.agMyristiqueG}
                    </td>
                    <td
                      className='agPalmitiqueG'
                      style={{
                        display: ` ${
                          inputChecked.includes('agPalmitiqueG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.agPalmitiqueG}
                    </td>
                    <td
                      className='agSteariqueG'
                      style={{
                        display: ` ${
                          inputChecked.includes('agSteariqueG') ? '' : 'none'
                        }`,
                      }}>
                      {alim.agSteariqueG}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* ________________________________       HERE IS THE MODAL WITH OPTIONS DISPLAYER          ____________________________ */}

        <div
          className='menu'
          style={{
            display: `${displayedMenu ? 'flex' : 'none'}`,
            opacity: visibility ? '1' : '0',
          }}>
          <h2>OPTIONS +</h2>

          <section>
            <h3>Liste Des Aliments Pour Votre Recette</h3>
            <form onSubmit={onListSubmit}>
              <fieldset>
                <legend>Votre Liste </legend>
                {listToRecipe.length === 0 ? (
                  <label>Mince Alors ! Votre Liste Est Vide</label>
                ) : (
                  ''
                )}
                {listToRecipe.map((element) => {
                  return (
                    <Fragment key={element._id}>
                      <label htmlFor={element._id}>
                        {element.Name}
                        <input
                          type='checkbox'
                          id={element._id}
                          name={element.Name}
                          groupe='list'
                          value={element.Name}
                        />
                        <span className='checkboxInner'>
                          <span className='greenBall'></span>
                        </span>
                      </label>
                    </Fragment>
                  );
                })}
              </fieldset>
              {listToRecipe.length === 0 ? (
                ''
              ) : (
                <fieldset>
                  <legend>Que Voulez Vous faire ?</legend>
                  <label>
                    Envoyer Les Aliments Selectionnés Et Se Rendre Au Studio Des
                    Recettes
                    <input
                      className='sendMenu'
                      type='submit'
                      value='Envoyer'
                      onClick={(e) => {
                        setOnSend(!onSend);
                      }}></input>
                    {redirect ? (
                      <Navigate to='/recettes-studio'></Navigate>
                    ) : (
                      ''
                    )}
                  </label>

                  <label>
                    Supprimer De La Liste Les Aliments Selectionnés
                    <input
                      className='sendMenu'
                      type='submit'
                      value='Supprimer'
                      onClick={(e) => {
                        setOnDelete(!onDelete);
                      }}></input>
                  </label>
                </fieldset>
              )}
            </form>
            <h3>Selectionnez Les Nutriments à Afficher</h3>
            <form onSubmit={onSubmitMenu}>
              <fieldset>
                <legend>Classification </legend>{' '}
                <label htmlFor='allClassification'>
                  Tout Selectionner
                  <input
                    type='checkbox'
                    id='allClassification'
                    name='classification'
                    onChange={(e) => {
                      toggleCheckBox('classification');
                    }}
                  />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='alimGrpCode'>
                  Groupe Code de l'Aliment
                  <input
                    type='checkbox'
                    id='alimGrpCode'
                    name='classification'
                  />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='alimGrpNom'>
                  Groupe Nom de l'Aliment
                  <input
                    type='checkbox'
                    id='alimGrpNom'
                    name='classification'
                  />{' '}
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='alimSgrpNom'>
                  Sous-Groupe Nom de l'Aliment
                  <input
                    type='checkbox'
                    id='alimSgrpNom'
                    name='classification'
                  />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='alimSgrpCode'>
                  Sous-Groupe Code de l'Aliment
                  <input
                    type='checkbox'
                    id='alimSgrpCode'
                    name='classification'
                  />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='alimSSgrpNom'>
                  Sous-Sous-Groupe Nom de l'Aliment
                  <input
                    type='checkbox'
                    id='alimSSgrpNom'
                    name='classification'
                  />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='alimSSgrpCode'>
                  Sous-Sous-Groupe Code de l'Aliment
                  <input
                    type='checkbox'
                    id='alimSSgrpCode'
                    name='classification'
                  />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
              </fieldset>
              <fieldset>
                <legend>Divers</legend>
                <label htmlFor='energieKcal'>
                  Energie en Kcal
                  <input type='checkbox' id='energieKcal' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='fibresAlimentairesG'>
                  Fibres Alimentaires en Grammes
                  <input type='checkbox' id='fibresAlimentairesG' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='alcoolG'>
                  Alcool en Grammes
                  <input type='checkbox' id='alcoolG' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='acidesOrganiquesG'>
                  Acides Organiques en Grammes
                  <input type='checkbox' id='acidesOrganiquesG' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='eauG'>
                  Eau en Grammes
                  <input type='checkbox' id='eauG' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='iG'>
                  Index Glycémique
                  <input type='checkbox' id='iG' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
              </fieldset>
              <fieldset>
                <legend>Macro-Nutriments (énergétiques)</legend>
                <label htmlFor='proteinesG'>
                  Protéines en Grammes
                  <input type='checkbox' id='proteinesG' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>

                <label htmlFor='glucidesG'>
                  Glucides en Grammes
                  <input type='checkbox' id='glucidesG' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='lipidesG'>
                  Lipides en Grammes
                  <input type='checkbox' id='lipidesG' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
              </fieldset>
              <fieldset>
                <legend>Les glucides en Détail</legend>
                <label htmlFor='allGlucides'>
                  Tout Selectionner
                  <input
                    type='checkbox'
                    id='allGlucides'
                    name='allGlucides'
                    onChange={(e) => {
                      toggleCheckBox('allGlucides');
                    }}
                  />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='sucresG'>
                  Sucres en Grammes
                  <input type='checkbox' id='sucresG' name='allGlucides' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <fieldset>
                  <legend>Glucides simples en Détail (sucres)</legend>
                  <label htmlFor='fructoseG'>
                    Fructose en Grammes
                    <input type='checkbox' id='fructoseG' name='allGlucides' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='glucoseG'>
                    Glucose en Grammes
                    <input type='checkbox' id='glucoseG' name='allGlucides' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='lactoseG'>
                    Lactose en Grammes
                    <input type='checkbox' id='lactoseG' name='allGlucides' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='maltoseG'>
                    Maltose en Grammes
                    <input type='checkbox' id='maltoseG' name='allGlucides' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='saccharoseG'>
                    Saccharoose en Grammes
                    <input
                      type='checkbox'
                      id='saccharoseG'
                      name='allGlucides'
                    />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='polyolsTotauxG'>
                    Polyols Totaux en Grammes
                    <input
                      type='checkbox'
                      id='polyolsTotauxG'
                      name='allGlucides'
                    />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                </fieldset>
                <fieldset>
                  <legend>Glucides complexes en Détail</legend>

                  <label htmlFor='amidonG'>
                    Amidon en Grammes
                    <input type='checkbox' id='amidonG' name='allGlucides' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='galactoseG'>
                    Galactose en Grammes
                    <input type='checkbox' id='galactoseG' name='allGlucides' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                </fieldset>
              </fieldset>
              <fieldset>
                <legend> Les lipides en Détail</legend>
                <label htmlFor='agSaturesG'>
                  Acides Gras Saturés en Grammes
                  <input type='checkbox' id='agSaturesG' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='agMonoinsaturésG'>
                  Acides Gras Mono-Insaturés en Grammes
                  <input type='checkbox' id='agMonoinsaturésG' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='agPolyinsaturésG'>
                  Acides Gras Poly-Insaturés en Grammes
                  <input type='checkbox' id='agPolyinsaturésG' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='cholesterolMg'>
                  Cholesterol en MilliGrammes
                  <input type='checkbox' id='cholesterolMg' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <fieldset>
                  <legend> Les acides Gras saturés en Détail</legend>
                  <label htmlFor='allAgS'>
                    Tout Selectionner
                    <input
                      type='checkbox'
                      id='allAgS'
                      name='allAgS'
                      onChange={(e) => {
                        toggleCheckBox('allAgS');
                      }}
                    />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agButyriqueG'>
                    Acides Gras Butyrique [4:0] en Grammes
                    <input type='checkbox' id='agButyriqueG' name='allAgS' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agCaproiqueG'>
                    Acides Gras Caproïque [6:0] en Grammes
                    <input type='checkbox' id='agCaproiqueG' name='allAgS' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agCapryliqueG'>
                    Acides Gras Caprylique [8:0] en Grammes
                    <input type='checkbox' id='agCapryliqueG' name='allAgS' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agCapriqueG'>
                    Acides Gras Caprique [10:0] en Grammes
                    <input type='checkbox' id='agCapriqueG' name='allAgS' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agLauriqueG'>
                    Acides Gras Laurique [12:0] en Grammes
                    <input type='checkbox' id='agLauriqueG' name='allAgS' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agMyristiqueG'>
                    Acides Gras Myristique [14:0] en Grammes
                    <input type='checkbox' id='agMyristiqueG' name='allAgS' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agPalmitiqueG'>
                    Acides Gras Palmitique [16:0] en Grammes
                    <input type='checkbox' id='agPalmitiqueG' name='allAgS' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agSteariqueG'>
                    Acides Gras Stéarique [18:0] en Grammes
                    <input type='checkbox' id='agSteariqueG' name='allAgS' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                </fieldset>
                <fieldset>
                  <legend> Les acides Gras Mono-Insaturés en Détail</legend>{' '}
                  <label htmlFor='agOleiqueG'>
                    Acides Gras OleiqueG [C18:1 / ω-9] en Grammes
                    <input type='checkbox' id='agOleiqueG' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                </fieldset>
                <fieldset>
                  <legend> Les acides Gras Poly-Insaturés en Détail</legend>
                  <label htmlFor='allAgPi'>
                    Tout Selectionner
                    <input
                      type='checkbox'
                      id='allAgPi'
                      name='allAgPi'
                      onChange={(e) => {
                        toggleCheckBox('allAgPi');
                      }}
                    />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agLinoleiqueG'>
                    Acides Gras Linoléique [C18:2 / ω-6] en Grammes
                    <input type='checkbox' id='agLinoleiqueG' name='allAgPi' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agAlphalinoleniqueG'>
                    Acides Gras Alphalinolénique [C18:3 / ω-3] en Grammes
                    <input
                      type='checkbox'
                      id='agAlphalinoleniqueG'
                      name='allAgPi'
                    />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agArachidoniqueG'>
                    Acides Gras Arachidonique [C20:4 / ω-6] en Grammes
                    <input
                      type='checkbox'
                      id='agArachidoniqueG'
                      name='allAgPi'
                    />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agEpaG'>
                    EPA / Acides Gras Eicosapentaénoïque [C20:5 / ω-3] en
                    Grammes
                    <input type='checkbox' id='agEpaG' name='allAgPi' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                  <label htmlFor='agDhaG'>
                    DHA / Acides Gras Docosahexaénoïque [C22:6 / ω-3] en Grammes
                    <input type='checkbox' id='agDhaG' name='allAgPi' />
                    <span className='checkboxInner'>
                      <span className='greenBall'></span>
                    </span>
                  </label>
                </fieldset>
              </fieldset>
              <fieldset>
                <legend>Minéraux / Oligo-Elements</legend>
                <label htmlFor='allOligo'>
                  Tout Selectionner
                  <input
                    type='checkbox'
                    id='allOligo'
                    name='allOligo'
                    onChange={(e) => {
                      toggleCheckBox('allOligo');
                    }}
                  />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='selChlorureDeSodiumG'>
                  Sel / Chlorure de Sodium en Grammmes
                  <input
                    type='checkbox'
                    id='selChlorureDeSodiumG'
                    name='allOligo'
                  />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='calciumMg'>
                  Calcium en MilliGrammmes
                  <input type='checkbox' id='calciumMg' name='allOligo' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='chlorureMg'>
                  Chlorure en MilliGrammmes
                  <input type='checkbox' id='chlorureMg' name='allOligo' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='cuivreMg'>
                  Cuivre en MilliGrammmes
                  <input type='checkbox' id='cuivreMg' name='allOligo' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='ferMg'>
                  Fer en MilliGrammmes
                  <input type='checkbox' id='ferMg' name='allOligo' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='iodeµg'>
                  Iode en MicroGrammmes
                  <input type='checkbox' id='iodeµg' name='allOligo' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='magnesiumMg'>
                  Magnésium en MilliGrammmes
                  <input type='checkbox' id='magnesiumMg' name='allOligo' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='manganeseMg'>
                  Manganèse en MilliGrammmes
                  <input type='checkbox' id='manganeseMg' name='allOligo' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='phosphoreMg'>
                  Phosphore en MilliGrammmes
                  <input type='checkbox' id='phosphoreMg' name='allOligo' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='potassiumMg'>
                  Potassium en MilliGrammmes
                  <input type='checkbox' id='potassiumMg' name='allOligo' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>{' '}
                <label htmlFor='seleniumµg'>
                  Sélénium en MicroGrammmes
                  <input type='checkbox' id='seleniumµg' name='allOligo' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='sodiumMg'>
                  Sodium en MilliGrammmes
                  <input type='checkbox' id='sodiumMg' name='allOligo' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='zincMg'>
                  Zinc en MilliGrammmes
                  <input type='checkbox' id='zincMg' name='allOligo' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>{' '}
              </fieldset>
              <fieldset>
                <legend> Vitamines</legend>
                <label htmlFor='allVitamines'>
                  Tout Selectionner
                  <input
                    type='checkbox'
                    id='allVitamines'
                    name='allVitamines'
                    onChange={(e) => {
                      toggleCheckBox('allVitamines');
                    }}
                  />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>{' '}
                <label htmlFor='retinolµg'>
                  Retinol en MicroGrammes
                  <input type='checkbox' id='retinolµg' name='allVitamines' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='betaCaroteneµg'>
                  Béta-Carotène en MicroGrammes
                  <input
                    type='checkbox'
                    id='betaCaroteneµg'
                    name='allVitamines'
                  />{' '}
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>{' '}
                <label htmlFor='vitamineDµg'>
                  Vitamine D en MicroGrammes
                  <input type='checkbox' id='vitamineDµg' name='allVitamines' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>{' '}
                <label htmlFor='vitamineEmg'>
                  Vitamine E en MicroGrammes
                  <input type='checkbox' id='vitamineEmg' name='allVitamines' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='vitamineK1µg'>
                  Vitamine K1 en MicroGrammes
                  <input
                    type='checkbox'
                    id='vitamineK1µg'
                    name='allVitamines'
                  />{' '}
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>{' '}
                <label htmlFor='vitamineK2µg'>
                  Vitamine K2 en MicroGrammes
                  <input
                    type='checkbox'
                    id='vitamineK2µg'
                    name='allVitamines'
                  />{' '}
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>{' '}
                <label htmlFor='vitamineCmg'>
                  Vitamine C en MilliGrammes
                  <input type='checkbox' id='vitamineCmg' name='allVitamines' />
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='vitamineB1ThiamineMg'>
                  Vitamine B1 / thiamine en MilliGrammes
                  <input
                    type='checkbox'
                    id='vitamineB1ThiamineMg'
                    name='allVitamines'
                  />{' '}
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='vitamineB2RiboflavineMg'>
                  Vitamine B2 / Riboflavine en MilliGrammes
                  <input
                    type='checkbox'
                    id='vitamineB2RiboflavineMg'
                    name='allVitamines'
                  />{' '}
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='vitamineB3PpNiacineMg'>
                  Vitamine B3/ PP/ Niacine en MilliGrammes
                  <input
                    type='checkbox'
                    id='vitamineB3PpNiacineMg'
                    name='allVitamines'
                  />{' '}
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>{' '}
                <label htmlFor='vitamineB5AcidePantotheniqueMg'>
                  Vitamine B5 Acide Pantothenique en MilliGrammes
                  <input
                    type='checkbox'
                    id='vitamineB5AcidePantotheniqueMg'
                    name='allVitamines'
                  />{' '}
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>{' '}
                <label htmlFor='vitamineB6Mg'>
                  Vitamine B6 en MilliGrammes
                  <input
                    type='checkbox'
                    id='vitamineB6Mg'
                    name='allVitamines'
                  />{' '}
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>
                <label htmlFor='vitamineB9FolatesTotauxµg'>
                  Vitamine B9 Folates Totaux en MicroGrammes
                  <input
                    type='checkbox'
                    id='vitamineB9FolatesTotauxµg'
                    name='allVitamines'
                  />{' '}
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>{' '}
                <label htmlFor='vitamineB12µg'>
                  Vitamine B12 en MicroGrammes
                  <input
                    type='checkbox'
                    id='vitamineB12µg'
                    name='allVitamines'
                  />{' '}
                  <span className='checkboxInner'>
                    <span className='greenBall'></span>
                  </span>
                </label>{' '}
              </fieldset>
              <input
                className='sendMenu'
                type='submit'
                value='Valider'
                onClick={toggleMenu}></input>
            </form>
          </section>
          <button className='menuExit' onClick={toggleMenu}>
            x
          </button>
        </div>

        <Pagination
          alimentName={alimentName}
          sortSwitch={sortSwitch}
          sortCount={sortCount}
          nutrimentSelected={nutrimentSelected}
          saveFilters={saveFilters}
          handleInputSearchOnChange={handleInputSearchOnChange}
        />
      </div>

      {/* ______________________       HERE IS THE COMPONENT WITH THE ALIMENT FORM FOR UPDATING ONLY      __________________________ */}

      <AlimentForm
        alimentName={alimentName}
        alimentID={alimentID}
        listToRecipe={listToRecipe}
        displayedAlimentForm={displayedAlimentForm}
        toggledisplayedFormToExport={toggledisplayedFormToExport}
        openTable={openTable}
      />
      <img
        id='recipeImg'
        style={menuIsItOpenedStyle}
        src={recipe}
        alt='recipe'></img>
    </div>
  );
};

AlimentBoard.propTypes = {
  aliments: PropTypes.object.isRequired,
  getAliment: PropTypes.func.isRequired,
  getAlimentByID: PropTypes.func.isRequired,
};

// SHOW THE STATE WHICH I NEED, HERE IS THE ALIMENT'S ONE =>

const mapStateToProps = (state) => ({
  aliments: state.allAliments,
  listToRecipeStudio: state.allAliments,
  name: state.allAliments,
  isAuthenticated: state.auth,
  user: state.auth,
});

export default connect(mapStateToProps, {
  getAliment,
  getAlimentByID,
  getAlimentList,
})(AlimentBoard);
