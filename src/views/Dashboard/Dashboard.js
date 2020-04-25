import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('@access_token-money-manager')) {
      history.push('/auth');
    }
  });

  const handleClickSignOut = () => {
    localStorage.removeItem('@access_token-money-manager');
    localStorage.removeItem('@login-money-manager');
    history.push('/auth');
  };

  return (
    <div>
      <h1>ROTA MAIN</h1>
      <button onClick={handleClickSignOut}>Sair</button>
    </div>
  );
};

export default Dashboard;
