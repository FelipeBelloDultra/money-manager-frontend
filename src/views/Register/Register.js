import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../utils/api';

const Auth = () => {
  const history = useHistory();

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleClickLogin = async (event) => {
    event.preventDefault();

    if (!email || !password || !login) {
      setError('Preencha todos os campos!');
      return;
    }

    try {
      await api.post('/users', { email, login, password, });
      history.push('/auth');
    } catch (error) {
      setLogin('');
      setEmail('');
      setPassword('');
      setError(error.response.data.error)
    }
  };

  return (
    <div className="background-login">
      <div className="container-login">
        <h3>Criar Conta</h3>
        <p className="error">{error}</p>
        <form onSubmit={handleClickLogin}>
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
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
            <Link className="button button-register" to="/auth">Votlar</Link>
            <button className="button button-login" type="submit">Criar Conta</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
