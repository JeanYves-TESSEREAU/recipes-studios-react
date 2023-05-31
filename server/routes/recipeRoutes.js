import express from 'express';
const router = express.Router();

import {
  getRecipes,
  getRecipeByID,
  getRecipeByName,
  createRecipe,
  updateRecipe,
} from '../controller/recipeController.js';
import { recipeBodyCheck } from '../middleware/recipeDataProtector.js';
import { authGlobal } from '../middleware/authenticator.js';

// GET ALL RECIPES
router.get('/', getRecipes);

// GET ONE RECIPE BY ID
router.get('/id/:id', getRecipeByID);

// GET A RECIPE BY NAME
router.get('/:name', getRecipeByName);

// CREATE A RECIPE
router.post(
  '/create',
  // authGlobal,
  recipeBodyCheck,
  createRecipe
);
// UPDATE A RECIPE
// router.patch('/id/:id/update', updateRecipe);

export default router;
