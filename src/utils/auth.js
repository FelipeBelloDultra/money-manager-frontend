export const isAuthenticated = () => {
  if (localStorage.getItem('@access_token-money-manager')) {
    return true;
  } else {
    return false;
  }
};
