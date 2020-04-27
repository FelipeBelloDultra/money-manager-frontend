import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './styles.css';

const TopBar = () => {
  const history = useHistory();
  const date = moment(Date.now()).format();

  const handleClickSignOut = () => {
    localStorage.removeItem('@access_token-money-manager');
    localStorage.removeItem('@login-money-manager');
    history.push('/auth');
  };

  return (
    <div className="main-topbar">
      <div className="main-name">
        <a href="/dashboard">Money Manager</a>
      </div>
      <div className="main-menu">
        <Link className="main-link" to="/dashboard">Dashboard</Link>
        <Link className="main-link" to="/historic">Histórico</Link>
      </div>
      <div className="main-options">
        <p>{moment(date).format('DD/MM/YYYY')} -</p>
        <p>Usuário: {localStorage.getItem('@login-money-manager')}</p>
        <button onClick={handleClickSignOut}>Sair</button>
      </div>
    </div>
  );
};

export default TopBar;
