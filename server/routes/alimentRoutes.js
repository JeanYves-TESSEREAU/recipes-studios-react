import express from 'express';
const router = express.Router();
import {
  alimentBodyCheck,
  alimentIdParamCheck,
} from '../middleware/alimentDataProtector.js';

import {
  getAliments,
  getAlimentByID,
  getAlimentByName,
  createAliment,
  updateAliment,
} from '../controller/alimentController.js';
import { authAdmin } from '../middleware/authenticator.js';

// GET ALL Aliments
router.get('/', getAliments);

// GET ONE ALIMENT BY ID
router.get('/id/:id', alimentIdParamCheck, getAlimentByID);

// GET ALL ALIMENT BY NAME
router.get('/:name', getAlimentByName);

// CREATE ALL ALIMENTS
// router.post('/create', createAliment);
// GET ALL ALIMENTS
router.patch(
  '/id/:id/update',
  authAdmin,
  alimentIdParamCheck,
  alimentBodyCheck,
  updateAliment
);

export default router;
