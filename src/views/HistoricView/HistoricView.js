import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import api from '../../utils/api';
import convertMoneyToReal from '../../utils/convertMoneyToReal';
import './styles.css';

const HistoricView = (props) => {
  const history = useHistory();

  const [historic, setHistoric] = useState({});

  const getHistoric = useCallback(async () => {
    try {
      const historic = await api.get(`/historic/${props.match.params.id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@access_token-money-manager')}`,
        },
      });
      setHistoric(historic.data[0]);
    } catch (error) {
      console.log(error.response);
    }
  }, [props.match.params.id]);

  console.log(historic);

  useEffect(() => {
    getHistoric();
  }, [getHistoric]);

  return (
    <div
      className="historic-view-content"
      style={{
        background: historic.type === 'deposit'
          ? 'rgba(56, 184, 63, 0.9)'
          : 'rgba(220, 53, 69, 0.9)'
      }}
    >
      <div className="historic-view-content-main">
        <div>
          <p>Usuário: <b>{historic.login}</b></p>
          <p>descrição:  <b>{historic.description}</b></p>
          <p>Data:  <b>{moment(historic.date).format('DD/MM/YYYY')}</b></p>
          <p>ID do Histórico: <b>{historic.id_hist}</b></p>
        </div>
        <div>
          <p>Valor Antigo:  <b>{convertMoneyToReal(historic.old_value || 0)}</b>
          </p>
          <p>Valor adicional:  <b>{convertMoneyToReal(historic.additional_value || 0)}</b>
          </p>
          <p>Total (Na hora da transação):  <b>{convertMoneyToReal(historic.amount || 0)}</b>
          </p>
          <p>Tipo:  <b>{historic.type === 'deposit' ? 'Depóstio' : 'Saque'}</b></p>
        </div>
      </div>
      <button
        className="historic-view-button"
        onClick={() => history.push('/historic')}
      >
        Voltar
      </button>
    </div>
  );
};

export default HistoricView;
