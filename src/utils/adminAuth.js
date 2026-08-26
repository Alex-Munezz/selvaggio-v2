const TOKEN_KEY = "selvaggio_admin_token";
const USER_KEY = "selvaggio_admin_user";

export const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

export const getAdminToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAdminSession = (
  token,
  user
) => {
  localStorage.setItem(
    TOKEN_KEY,
    token
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
};

export const getAdminUser = () => {
  const storedUser =
    localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export const clearAdminSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};