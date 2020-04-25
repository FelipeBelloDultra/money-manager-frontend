import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../utils/api';

const Auth = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('@access_token-money-manager')) {
      history.push('/dashboard')
    }
  });

  const handleClickLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Preencha todos os campos!');
      return;
    }

    try {
      const response = await api.post('/session', { email, password, });
      localStorage.setItem('@access_token-money-manager', response.data.access_token);
      localStorage.setItem('@login-money-manager', response.data.user.login);
      history.push('/dashboard');
    } catch (error) {
      setEmail('');
      setPassword('');
      setError(error.response.data.error)
    }
  };

  return (
    <div className="background-login">
      <div className="container-login">
        <h3>Fazer Login</h3>
        <p className="error">{error}</p>
        <form onSubmit={handleClickLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="form-button">
            <button className="button button-login" type="submit">Login</button>
            <Link className="button button-register" to="/register">Registrar-se</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
