import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../../../stores';

function Resend() {
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { activateAccount, error, loginLoading, setError, message , getCountries, countries} = useUserStore();
  const navigate = useNavigate();


    const handleRegister = async () => {
        if (!countryCode ||!phoneNumber) { 
            setError("Merci de remplir tous les champs");
            return;
        }

        const success = await activateAccount(countryCode, phoneNumber);

        if (success) {
            navigate("/activation");
        } else {
            console.log("Erreur lors de l'activation du compte :", error);
        }

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleRegister();
    };

    useEffect(() => {
        getCountries()
      }, [getCountries]);
    
      console.log(" countries " , countries);


  return (
    <>
      <div className="activation">
        <div className="container">

          <div className="login-form">

            <div className="login-title">
              <h1>
                    Renvoie du code par sms
              </h1>
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
                <label htmlFor="email"> Entrez code de verificationId</label>
                <div className="email-container">
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    placeholder="Saisir votre Numer de telephone..."
                  />
                </div>
              </div>

              <div className="login-button">
                <button type="submit" disabled={loginLoading} className="login-button">
                  {loginLoading ? "Activation en cours..." : "Valider le code"}
                </button>
              </div>

              <div className="login-forgot-password">
                    <p className="login-p-link">
                        <Link to="/activation"> retourner vers la page d'activation</Link>
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
    </>
  )
}

export default Resend
