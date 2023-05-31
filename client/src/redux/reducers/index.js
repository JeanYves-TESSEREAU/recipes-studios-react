import { combineReducers } from 'redux';

import allAliments from './aliments'; // Si on a un reducer pour les aliments on l'importe
import allRecipes from './recipes'; // Si on a un reducer pour les recettes on l'importe
import auth from './auth'; // Si on a un reducer pour authentifications on l'importe

export default combineReducers({ allAliments, allRecipes, auth }); // Puis on l'ajoute a redux
