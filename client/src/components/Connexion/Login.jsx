import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './connexion.css';

import { loginUser, logout } from '../../redux/actions/auth';

const Login = ({ loginUser, logout, connexionModule, isAuthenticated }) => {
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                     __________________________ */
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                       __________________________ */
  /* ______________________             HERE IS ALL FONCTIONS/STATE AND CONDITIONS PART                       __________________________ */
  let auth = isAuthenticated.isAuthenticated;
  const [url, setUrl] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const onChangeHandlerUser = (e) => {
    setUrl(e.target.value);
  };
  const switchToRegister = (e) => {
    e.preventDefault();
    connexionModule('register');
  };

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onLogout = async (e) => {
    e.preventDefault();

    logout();
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    loginUser(
      {
        email,
        password,
      },
      url
    );
  };

  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */
  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */
  /* ______________________             HERE IS THE CONTENT PART                     __________________________ */

  return (
    <Fragment>
      {!auth ? (
        <form className='connexionForm' onSubmit={(e) => onSubmit(e)}>
          <fieldset>
            <legend>Connection</legend>
            <fieldset>
              <legend>Email</legend>
              <label>
                <input
                  required
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </label>
            </fieldset>
            <fieldset>
              <legend>mot de passe</legend>
              <label>
                <input
                  required
                  type='password'
                  placeholder='Password'
                  autoComplete='current-password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  minLength='8'
                />
              </label>
            </fieldset>

            <fieldset>
              <legend>utilisateur</legend>
              <label>
                <select
                  style={{ padding: '1%', background: 'none', border: 'none' }}
                  name='user'
                  onChange={onChangeHandlerUser}
                  required>
                  <option value=''>--Selectionnez--</option>
                  <option value='user'>Utilisateur</option>
                  <option value='admin'>Administrateur</option>
                </select>
              </label>
            </fieldset>

            <input className='connexionValidation' type='submit' value='Go !' />
          </fieldset>

          <button onClick={switchToRegister}>
            Pas encore membre ? Créer un compte{' '}
          </button>
        </form>
      ) : (
        <button className='logout' onClick={onLogout}>
          je me déconnecte !
        </button>
      )}
    </Fragment>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ isAuthenticated: state.auth });

export default connect(mapStateToProps, { loginUser, logout })(Login);
