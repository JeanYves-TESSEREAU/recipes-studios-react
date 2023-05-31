import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
// import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  // AUTH_ERROR,
  // USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
} from '../constants/actionTypes';
import { alertPopup } from '../../assets/fonctions/alertPopup.js';

axios.defaults.headers.post['Content-Type'] = 'application/json';

// export const loadUser = () => async (dispatch) => {
//   console.log('pd');
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }
//   try {
//     const res = await axios.get('/');

//     dispatch({
//       type: USER_LOADED,
//       payload: res.data,
//     });
//   } catch (err) {
//     alert(JSON.stringify(err.response.data));
//     console.log(JSON.stringify(err.response.data));
//     dispatch({
//       type: AUTH_ERROR,
//     });
//   }
// };

// REGISTER USER
export const register = (userData) => (dispatch) => {
  axios
    .post('/users/register', userData)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // dispatch(loadUser());
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      // localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);

      alertPopup(`Bienvenue ${decoded.user.userName}`, 'success');

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      alertPopup(`${err.response.data}`, 'error');

      console.log(err.response.data);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data,
      });
    });
};

// LOGIN USER OR ADMIN
export const loginUser = (userData, url) => (dispatch) => {
  axios
    .post(`/users/login/${url}`, userData)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      // localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      alertPopup(`Bienvenue ${decoded.user.userName}`, 'success');

      // Set current user
      // let isAuthenticated = true;
      dispatch(setCurrentUser(decoded.user.userName));
    })
    .catch((err) => {
      alertPopup(`${JSON.stringify(err.response.data)}`, 'error');

      console.log(err.response.data);
      console.log('pas possible');
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data,
      });
    });
};

// Set logged in user
export const setCurrentUser = (user) => {
  return {
    type: USER_LOADED,
    payload: user,
  };
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  alertPopup(`Déconnection confirmée, à la prochaine.`, 'success');
};
