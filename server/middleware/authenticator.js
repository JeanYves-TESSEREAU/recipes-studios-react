import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const validationRegister = async (req, res, next) => {
  check('userName', 'le nom est obligatoire').trim().escape(),
    check('email').trim().isEmail().withMessage('Email must be valid'),
    check('password')
      .trim()
      .escape()
      .isLength({
        min: 12,
      })
      .withMessage('Password must be 8 chars in length');
  try {
    let errors = validationResult(req);
    console.log(
      errors,
      check('userName', 'le nom est obligatoire').trim().escape()
    );

    errors.isEmpty() ? next() : res.status(401).send('NON AUTORISÉ');
  } catch (e) {
    console.error(e);
    res.status(401).json('Caught an error somewhere');
  }
};

export const authGlobal = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send(`accès administrateur`);
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    req.user = decoded.user;
    const user = await User.findOne({
      _id: req.user.id,
    });

    user.role === process.env.BASIC_ROLE || user.role === process.env.ADMIN_ROLE
      ? next()
      : res.status(401).json('NON AUTORISÉ');
  } catch (e) {
    console.error(e);
    res.status(401).json('Caught an error somewhere');
  }
};

export const authAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send(`accès administrateur`);
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    req.user = decoded.user;
    const user = await User.findOne({
      _id: req.user.id,
    });

    user.role === process.env.ADMIN_ROLE
      ? next()
      : res.status(401).json('NON AUTORISÉ');
  } catch (e) {
    console.error(e);
    res.status(401).json('Caught an error somewhere');
  }
};
