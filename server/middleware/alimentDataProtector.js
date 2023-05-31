import { check, validationResult, param } from 'express-validator';
import Aliment from '../models/Aliment.js';

const filterBycheckType = () => {
  let keys = Object.keys(Aliment.schema.obj);
  const isFloatValues = keys.filter(
    (word) =>
      word !== 'alimGrpNom' &&
      word !== 'alimSgrpNom' &&
      word !== 'alimSSgrpNom' &&
      word !== 'alimNom'
  );
  const isStringValues = keys.filter(
    (word) =>
      word === 'alimGrpNom' ||
      word === 'alimSgrpNom' ||
      word === 'alimSSgrpNom' ||
      word === 'alimNom'
  );

  let arr = [];
  for (let i of isFloatValues) {
    arr = [
      ...arr,
      check(i, `${i} doit être un numéro ou null`)
        .isFloat()
        .optional({ nullable: true, checkFalsy: true }),
    ];
  }
  for (let i of isStringValues) {
    arr = [
      ...arr,
      check(i, `${i} doit être écrit en lettres`)
        .escape()
        .isString()
        .optional({ nullable: true, checkFalsy: true }),
    ];
  }

  return arr;
};

export const alimentBodyCheck = [
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

export const alimentIdParamCheck = [
  param('id')
    .exists()
    .isLength({ min: 24, max: 24 })
    .withMessage(' Hi! ID Should Be 24 Character Long'),

  function (req, res, next) {
    let errors = validationResult(req);

    console.log(errors); // se log dans le terminal

    if (!errors.isEmpty()) {
      return res.status(500).json({
        title: 'an error occured',
        error: errors.array(),
      });
    }

    next();
  },
];
