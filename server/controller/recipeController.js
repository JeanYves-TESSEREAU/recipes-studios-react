import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import Recipe from '../models/Recipe.js';

// -------------------------------------------------------------------

// FILTERING --- PAGINATION --- SORTING
class RecipeFullRequest {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  recipeFullOptions() {
    let sortBy = '';

    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const queryElement = { ...this.queryString };

    const excludeFields = ['page', 'sort', 'limit'];
    excludeFields.forEach((val) => delete queryElement[val]);
    let queryStr = JSON.stringify(queryElement);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|eq)\b/g,
      (match) => `$${match}`
    );

    if (this.queryString.sort) {
      sortBy = this.queryString.sort;
    } else {
      sortBy = 'recipeTitle';
    }
    this.query.find(JSON.parse(queryStr)).sort(sortBy).skip(skip).limit(limit);

    return this;
  }
}

class TotalItems {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  itemfullOptions() {
    const queryElement = { ...this.queryString };
    // console.log(queryElement);
    const excludeFields = ['page', 'sort', 'limit'];
    excludeFields.forEach((val) => delete queryElement[val]);
    let queryStr = JSON.stringify(queryElement);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|eq)\b/g,
      (match) => `$${match}`
    );

    this.query.find(JSON.parse(queryStr)).countDocuments();

    return this;
  }
}

// GET ALL RECIPES with allFeaturing"
export const getRecipes = async (req, res) => {
  try {
    let pageNumber = 0,
      limit = 10,
      pagesNumber = 0;
    if (req.query.page) {
      pageNumber = req.query.page;
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    const recipeTotal = new TotalItems(
      Recipe.find(),
      req.query
    ).itemfullOptions();

    const items = await recipeTotal.query;

    let total = items;
    console.log(total);

    const featuredRecipe = new RecipeFullRequest(
      Recipe.find(),

      req.query
    ).recipeFullOptions();
    const recipes = await featuredRecipe.query;

    let count = items;

    pagesNumber = count / limit;

    res.status(200).json({
      recipes: recipes,
      total: total,
      pagesNumber: Math.ceil(pagesNumber),
      pageNumber: pageNumber,
      limit: limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sadly, server Error :(' });
  }
};

// -------------------------------------------------------------------

//GET ONE RECIPE BY ID FROM DATABASE

export const getRecipeByID = async (req, res) => {
  const { id } = req.params;
  try {
    const recipeId = await Recipe.findById(id);

    res.status(200).json({ recipeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sadly, server Error :(' });
  }
};

// -----------------------------------------------

export const getRecipeByName = async (req, res) => {
  const { name } = req.params;
  try {
    let pageNumber = 0,
      limit = 10,
      pagesNumber = 0;
    if (req.query.page) {
      pageNumber = req.query.page;
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    const recipeTotal = new TotalItems(
      Recipe.find({ recipeTitle: { $regex: `^${name}`, $options: 'i' } }),
      req.query
    ).itemfullOptions();

    const items = await recipeTotal.query;

    let total = items;
    console.log(total);

    const featuredRecipe = new RecipeFullRequest(
      Recipe.find({
        recipeTitle: { $regex: `^${name}`, $options: 'i' },
      }),

      req.query
    ).recipeFullOptions();
    const recipes = await featuredRecipe.query;

    let count = items;

    pagesNumber = count / limit;

    res.status(200).json({
      recipes: recipes,
      total: total,
      pagesNumber: Math.ceil(pagesNumber),
      pageNumber: pageNumber,
      limit: limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sadly, server Error :(' });
  }
};

// -------------------------------------------------------------------

// CREATE A RECIPE

export const createRecipe = async (req, res) => {
  //REQ.BODY = FULL OBJETC OF A RECIPE WE NEED UPDATE OR CREATE
  const {
    recipeTitle,
    recipeImage,
    recipeInitialCategory,
    recipeSubCategory,
    recipeSubSubCategory,
    recipeInstructions,
    recipePrice,
    recipeLevel,
    recipeCookingTime,
    recipeHeatingTime,
    recipeRegime,
    gluten,
    shellfish,
    eggs,
    fish,
    peanuts,
    soja,
    milk,
    nuts,
    celery,
    mustard,
    sesameSeeds,
    sulphites,
    lupine,
    mollusks,
    recipeDiet,
    recipeIngredients,
    totalKcal,
    totalGrammes,
    totalProtein,
    totalCarbs,
    totalFat,
  } = req.body;
  //

  const newRecipe = new Recipe({
    recipeTitle,
    recipeImage,
    recipeInitialCategory,
    recipeSubCategory,
    recipeSubSubCategory,
    recipeInstructions,
    recipePrice,
    recipeLevel,
    recipeCookingTime,
    recipeHeatingTime,
    recipeRegime,
    gluten,
    shellfish,
    eggs,
    fish,
    peanuts,
    soja,
    milk,
    nuts,
    celery,
    mustard,
    sesameSeeds,
    sulphites,
    lupine,
    mollusks,
    recipeDiet,
    recipeIngredients,
    totalKcal,
    totalGrammes,
    totalProtein,
    totalCarbs,
    totalFat,
  });
  try {
    await newRecipe.save();

    res.status(201).json(`${recipeTitle} vient d'être créé avec succès`);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// -------------------------------------------------------------------

//  UPDATE  A RECIPE

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const {
    recipeTotal,
    recipeImage,
    recipeInitialCategory,
    recipeSubCategory,
    recipeSubSubCategory,
    recipePrice,
    recipeLevel,
    recipeCookingTime,
    recipeHeatingTime,
    recipeRegime,
    gluten,
    shellfish,
    eggs,
    fish,
    peanuts,
    soja,
    milk,
    nuts,
    celery,
    mustard,
    sesameSeeds,
    sulphites,
    lupine,
    mollusks,
    recipeDiet,
    recipeIngredients,
    totalKcal,
    totalGrammes,
    totalProtein,
    totalCarbs,
    totalFat,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Recipe with id: ${id}`);
  try {
    const updatedRecipe = {
      recipeTotal,
      recipeImage,
      recipeInitialCategory,
      recipeSubCategory,
      recipeSubSubCategory,
      recipePrice,
      recipeLevel,
      recipeCookingTime,
      recipeHeatingTime,
      recipeRegime,
      gluten,
      shellfish,
      eggs,
      fish,
      peanuts,
      soja,
      milk,
      nuts,
      celery,
      mustard,
      sesameSeeds,
      sulphites,
      lupine,
      mollusks,
      recipeDiet,
      recipeIngredients,
      totalKcal,
      totalGrammes,
      totalProtein,
      totalCarbs,
      totalFat,
    };

    await Recipe.findByIdAndUpdate(id, updatedRecipe, { new: true });
    res.status(201).json({ updateRecipe });
  } catch (error) {
    res.status(500).json({ error: messages });
  }
};

export default router;
