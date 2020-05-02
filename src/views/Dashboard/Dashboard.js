import React, { useEffect, useState } from 'react';

import api from '../../utils/api';
import convertMoneyToReal from '../../utils/convertMoneyToReal';
import './styles.css';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [valueAmount, setValueAmount] = useState('');
  const [descriptionAmount, setDescriptionAmount] = useState('');
  const [emptyInput, setEmptyInput] = useState('Todos os valores devem ser preenchidos.');
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
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  const handleClickUpdateAmount = async (type) => {
    if (!valueAmount || !descriptionAmount) {
      setEmptyInput('Todos os valores devem ser preenchidos.');
      return;
    }

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
      setEmptyInput('');
    } catch (error) {
      setValueAmount('');
      setDescriptionAmount('');
      setEmptyInput('');
      setError(error.response.data.error);
    }
  };

  return (
    <div className="dashboard-content">
      <h1>Dashboard</h1>
      <p>Bem vindo, <b>{userData.login}</b></p>
      <div className="dashboard-balance">
        <p>Saldo atual: <b>{convertMoneyToReal(userData.balance || 0)}</b></p>
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
            {emptyInput}
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
