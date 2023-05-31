import axios from 'axios';
import { alertPopup } from '../../assets/fonctions/alertPopup.js';
import {
  GET_ALIMENTS,
  ALIMENTS_ERROR,
  GET_ALIMENT_BY_ID,
  GET_ALIMENT_LIST,
} from '../constants/actionTypes.js';

export const getAlimentByID = (id) => async (dispatch) => {
  try {
    if (id === '' || id == null || id === undefined) {
      id = '645af4728b39170ce0740a85';
    }
    const res = await axios.get(`/aliments/id/${id}`);
    dispatch({
      type: GET_ALIMENT_BY_ID,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: ALIMENTS_ERROR,
      payload: { message: e },
    });
  }
};

// export const getAliment =
//   (name, pageNumber, pageLimit = 10) =>
//   async (dispatch) => {
//     const res = await axios.get(
//       `/aliments/${name}?page=${pageNumber}&limit=${pageLimit}`
//       // `/aliments/pagination?sort=${data}`
//     );
//     try {
//       dispatch({
//         type: GET_ALIMENTS,
//         payload: res.data,
//       });
//     } catch (e) {
//       console.log(e);
//       dispatch({
//         type: ALIMENTS_ERROR,
//         payload: { message: e },
//       });
//     }
//   };

export const getAliment =
  (
    name,
    sortAscDsc = '',
    nutriment = '',
    pageNumber = 1,
    pageLimit = 10,
    saveFilters = []
  ) =>
  async (dispatch) => {
    if (sortAscDsc === 'Dsc') {
      nutriment = '-' + nutriment;
    }
    if (sortAscDsc === 'Def') {
      nutriment = '';
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
      `/aliments/${name}?sort=${nutriment}${str}${filters}`
    );
    try {
      dispatch({
        type: GET_ALIMENTS,
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: ALIMENTS_ERROR,
        payload: { message: e },
      });
    }
  };

export const updateAliment = (id, formAliment) => async (dispatch) => {
  try {
    await axios.patch(`/aliments/id/${id}/update`, formAliment).then((res) => {
      alertPopup(`${res.data}`, 'success');
    });
  } catch (e) {
    console.log(e);
    alertPopup(`${JSON.stringify(e.response.data)}`, 'error');
    dispatch({
      type: ALIMENTS_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const getAlimentList =
  (listToRecipeStudio = []) =>
  async (dispatch) => {
    try {
      console.log(listToRecipeStudio);
      dispatch({
        type: GET_ALIMENT_LIST,
        payload: listToRecipeStudio,
      });
    } catch (e) {
      console.log(e);
    }
  };
