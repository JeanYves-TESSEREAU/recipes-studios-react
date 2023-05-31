import express from 'express';
const router = express.Router();
// import { auth } from '../middleware/authenticator.js';
import User from '../models/User.js';

// @route get /auth
router.get(
  '/',
  // auth,
  async (req, res) => {
    try {
      const userInstance = User();

      const user = await userInstance.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ['password'] },
      });
      console.log(req.user.id);

      res.status(200).json(user);
    } catch (e) {
      console.log(e.message);
      res.status(500).send('Server Error');
    }
  }
);

export default router;
