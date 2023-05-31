import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// legacy_createStore as createStore  CAR createStore deprécié
// Faire fonctionner les outils pour développeurs
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/index.js';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // Sans cette ligne, les outils redux pour développeurs ne fonctionnent pas.
);

export default store;
