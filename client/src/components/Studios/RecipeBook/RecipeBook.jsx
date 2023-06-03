/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import './recipeBook.css';
import recipeBookImg from '../../../assets/img/recipeBookWhiteFinal2.png';
import svgHat from '../../../assets/img/dish-cap.svg';
import svgMoney from '../../../assets/img/euro-money-bag.svg';
import svgSandTime from '../../../assets/img/sandTime.svg';
import svgOneStar from '../../../assets/img/oneStar.svg';
import svgTwoStars from '../../../assets/img/twoStars.svg';
import svgThreeStars from '../../../assets/img/threeStars.svg';
import svgOneEuro from '../../../assets/img/oneEuro.svg';
import svgTwoEuros from '../../../assets/img/twoEuros.svg';
import svgThreeEuros from '../../../assets/img/threeEuros.svg';
import injectStyle from '../../../assets/fonctions/injectStyle';
import { alertPopup } from '../../../assets/fonctions/alertPopup.js';
import Nav from '../../globalComponents/navigation/Nav';

import Recipe from '../../multiFonctionComponents/Recipes/Recipe/Recipe';
import { getAliment, getAlimentByID } from '../../../redux/actions/aliments';
import {
  getRecipe,
  updateRecipe,
  getRecipeByID,
} from '../../../redux/actions/recipes';

