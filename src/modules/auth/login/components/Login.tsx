import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../../../stores";
import { FaEye, FaEyeSlash, FaLock, FaPhone } from "react-icons/fa";
import "../../Auth.css";

const Login = () => {
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const { login,getCountries, error, loginLoading, setError, user , message, countries} = useUserStore();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      setPhoneNumber(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
  
    if (!phoneNumber || !password) {
      setError("Merci de remplir les champs vides");
      return;
    }

    const success = await login({countryCode, phoneNumber, password });
    if (success) {

      navigate("/");
    } else {
      console.log("Erreur lors de la connexion :", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  useEffect(() => {
    getCountries()
  }, [getCountries]);

  console.log(" countries " , countries);

  return (

    <div className="login">

      <div className="container">

        <div className="login-form">
          
          <div className="login-title">
            <h1>Connexion</h1>
          </div>

          <form onSubmit={handleSubmit} className="login-form">

          <div className="login-input">
            <label htmlFor="email">Pays code</label>
              <div className="email-container">
                <select name="countryCode" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}  required>
                  <option value="">Sélectionner une option</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.code}>{country.name}</option>
                      ))}
                  </select>
                </div>
            </div>

            <div className="login-input">
              <label htmlFor="email">Email d'utilisateur</label>
              <div className="email-container">
                <span className="email-icon">
                  <FaPhone />
                </span>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber" 
                  value={phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Saisir votre email..."
                />
              </div>
            </div>

            <div className="login-input">
              <label htmlFor="password">Mot de passe</label>
              <div className="password-container">
                <span className="password-icon">
                  <FaLock />
                </span>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"

                  value={password}
                  onChange={handleInputChange}
                  placeholder="Saisir votre mot de passe..."
                />
                <span onClick={togglePasswordVisibility}  className="password-toggle">
                  {isPasswordVisible ? (
                    <FaEyeSlash  />
                  ) : (
                    <FaEye />
                  )}
                </span>
              </div>
            </div>

            <div className="login-button">
              <button type="submit" disabled={loginLoading} className="login-button">
                {loginLoading ? "Connexion en cours..." : "Se Connecter"}
              </button>
            </div>
            
            <div className="login-forgot-password">
              <p className="login-p-link">
                Vous n'avez pas de compte ? <Link to="/register"> Créer un compte </Link>
              </p> 
            </div>

            <div className="login-forgot-password">
              {message && <div className="success-message"> {message} </div>}
            </div>

            <div className="error">
              {error && <div className="error-message"> {error}</div>}
            </div>

          </form>

        </div>

      </div>
      
    </div>
    
  );
};

export default Login;
