import axios from "axios";

const Api = axios.create({
  baseURL: "https://localhost:5001", // Base URL pointing to the HTTPS backend
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add Authorization header with token from localStorage
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const testApi = () => Api.get("/test");

export const createUserApi = (data) => Api.post("/api/users/register", data);

export const loginUserApi = async (data) => {
  try {
    const response = await Api.post("/api/users/login", data);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // Stringify user object before storing
    //console.log("Token stored in localStorage:", token);
    //console.log("User stored in localStorage:", user);
    return response;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getAuthorizationHeader = () => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token from local storage
  },
});
