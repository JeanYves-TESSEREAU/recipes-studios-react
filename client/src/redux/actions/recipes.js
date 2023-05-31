import axios from 'axios';
import {
  GET_RECIPES,
  CREATE_RECIPE,
  RECIPES_ERROR,
  GET_RECIPE_BY_ID,
  GET_RECIPE_ACTIVE,
} from '../constants/actionTypes.js';
import {
  alertPopup,
  alertGoToRecipeBook,
} from '../../assets/fonctions/alertPopup.js';

export const getRecipeByID = (id) => async (dispatch) => {
  try {
    if (id === '' || id == null || id === undefined) {
      id = '614d2152f7d7c264ec733931';
    }
    const res = await axios.get(`/recipes/id/${id}`);

    dispatch({
      type: GET_RECIPE_BY_ID,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: RECIPES_ERROR,
      payload: { message: e },
    });
  }
};

export const getRecipe =
  (
    name,
    sortAscDsc = '',
    sorting = '',
    pageNumber = 1,
    pageLimit = 10,
    saveFilters = []
  ) =>
  async (dispatch) => {
    if (sortAscDsc === 'Dsc') {
      sorting = '-' + sorting;
    }
    if (sortAscDsc === 'Def') {
      sorting = '';
    }
    if (saveFilters === []) {
      saveFilters = '';
    }

    let str = `&page=${pageNumber}&limit=${pageLimit}`;
    let filters = '';
    if (saveFilters !== null) {
      saveFilters.map(
        (filter) =>
          (filters += `&${filter.id}[${filter.filterSelect}]=${filter.filterNumber}`)
      );
    }

    const res = await axios.get(
      `/recipes/${name}?sort=${sorting}${str}${filters}`
    );
    try {
      dispatch({
        type: GET_RECIPES,
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: RECIPES_ERROR,
        payload: { message: e },
      });
    }
  };

export const updateRecipe = (id, recipeForm) => async (dispatch) => {
  try {
    await axios.patch(`/recipes/id/${id}/update`, recipeForm);
  } catch (e) {
    console.log(e);
    dispatch({
      type: RECIPES_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const createRecipe = (recipeForm) => async (dispatch) => {
  try {
    const res = await axios.post('/recipes/create', recipeForm);

    dispatch({
      type: CREATE_RECIPE,
      payload: res.data,
    });
    alertPopup(`${res.data}`, 'success');
    setTimeout(() => {
      alertGoToRecipeBook();
    }, 2500);
  } catch (e) {
    alertPopup(`${JSON.stringify(e.response.data)}`, 'error');
    dispatch({
      type: RECIPES_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const getRecipeActive =
  (recipeActive = []) =>
  async (dispatch) => {
    try {
      console.log(recipeActive);
      dispatch({
        type: GET_RECIPE_ACTIVE,
        payload: recipeActive,
      });
    } catch (e) {
      console.log(e);
    }
  };
