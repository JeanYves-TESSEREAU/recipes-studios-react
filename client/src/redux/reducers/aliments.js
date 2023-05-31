import {
  GET_ALIMENTS,
  GET_ALIMENT_BY_ID,
  GET_ALIMENT_LIST,
} from '../constants/actionTypes.js';

const initialState = {
  aliments: [],
  alimentId: [],
  pageNumber: 0,
  pagesNumber: 0,
  pageLimit: 0,
  total: '',
  listToRecipeStudio: [],
};

export default function allAliments(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALIMENT_BY_ID:
      return {
        ...state,
        alimentId: payload.alimentId,
      };
    case GET_ALIMENTS:
      return {
        ...state,
        aliments: payload.aliments,
        pageNumber: payload.pageNumber,
        pagesNumber: payload.pagesNumber,
        pageLimit: payload.limit,
        total: payload.total,
      };
    case GET_ALIMENT_LIST:
      return {
        ...state,
        listToRecipeStudio: payload,
      };

    default:
      return state;
  }
}
