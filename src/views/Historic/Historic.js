import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import api from '../../utils/api';
import './styles.css';

const Historic = () => {
  const history = useHistory();

  const [historics, setHistorics] = useState([]);

  const getHistorics = async () => {
    try {
      const historics = await api.get('/historics', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@access_token-money-manager')}`,
        },
      });
      setHistorics(historics.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getHistorics();
  }, []);

  const handleClickShowDatails = (id) => {
    history.push(`/historic/${id}`);
  };

  console.log(historics);

  if (historics.length !== 0) {
    return (
      <div className="historic-content">
        {historics.map(historic => (
          <div key={historic.id_hist} className="historic-content-item">
            <h4>USUÁRIO: <span className="historic-login">{historic.login}</span></h4>
            <h4>DESCRIÇÃO: </h4>
            <p>{historic.description}</p>
            <h4>TIPO: </h4>
            <p>{historic.type === 'deposit' ? 'Depóstio' : 'Saque'}</p>
            <h4>DATA: </h4>
            <p>{moment(historic.date).format('DD/MM/YYYY')}</p>
            <button
              className="historic-button-details"
              onClick={() => handleClickShowDatails(historic.id_hist)}
            >
              Detalhes
            </button>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="historic-content" style={{ textAlign: 'center' }}>
        <h1 className="error">Ainda não existe histórico.</h1>
      </div>
    );
  }
};

export default Historic;
