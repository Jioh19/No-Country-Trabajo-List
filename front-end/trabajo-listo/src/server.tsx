import axios from "axios";

//Configuracion axios con la url a los endpoints
const apiClient = axios.create({
  baseURL: "https://trabajo-listo.vercel.app/api/",
});

//Configuracion de autorizacion y token
export const setClientToken = (token: string) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