const RecipeBook = ({
  recipes: { recipes },

  getRecipeByID,
  getRecipe,
}) => {
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                     __________________________ */
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                       __________________________ */
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                       __________________________ */

  const [searchByNameRecipeBookOpen, setSearchByNameRecipeBookOpen] =
    useState(false);
  const [searchByCategoryRecipeBookOpen, setSearchByCategoryRecipeBookOpen] =
    useState(false);
  const [searchByNutrientsRecipeBookOpen, setSearchByNutrientsRecipeBookOpen] =
    useState(false);
  const [recipeName, setRecipeName] = useState('');
  const [recipeActived, setrecipeActived] = useState('');
  const [count, setCount] = useState(0);
  const [animationSearchByName, setAnimationSearchByName] = useState(true);
  const [visibility, setVisibility] = useState(true);
  const hideFor3dOpening = () => {
    setVisibility(!visibility);
  };

  const optionNotDispo = () => {
    alertPopup('Option bientôt disponible :)', 'info');
  };

  const toggleSearchByNameRecipeBookOpen = () => {
    setSearchByNameRecipeBookOpen(!searchByNameRecipeBookOpen);

    setAnimationSearchByName(true);
  };
  const toggleSearchByCategoryRecipeBookOpen = () => {
    setSearchByCategoryRecipeBookOpen(!searchByCategoryRecipeBookOpen);
  };
  const toggleSearchByNutrientsRecipeBookOpen = () => {
    setSearchByNutrientsRecipeBookOpen(!searchByNutrientsRecipeBookOpen);
  };
  // console.log(recipes);
  useEffect(() => {
    getRecipe(recipeName);
    if (recipeActived === '') getRecipeByID('647793938dfd6b0bc5c00525');
  }, [recipeName]);

  const handleInputSearchOnChange = (e) => {
    e.preventDefault();
    getRecipe(e.target.value);
    setRecipeName(e.target.value);
    setAnimationSearchByName(false);
  };

  const activeRecipeChanges = (id = '') => {
    setrecipeActived(id);
    setTimeout(() => {
      setrecipeActived(id);
    }, 500);
    setCount(1);
  };

  const exitModalRecipeDetails = () => {
    setrecipeActived('');
    setRecipeName('');
    setCount(0);
  };

  const searchModalExit = () => {
    setRecipeName('');
    setSearchByNameRecipeBookOpen(!searchByNameRecipeBookOpen);
  };

  // let mediaSize = window.matchMedia('(min-aspect-ratio: 11/6)').matches;

  // const [scaleForImg, setScaleForImg] = useState(
  //   mediaSize
  //     ? Number(window.innerWidth / 4096)
  //     : Number(window.innerHeight / 2160)
  // );

  // useEffect(() => {
  //   const resizeListener = () => {
  //     if (window.location.pathname === '/recettes-book') {
  //       let img = document.querySelector('#recipeBookImg');

  //       img.style.animation = 'none';
  //       mediaSize
  //         ? setScaleForImg(Number(window.innerWidth / 4096))
  //         : setScaleForImg(Number(window.innerHeight / 2160));
  //     }
  //     setTimeout(() => {
  //       mediaSize
  //         ? setScaleForImg(Number(window.innerWidth / 4096))
  //         : setScaleForImg(Number(window.innerHeight / 2160));
  //     }, 0);
  //   };

  //   window.addEventListener('resize', resizeListener);
  // }, [scaleForImg, mediaSize]);

  const recipeBookImgAnimWidth = `

  @keyframes recipeBookImgAnimWidth {
    from {
      transform: scale(1.7) translateX(30vw);
    }
  }
`;
  injectStyle(recipeBookImgAnimWidth);

  const recipeBookImgAnimHeight = `

  @keyframes recipeBookImgAnimHeight {
    from {
      transform: scale(1.2) translateX(30vw);
    }
  }
  
`;
  injectStyle(recipeBookImgAnimHeight);

  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */
  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */
  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */

  return (
    <div
      className='recipeBook'
      style={{ background: visibility ? '' : 'none' }}>
      <img
        id='recipeBookImg'
        style={{ opacity: visibility ? '1' : '0' }}
        // style={{
        //   transform: `scale(${scaleForImg})`,

        //   animation: mediaSize
        //     ? `recipeBookImgAnimWidth ease-in-out 1.2s`
        //     : `recipeBookImgAnimHeight ease-in-out 1.2s`,
        // }}
        src={recipeBookImg}
        alt='recipeBookImg'></img>

      <Nav hideFor3dOpening={hideFor3dOpening} visibility={visibility} />
      <button
        style={{
          opacity: visibility ? '1' : '0',
          display:
            searchByNameRecipeBookOpen && recipeActived === ''
              ? 'block'
              : 'none',
        }}
        className='searchModalExit'
        onClick={searchModalExit}>
        X
      </button>
      <section
        className={
          searchByNameRecipeBookOpen
            ? 'searchByNameRecipeBookOpen'
            : 'searchByNameRecipeBookClose'
        }
        onClick={
          searchByNameRecipeBookOpen ? null : toggleSearchByNameRecipeBookOpen
        }
        style={{
          opacity: visibility ? '1' : '0',
          display: `${
            searchByCategoryRecipeBookOpen ||
            searchByNutrientsRecipeBookOpen ||
            recipeActived !== ''
              ? 'none'
              : ''
          }`,
        }}>
        {searchByNameRecipeBookOpen ? (
          <Fragment>
            {recipeActived === '' ? (
              <form
                className='searchModalByName'
                onSubmit={handleInputSearchOnChange}>
                <label htmlFor='search-recipeByName'>
                  <input
                    style={{
                      animation: recipeName !== '' ? 'none' : '',
                    }}
                    onChange={handleInputSearchOnChange}
                    placeholder='Rechercher'
                    type='search'
                    id='search-recipeByName'
                    name='search-recipeByName'
                    aria-label='search-recipeByName'></input>
                </label>
              </form>
            ) : (
              ''
            )}

            <div
              style={{
                top: `${recipeActived !== '' ? 0 : ''}`,
                padding: `${recipeActived !== '' ? 0 : ''}`,
                height: `${recipeActived !== '' ? '100vh' : ''}`,
              }}>
              {recipes &&
                recipes.map((recipe, i) => {
                  return recipe._id ? (
                    <Fragment key={recipe._id}>
                      <div
                        className={
                          recipeActived === recipe._id
                            ? 'recipeDetailed'
                            : 'recipeView'
                        }
                        key={recipe._id}
                        style={{
                          animation: animationSearchByName
                            ? 'recipeOnListFromRecipeViewAnim2 cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.5s'
                            : '',
                        }}
                        onClick={(e) => activeRecipeChanges(recipe._id)}>
                        <div
                          className='recipeOnList'
                          onClick={(e) => setRecipeName('')}>
                          <div
                            // style={{
                            //   backgroundImage: `url(${recipe.recipeImage})`,
                            //   backgroundSize: 'cover',
                            //   backgroundPosition: 'center',
                            //   backgroundRepeat: 'no-repeat',
                            // }}
                            className='recipeImage'

                            // src={recipe.recipeImage}
                            // alt='recipeImage'
                          >
                            <div
                              style={{
                                backgroundImage: `url(${recipe.recipeImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                boxShadow:
                                  'rgb(68 74 86) -0.1em 0.1em 0.2em, rgb(46 51 56 / 71%) -0.2em 0.08em 0.3em inset',
                              }}
                              className='recipeImage2'></div>
                          </div>{' '}
                          <div style={{ marginTop: '15%' }}>
                            <h2>{recipe.recipeTitle}</h2>
                            <h3>
                              {recipe.recipeDiet === `GenericDiet`
                                ? '(Diète Générique)'
                                : '' || recipe.recipeDiet === `FreeDiet`
                                ? '(Diète Libre)'
                                : '' ||
                                  recipe.recipeDiet === `BodyArchitectDiet`
                                ? '(Diète Body Architect)'
                                : '' || recipe.recipeDiet === `KetoDiet`
                                ? '(Diète Cétogène)'
                                : ''}
                            </h3>
                          </div>
                          <div className='firstInfosRecipe'>
                            <div className='firstInfosRecipeLevel'>
                              <img
                                id={`firstInfosRecipeLevelImg${i}`}
                                className='firstInfosRecipeLevelImg'
                                src={svgHat}
                                alt='firstInfosRecipeLevelImg'
                              />
                              <img
                                style={{ height: '20%', marginTop: '60%' }}
                                src={
                                  recipe.recipeLevel === 'easyLevel'
                                    ? `${svgOneStar}`
                                    : recipe.recipeLevel ||
                                      recipe.recipeLevel === 'mediumLevel'
                                    ? `${svgTwoStars}`
                                    : recipe.recipeLevel ||
                                      recipe.recipeLevel === 'expertLevel'
                                    ? `${svgThreeStars}`
                                    : recipe.recipeLevel
                                }
                                alt='recipeLevel'></img>
                            </div>
                            <div className='firstInfosRecipeTime'>
                              <img
                                id={`firstInfosRecipeTimeImg${i}`}
                                className='firstInfosRecipeTimeImg'
                                src={svgSandTime}
                                alt='time'
                              />
                              <h3>{recipe.recipeCookingTime} min</h3>
                            </div>
                            <div className='firstInfosRecipeMoney'>
                              <img
                                id={`firstInfosRecipeMoneyImg${i}`}
                                className='firstInfosRecipeMoneyImg'
                                src={svgMoney}
                                alt='money'
                              />
                              <img
                                id={`firstInfosRecipeMoneyStarsImg${i}`}
                                className='firstInfosRecipeMoneyStarsImg'
                                style={{ height: '20%', marginTop: '60%' }}
                                src={
                                  recipe.recipePrice === 'economic'
                                    ? `${svgOneEuro}`
                                    : recipe.recipePrice ||
                                      recipe.recipePrice === 'affordable'
                                    ? `${svgTwoEuros}`
                                    : recipe.recipePrice ||
                                      recipe.recipePrice === 'consequent'
                                    ? `${svgThreeEuros}`
                                    : recipe.recipePrice
                                }
                                alt='euro'></img>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ) : null;
                })}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {' '}
            <h3>LIVRE DE RECETTES</h3>
            <h2>Recherche Alphabétique </h2>
          </Fragment>
        )}
      </section>

      <section
        className={
          searchByCategoryRecipeBookOpen
            ? 'searchByCategoryRecipeBookOpen'
            : 'searchByCategoryRecipeBookClose'
        }
        onClick={
          searchByCategoryRecipeBookOpen
            ? null
            : toggleSearchByCategoryRecipeBookOpen && optionNotDispo
        }
        // onMouseUp={searchByCategoryRecipeBookOpen ? optionNotDispo : null}
        style={{
          opacity: visibility ? '1' : '0',
          display: `${
            searchByNameRecipeBookOpen || searchByNutrientsRecipeBookOpen
              ? 'none'
              : ''
          }`,
        }}>
        {searchByCategoryRecipeBookOpen ? (
          <Fragment>
            <div
              className='searchModalExit'
              onClick={(e) => {
                setSearchByCategoryRecipeBookOpen(
                  !searchByCategoryRecipeBookOpen
                );
              }}>
              X
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {' '}
            <h3>LIVRE DE RECETTES</h3>
            <h2>Recherche Par Catégories</h2>
          </Fragment>
        )}
      </section>
      <section
        className={
          searchByNutrientsRecipeBookOpen
            ? 'searchByNutrientsRecipeBookOpen'
            : 'searchByNutrientsRecipeBookClose'
        }
        onClick={
          searchByNutrientsRecipeBookOpen
            ? null
            : toggleSearchByNutrientsRecipeBookOpen && optionNotDispo
        }
        // onMouseUp={searchByNutrientsRecipeBookOpen ? optionNotDispo : null}
        style={{
          opacity: visibility ? '1' : '0',
          display: `${
            searchByNameRecipeBookOpen || searchByCategoryRecipeBookOpen
              ? 'none'
              : ''
          }`,
        }}>
        {searchByNutrientsRecipeBookOpen ? (
          <Fragment>
            <div
              className='searchModalExit'
              onClick={(e) => {
                setSearchByNutrientsRecipeBookOpen(
                  !searchByNutrientsRecipeBookOpen
                );
              }}>
              X
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {' '}
            <h3>LIVRE DE RECETTES</h3>
            <h2>Recherche Par Nutriments</h2>
          </Fragment>
        )}
      </section>
      {count !== 1 ? (
        ''
      ) : (
        <Fragment>
          <Recipe visibility={visibility} recipeActived={recipeActived} />{' '}
          <button
            style={{ opacity: visibility ? '1' : '0' }}
            className='recipeDetailedExit'
            onClick={exitModalRecipeDetails}>
            X
          </button>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  aliments: state.allAliments,
  alimentId: state.allAliments,
  recipes: state.allRecipes,
  recipeId: state.allRecipes,
});
export default connect(mapStateToProps, {
  getAliment,
  getAlimentByID,
  getRecipeByID,
  getRecipe,
  updateRecipe,
})(RecipeBook);
