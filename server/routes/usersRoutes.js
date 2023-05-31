import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { authAdmin, authGlobal } from '../middleware/authenticator.js';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { validationRegister } from '../middleware/authenticator.js';
// import registerRecipeMaker from '../controller/userController.js';

// REGISTER A RECIPEMAKER USER

router.post(
  '/register',

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userName, role, email, password } = req.body;

      const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        role: process.env.BASIC_ROLE,
      });

      let existingUserByMail = await User.findOne({ email: req.body.email });
      let existingUserByName = await User.findOne({
        userName: req.body.userName,
      });

      if (existingUserByMail) {
        return res.status(400).send('email already taken');
      }
      if (existingUserByName) {
        return res.status(400).send('userName already taken');
      }
      // Hash password with salt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          userName: user.userName,
          role: 'user',
        },
      };

      jwt.sign(
        payload,
        process.env.APP_SECRET,
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);

// LOGIN AN ADMIN

router.post(
  '/login/admin',

  // authAdmin,

  [
    check('email', 'Email must be valid').trim().isEmail(),
    check('password', 'Password is required and min 8 *')
      .exists()
      .trim()
      .escape()
      .isLength({ min: 7 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      // Does user exist ?

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(400).json(`HEY ICI C'EST PRIVÉ `);
      }
      if (user.role !== process.env.ADMIN_ROLE) {
        return res.status(400).json(`HEY ICI C'EST PRIVÉ `);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json('password invalid');
      }

      const payload = {
        user: {
          id: user.id,
          userName: user.userName,
          role: 'admin',
        },
      };

      jwt.sign(
        payload,
        process.env.APP_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);

// LOGIN A USER

router.post(
  '/login/user',
  [
    check('email', 'Email must be valid').trim().isEmail(),
    check('password', 'Password is required')
      .exists()
      .trim()
      .escape()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      // Does user exist ?

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(400).json(`Ce n'est pas le Bon Mail`);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json('password invalid');
      }

      const payload = {
        user: {
          id: user.id,
          userName: user.userName,
          role: 'user',
        },
      };

      jwt.sign(
        payload,
        process.env.APP_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);

export default router;
