
export const getToken = () => {
    return localStorage.getItem("TOKEN") || "";
}

export const setToken = (token) => {
    return localStorage.setItem("TOKEN", token);
}

export const setTRefreshToken = (token) => {
    return localStorage.setItem("REFRESH_TOKEN", token);
}