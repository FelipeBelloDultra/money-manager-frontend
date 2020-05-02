const convertMoneyToReal = (money) => Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(money);

export default convertMoneyToReal;
