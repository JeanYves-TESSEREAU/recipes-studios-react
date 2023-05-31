import {
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  CREATE_RECIPE,
  GET_RECIPE_ACTIVE,
} from '../constants/actionTypes.js';

const initialState = {
  recipes: [],
  recipeId: [],
  recipeActive: [],
  pageNumber: 0,
  pagesNumber: 0,
  pageLimit: 0,
  total: '',
};

export default function allRecipes(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RECIPE_BY_ID:
      return {
        ...state,
        recipeId: payload.recipeId,
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload.recipes,
        pageNumber: payload.pageNumber,
        pagesNumber: payload.pagesNumber,
        pageLimit: payload.limit,
        total: payload.total,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, payload.recipes],
      };
    case GET_RECIPE_ACTIVE:
      return {
        // ...state,
        recipeActive: payload,
      };

    default:
      return state;
  }
}
