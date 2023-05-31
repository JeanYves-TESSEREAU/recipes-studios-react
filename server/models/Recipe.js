import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  recipeTitle: {
    type: String,
  },
  recipeImage: {
    type: String,
  },
  recipeInitialCategory: {
    type: String,
  },
  recipeSubCategory: {
    type: String,
  },
  recipeSubSubCategory: {
    type: String,
  },
  recipeInstructions: {
    type: Array,
  },
  recipePrice: {
    type: String,
  },
  recipeLevel: {
    type: String,
  },
  recipeCookingTime: {
    type: Number,
  },
  recipeHeatingTime: {
    type: Number,
  },
  recipeRegime: {
    type: String,
  },
  gluten: {
    type: Boolean,
  },
  shellfish: {
    type: Boolean,
  },
  eggs: {
    type: Boolean,
  },
  fish: {
    type: Boolean,
  },
  peanuts: {
    type: Boolean,
  },
  soja: {
    type: Boolean,
  },
  milk: {
    type: Boolean,
  },
  nuts: {
    type: Boolean,
  },
  celery: {
    type: Boolean,
  },
  mustard: {
    type: Boolean,
  },
  sesameSeeds: {
    type: Boolean,
  },
  sulphites: {
    type: Boolean,
  },
  lupine: {
    type: Boolean,
  },
  mollusks: {
    type: Boolean,
  },
  recipeDiet: {
    type: String,
  },
  recipeIngredients: {
    type: Array,
  },
  totalKcal: {
    type: Number,
  },
  totalGrammes: {
    type: Number,
  },
  totalProtein: {
    type: Number,
  },
  totalCarbs: {
    type: Number,
  },
  totalFat: {
    type: Number,
  },
});
const Recipe = mongoose.model('recipe', RecipeSchema);
export default Recipe;
