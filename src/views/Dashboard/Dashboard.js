import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../utils/api';

const Dashboard = () => {
  const history = useHistory();

  const [userData, setUserData] = useState({});
  const [error, setError] = useState();

  const getInfoUser = async () => {
    try {
      const infoUser = await api.get('/user', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@access_token-money-manager')}`,
        },
      });
      setUserData(infoUser.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('@access_token-money-manager')) {
      history.push('/auth');
      return;
    }
    getInfoUser();
  }, [history]);

  const handleClickSignOut = () => {
    localStorage.removeItem('@access_token-money-manager');
    localStorage.removeItem('@login-money-manager');
    history.push('/auth');
  };

  return (
    <div>
      <h1>ROTA MAIN</h1>
      <p>{error}</p>
      <p>Bem vindo, {userData.login}</p>
      <button onClick={handleClickSignOut}>Sair</button>
    </div>
  );
};

export default Dashboard;
