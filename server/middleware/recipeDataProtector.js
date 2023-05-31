import { check, validationResult } from 'express-validator';
import Recipe from '../models/Aliment.js';
import Aliment from '../models/Aliment.js';

const filterBycheckType = () => {
  let keysRecipe = Object.keys(Recipe.schema.obj);
  let keys = Object.keys(Aliment.schema.obj);

  let instructions = [];

  // Expected output: instructions
  const isFloatValuesForAliment = keys.filter(
    (word) =>
      word !== 'alimGrpNom' &&
      word !== 'alimSgrpNom' &&
      word !== 'alimSSgrpNom' &&
      word !== 'alimNom'
  );
  const isStringValuesForAliment = keys.filter(
    (word) =>
      word === 'alimGrpNom' ||
      word === 'alimSgrpNom' ||
      word === 'alimSSgrpNom' ||
      word === 'alimNom'
  );
  const isFloatValuesForRecipe = keysRecipe.filter(
    (word) => word === 'recipeCookingTime' && word === 'recipeHeatingTime'
  );
  const isStringValuesForRecipe = keysRecipe.filter(
    (word) =>
      word === 'recipeTitle' ||
      word === 'recipeImage' ||
      word === 'recipeInitialCategory' ||
      word === 'recipeSubCategory' ||
      word === 'recipeSubSubCategory' ||
      word === 'recipePrice' ||
      word === 'recipeLevel' ||
      word === 'recipeRegime' ||
      word === 'recipeDiet'
  );
  const isBooleanValuesForRecipe = keysRecipe.filter(
    (word) =>
      word === 'gluten' ||
      word === 'shellfish' ||
      word === 'eggs' ||
      word === 'fish' ||
      word === 'peanuts' ||
      word === 'soja' ||
      word === 'milk' ||
      word === 'nuts' ||
      word === 'celery' ||
      word === 'mustard' ||
      word === 'sesameSeeds' ||
      word === 'sulphites' ||
      word === 'lupine' ||
      word === 'mollusks'
  );

  let arr = [];

  for (let i of isFloatValuesForRecipe) {
    arr = [
      ...arr,
      check(i, `${i} doit être un numéro ou null`)
        .isFloat()
        .optional({ nullable: true, checkFalsy: true }),
    ];
  }
  for (let i of isStringValuesForRecipe) {
    arr = [
      ...arr,
      check(i, `${i} doit être écrit en lettres`)
        .escape()
        .isString()
        .optional({ nullable: true, checkFalsy: true }),
    ];
  }
  for (let i of isBooleanValuesForRecipe) {
    arr = [...arr, check(i, `${i} doit être Vrai ou Faux`).isBoolean()];
  }
  arr = [
    ...arr,
    check(
      'recipeInstructions',
      ` doit être un tableau avec au !MOINS! une étape`
    )
      .isArray()
      .notEmpty(),
    check('recipeInstructions[*].*', 'les étapes ne peuvent pas être vides')
      .escape()
      .isString(),
    check(
      'recipeIngredients',
      ` doit être un tableau avec au !MOINS! un ingrédient`
    )
      .isArray()
      .notEmpty(),
  ];
  for (let i of isFloatValuesForAliment) {
    arr = [
      ...arr,
      check(`recipeIngredients[*].${i}`, `${i} doit être un numéro ou null`)
        .isFloat()
        .optional({ nullable: true, checkFalsy: true }),
    ];
  }
  for (let i of isStringValuesForAliment) {
    arr = [
      ...arr,
      check(`recipeIngredients[*].${i}`, `${i} doit être écrit en lettres`)
        .escape()
        .isString()
        .optional({ nullable: true, checkFalsy: true }),
    ];
  }

  return arr;
};

export const recipeBodyCheck = [
  filterBycheckType(),
  function (req, res, next) {
    const myValidationResult = validationResult.withDefaults({
      formatter: (error) => error.msg,
    });

    let errors = myValidationResult(req).array();
    let e = validationResult(req);

    console.log(errors); // se log dans le terminal

    if (!e.isEmpty()) {
      return res.status(500).send(errors);
    }

    next();
  },
];

// export const recipeIdParamCheck = [
//   param('id')
//     .exists()
//     .isLength({ min: 24, max: 24 })
//     .withMessage(' Hi! ID Should Be 24 Character Long'),

//   function (req, res, next) {
//     let errors = validationResult(req);

//     console.log(errors); // se log dans le terminal

//     if (!errors.isEmpty()) {
//       return res.status(500).json({
//         title: 'an error occured',
//         error: errors.array(),
//       });
//     }

//     next();
//   },
// ];
