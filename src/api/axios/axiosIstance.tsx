import axios from "axios";
import { apiUrl } from "../../config/api.config";
import { getToken, removeToken } from "../../shared/services/TokenService";

// Création de l'instance axios
const axiosInstance = axios.create({
  // Lien de base de l'api
  baseURL: apiUrl,

  // Temps en millisecondes avant qu'une requête ne soit considérée comme expirée
  timeout: 10000,

  // Ajout du header Content-Type par défaut

  headers: {
    "Content-Type": "application/json",
  },
});


// Interception des requêtes
axiosInstance.interceptors.request.use(
  (config) => {

    // Récupération du token depuis le local storage
    const token = getToken();

    // Si le token existe, on l'ajoute dans le header de la requête
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Si il y a une erreur, on la renvoie tout simplement
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si la requête n'a pas pu être envoyée pour une raison ou une autre on notifie d'une erreur réseau
    if (!error.response) {
      return Promise.reject({
        status: 408,
        type: "NETWORK_ERROR",
        message: "Une erreur de réseau est survenue",
      });
    } else {


      // Si le serveur nous retourne un 401 ou un 403, on supprime le token et on redirige l'utilisateur vers la page de connexion
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        removeToken();
        // Remplacer "/login" par le nom de la route de la page de connexion si la route est différente
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
