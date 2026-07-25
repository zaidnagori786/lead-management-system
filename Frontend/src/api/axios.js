// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://lead-management-system-2-lqqd.onrender.com",
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "https://lead-management-system-2-lqqd.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;