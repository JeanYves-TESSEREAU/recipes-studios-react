import { React, useState, useEffect } from 'react';
import Register from './Register';
import Login from './Login';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';

const Connexion = ({
  toggleConnexion,
  connexion,
  changeProfilTitle,
  isAuthenticated,
}) => {
  const [module, setModule] = useState('login');
  const connexionModule = (data) => {
    setModule(data);
  };

  useEffect(() => {
    if (module === 'login' && isAuthenticated.isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token !== null) {
        setAuthToken(token);
        const decoded = jwt_decode(token);
        changeProfilTitle(decoded.user.userName);
      }
    } else {
      changeProfilTitle('connection');
    }
    toggleConnexion('close');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: connexion === 'close' ? 'none ' : 'block',
      }}
      className='account'>
      {module === 'login' ? (
        <Login connexionModule={connexionModule} />
      ) : module === 'register' ? (
        <Register connexionModule={connexionModule} />
      ) : (
        ''
      )}
      <button
        className='closeConnexion'
        onClick={(e) => toggleConnexion('close')}>
        X
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth,
});

export default connect(mapStateToProps)(Connexion);
