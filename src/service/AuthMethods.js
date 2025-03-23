export const getToken = () => {
  return localStorage.getItem("TOKEN") || "";
};

export const setToken = (token) => {
  return localStorage.setItem("TOKEN", token);
};

export const setTRefreshToken = (token) => {
  return localStorage.setItem("REFRESH_TOKEN", token);
};

export const setMenuList = (menus) => {
  return localStorage.setItem("menus", JSON.stringify(menus));
};

export const getMenuList = () => {
  return localStorage.getItem("menus")
    ? JSON.parse(localStorage.getItem("menus"))
    : [];
};

export const setUserDetails = (user) => {
  return localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};
