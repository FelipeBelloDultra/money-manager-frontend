import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

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
      setError(error.response);
    }
  };

  useEffect(() => {
    getInfoUser();
  }, [history]);

  return (
    <div>
      <h1>ROTA MAIN</h1>
      <p>{error}</p>
      <p>Bem vindo, {userData.login}</p>
      <Link to="/historic">Rota de histórico</Link>
    </div>
  );
};

export default Dashboard;
