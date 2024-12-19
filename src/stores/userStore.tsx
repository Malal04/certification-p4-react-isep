import { create } from "zustand";
import {
  // getToken,
  removeToken,
  setToken,
} from "../shared/services/TokenService";
import { User } from "../interfaces";
import {
  Countrie,
  LoginPayload,
  Order,
  RegisterPayload,
} from "../interfaces/user";
import axiosInstance from "../api/axios/axiosIstance";
import { handleApiError } from "../utils/Tools";

const userStore = (set: any, get: any) => ({
  user: null,
  countrie: null,
  countries: [],
  orders: [],
  loading: false,
  loginLoading: false,
  error: null,
  message: null,

  setUser: (user: User) => {
    set({ user });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setMessage: (message: string | null) => {
    set({ message });
  },

  reset: () => {
    set({
      user: null,
      countrie: null,
      countries: [],
      orders: [],
      error: null,
      verificationId: null,
    });
  },
  
  login: async (loginPayload: LoginPayload) => {
    
    set({ loginLoading: true, error: null });
    
    console.log("Tentative de connexion avec les informations suivantes :", loginPayload);
  
    try {
      const response = await axiosInstance.post("/auth/login", loginPayload);

      console.log("Réponse du serveur :", response); 
  
      const { user, verificationId, accessToken } = response.data;
  
      set({ user, verificationId });
  
      if (accessToken) {
        setToken(accessToken);
        console.log("Token stocké :", accessToken); 
      }
  
      set({ message: "Connexion réussie!", error: null });

      return true;
    } catch (err: any) {
      const error = handleApiError(err);
      set({ error });
      console.log("Erreur de connexion :", error); 
      return false;
    } finally {
      set({ loginLoading: false });
      console.log("Chargement terminé."); 
    }
  },

  register: async (registerPayload: RegisterPayload) => {
    
    set({ loginLoading: true, error: null });

    console.log("Tentative d'inscription avec les informations suivantes :", registerPayload);

    try {

      const response = await axiosInstance.post("/auth/signup", registerPayload);

      console.log("Réponse du serveur :", response.data); 

      const { user, accessToken } = response.data;

      set({ user }); 

      if (accessToken) {
        setToken(accessToken);
        console.log("Token stocké :", accessToken); 
      }

      set({ message: "Inscription réussie!", error: null });

      return true;

    } catch (err: any) {
      const error = handleApiError(err);
      set({ error });
      console.log("Erreur d'inscription :", error); 
      return false;
    } finally {
      set({ loginLoading: false });
      console.log("Chargement terminé."); 
    }
  },


  getCountries: async () => {
    set({ loading: true, error: null });
    try {      
        // Faire la requête à l'API
        const response = await axiosInstance.get(`/countries`);

        // Log de la réponse complète
        console.log("Réponse du serveur de récupération du countries :", response.data);

        set({ countries: response.data });

        console.log("Réponse après traitement :", response);
        
    } catch (err) {
        // Gestion des erreurs API
        const error = handleApiError(err);
        set({ error });
        console.log("Erreur lors de la récupération du countries :", error);
    } finally {
        // Arrêter le chargement
        set({ loading: false });
        console.log("Chargement terminé.");
    }
  },

  activaction: async (verificationId: number, code: string) => {
    set({ loading: true, error: null });
    console.log("Tentative de l'activation du code  : ", verificationId, code);
    try {
        const response = await axiosInstance.post(`auth/account/activation/confirm/${verificationId}/${code}`);

        console.log("Réponse du serveur :", response);

        const { user, accessToken } = response.data;
    
        set({ user });

        if (accessToken) {
            setToken(accessToken);
            console.log("Token stocké :", accessToken);
        }

        set({ message: "Ativaction reussi!", error: null });

        return true;

    } catch (err) {
        const error = handleApiError(err);
        console.log("Erreur lors de l'activation du compte :", error);
        return false;
    } finally {
        set({ loading: false });
        console.log("Chargement terminé.");
    }
  },

  orderde: async () => {
    set({ loading: true, error: null });
    try {      
        // Faire la requête à l'API
        const response = await axiosInstance.get(`/orders`);

        // Log de la réponse complète
        console.log("Réponse du serveur de récupération du countries :", response.data);

        set({ orders: response.data });

        console.log("Réponse après traitement :", response);
        
    } catch (err) {
        // Gestion des erreurs API
        const error = handleApiError(err);
        set({ error });
        console.log("Erreur lors de la récupération du countries :", error);
    } finally {
        // Arrêter le chargement
        set({ loading: false });
        console.log("Chargement terminé.");
    }
  },

  activateAccount: async (countryCode: string, phoneNumber: string) => {
    set({ loading: true, error: null });
    console.log("Tentative de l'activation du code  : ", countryCode, phoneNumber);
    try {
        const response = await axiosInstance.post(`auth/account/activation/resend/${countryCode}/${phoneNumber}`);

        console.log("Réponse du serveur :", response);

        const { user, accessToken } = response.data;
    
        set({ user });

        if (accessToken) {
            setToken(accessToken);
            console.log("Token stocké :", accessToken);
        }

        set({ message: "Ativaction reussi!", error: null });

        return true;

    } catch (err) {
        const error = handleApiError(err);
        console.log("Erreur lors de l'activation du compte :", error);
        return false;
    } finally {
        set({ loading: false });
        console.log("Chargement terminé.");
    }
  },


  logout: () => {
    removeToken();
    get().reset();
  },

  resetMessages: () => {
    get().setError(null);
    get().setMessage(null);
  },

  isAuthenticated: async () => {
   /*  const token = getToken();
    if (token && !get().user) {
      set({ loading: true, error: null });
      try {
        const response = await axiosInstance.get("/users/check/session");
        set({ user: response.data });
      } catch (err: any) {
        let error = handleApiError(err);
        set({ error });
      } finally {
        set({ loading: false });
      }
    } */
  },
  
});

const useUserStore = create<{
  user: User | null;
  countrie: Countrie | null;
  countries: Countrie[];
  orders: Order[];
  loading: boolean;
  loginLoading: boolean;
  error: string | null;
  message: string | null;
  setUser: (user: User) => void;
  setError: (error: string | null) => void;
  setMessage: (message: string | null) => void;
  reset: () => void;
  resetMessages: () => void;
  login: (loginPayload: LoginPayload) => Promise<boolean>;
  register: (registerPayload: RegisterPayload) => Promise<boolean>;
  getCountries: () => Promise<void>;
  orderde: () => Promise<void>;
  logout: () => void;
  isAuthenticated: () => Promise<void>;
  activaction: (verificationId: number, code: string) => Promise<boolean>;
  activateAccount: (countryCode: string, phoneNumber: string) => Promise<boolean>;
}>(userStore);

// Vérifier la session de l'utilisateur juste après la création du store
useUserStore.getState().isAuthenticated();

export default useUserStore;
