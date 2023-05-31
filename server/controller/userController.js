import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import User from '../models/User.js';

// -------------------------------------------------------------------

// CREATE / REGISTER A NEW RECIPEMAKE USER
export const registerRecipeMaker = async (req, res) => {
  console.log('hello');
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        role: process.env.BASIC_ROLE,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
      console.log(`BIENVENU ${userName}`);
    }
  });
};
export default router;
