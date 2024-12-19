import { Route } from "../interfaces";
import Activaction from "../modules/auth/activation/components/Activaction";
import Login from "../modules/auth/login/components/Login";
import Register from "../modules/auth/register/components/Register";
import Resend from "../modules/auth/resend/components/Resend";
import Home from "../modules/home/components/Home";

/**
 * Routes pour l'application
 */
const routes: Route[] = [
  {
    name: "Accueil",
    key: "home",
    route: "/",
    icon: null,
    component: <Home />,
    authGuard: true,
  },
  // Ajouter d'autres routes ici...
  {
    name: "Connexion",
    key: "login",
    route: "/login",
    icon: null,
    component: <Login />,
    authGuard: false,
  },
  // Ajouter d'autres routes ici...
  {
    name: "Inscription",
    key: "register",
    route: "/register",
    icon: null,
    component: <Register />,
    authGuard: false,
  },
  // Ajouter d'autres routes ici...
  {
    name: "activation du compte",
    key: "activation",
    // route: "/activation/:verificationId/:code",
    route: "/activation",
    icon: null,
    component: <Activaction />,
    authGuard: false,
  },
  // Ajouter d'autres routes ici...
  {
    name: "resend",
    key: "resend",
    route: "/resend",
    icon: null,
    component: <Resend />,
    authGuard: false,
  },
  
  
];

export default routes;
