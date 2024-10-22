export const setToken = (token: string, remeberMeCheck = true) => {
  if (typeof window === "undefined") {
    return null;
  }
  if (remeberMeCheck) localStorage.setItem("auth_token", token);
  else sessionStorage.setItem("auth_token", token);
  return {};
};

export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const token =
    sessionStorage.getItem("auth_token") || localStorage.getItem("auth_token");
  return token;
};

export const get_userId = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const userId = localStorage.getItem("user_id");
  return userId;
};

//   check this

export const setUserId = (user_id: string) => {
  if (typeof window === "undefined") {
    return null;
  }
  const userId = localStorage.setItem("user_id", user_id);
  return userId;
};
export const deleteToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  sessionStorage.removeItem("auth_token");
  localStorage.removeItem("auth_token");
  return {};
};
