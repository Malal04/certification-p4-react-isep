import { ReactNode, useEffect, useState } from "react";
import { getToken } from "../services/TokenService";
import { useNavigate } from "react-router-dom";
import { appName } from "../../config/global.config";

function WrapperComponent({
  component,
  title,
  auth,
}: {
  title: string;
  component: ReactNode;
  auth?: boolean;
  routeKey?: string;
}) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Si la route requiert une authentification
    if (auth) {
      const token = getToken();
      if (!token) {
        // Si pas de token, on redirige vers la page de login
        alert("Vous allez être redirigé vers la page de connexion.");
        navigate("/login");
        return;
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(true); // Si pas d'authentification requise, on autorise l'accès
    }

    // Titre de la page sur l'onglet du navigateur
    document.title = `${appName}: ${title}`;
  }, [title, auth, navigate]);

  // Si l'authentification est en cours, on peut afficher un écran de chargement ou une attente
  if (isAuthenticated === null) {
    return <div>Chargement...</div>; // Vous pouvez personnaliser ce message avec un spinner ou un message de chargement
  }

  // Rendu du composant principal si l'utilisateur est authentifié ou si la route ne nécessite pas d'authentification
  return <>{component}</>;
}

export default WrapperComponent;
