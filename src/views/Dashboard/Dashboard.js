import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import api from '../../utils/api';
import './styles.css';

const Dashboard = () => {
  const history = useHistory();

  const [userData, setUserData] = useState({});
  const [valueAmount, setValueAmount] = useState('');
  const [descriptionAmount, setDescriptionAmount] = useState('');
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
      console.log(error.response);
    }
  };

  useEffect(() => {
    getInfoUser();
  }, [history]);

  const handleClickUpdateAmount = async (type) => {
    try {
      const responseAmount = await api.put(`/balance/${userData.id_user}`, {
        value: valueAmount,
        description: descriptionAmount,
        type: type,
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@access_token-money-manager')}`,
        }
      });
      setUserData({ ...userData, balance: responseAmount.data.amount });
      setValueAmount('');
      setDescriptionAmount('');
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="dashboard-content">
      <h1>Dashboard</h1>
      <p>Bem vindo, <b>{userData.login}</b></p>
      <div className="dashboard-balance">
        <p>Saldo atual: <b>{Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(userData.balance || 0)}</b></p>
      </div>
      <div className="error">
        <p>{error}</p>
      </div>
      <div className="dashboard-form">
        <div className="dashboard-inputs">
          <input
            type="number"
            placeholder="Valor"
            value={valueAmount}
            onChange={(event) => setValueAmount(event.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={descriptionAmount}
            onChange={(event) => setDescriptionAmount(event.target.value)}
          />
          <p
            className="error"
            style={{ display: (valueAmount.length === 0 || descriptionAmount.length === 0) ? 'block' : 'none' }}
          >
            Todos os campos devem ser preenchidos.
          </p>
        </div>
        <div className="dashboard-buttons">
          <button
            className="button button-success"
            onClick={() => handleClickUpdateAmount('deposit')}
          >
            Depositar
          </button>
          <button
            className="button button-danger"
            onClick={() => handleClickUpdateAmount('withdraw')}
          >
            Sacar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
