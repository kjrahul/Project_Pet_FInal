// utils/auth.js

export const isAuthenticated = () => {
    const token = sessionStorage.getItem("token");
    return token ? true : false;
  };
  
  export const getUserId = () => {
    return sessionStorage.getItem("userId");
  };
  
  export const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  };
  