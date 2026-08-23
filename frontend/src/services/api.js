import axios from "axios";

const api = axios.create({
  baseURL: "https://taskflow-backend-sw7t.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("taskflow_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// =========================================================
// AUTH
// =========================================================

export const registerUser = async (data) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  localStorage.setItem(
    "taskflow_token",
    response.data.access_token
  );

  return response.data;
};


export const loginUser = async (data) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  localStorage.setItem(
    "taskflow_token",
    response.data.access_token
  );

  return response.data;
};


// =========================================================
// FORGOT PASSWORD
// =========================================================

export const forgotPassword = async (email) => {
  const response = await api.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return response.data;
};


// =========================================================
// RESET PASSWORD
// =========================================================

export const resetPassword = async (
  token,
  newPassword
) => {
  const response = await api.post(
    "/auth/reset-password",
    {
      token,
      new_password: newPassword,
    }
  );

  return response.data;
};


// =========================================================
// TASKS
// =========================================================

export const getTasks = async () => {
  const response = await api.get("/tasks/");
  return response.data;
};


export const createTask = async (data) => {
  const response = await api.post(
    "/tasks/",
    data
  );

  return response.data;
};


export const updateTask = async (
  taskId,
  data
) => {
  const response = await api.put(
    `/tasks/${taskId}`,
    data
  );

  return response.data;
};


export const deleteTask = async (
  taskId
) => {
  const response = await api.delete(
    `/tasks/${taskId}`
  );

  return response.data;
};


// =========================================================
// LOGOUT
// =========================================================

export const logoutUser = () => {
  localStorage.removeItem(
    "taskflow_token"
  );
};


export default api;