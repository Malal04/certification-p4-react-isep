import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../../../stores';

function Activaction() {
//   const [verificationId, setVerificationId] = useState("");
  const [code, setCode] = useState("");
  const { activaction, error, loginLoading, setError, message } = useUserStore();
  const navigate = useNavigate();


    const handleRegister = async () => {
        if (!code) { 
            setError("Merci de remplir tous les champs");
            return;
        }

        const  verificationId = localStorage.getItem("verificationId");

        const success = await activaction(Number(verificationId), code);

        if (success) {
            navigate("/login");
        } else {
            console.log("Erreur lors de l'activation du compte :", error);
        }

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleRegister();
    };


  return (
    <>
      <div className="activation">
        <div className="container">

          <div className="login-form">

            <div className="login-title">
              <h1>
                    Activaction du compte
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="login-form">

              <div className="login-input">
                <label htmlFor="email"> Entrez le code envoyé par SMS</label>
                <div className="email-container">
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)} 
                    placeholder="Saisir votre code..."
                  />
                </div>
              </div>

              {/* <div className="login-input">
                <label htmlFor="email"> Entrez code de verificationId</label>
                <div className="email-container">
                  <input
                    type="text"
                    id="verificationId"
                    name="verificationId"
                    value={verificationId}
                    onChange={(e) => setVerificationId(e.target.value)} 
                    placeholder="Saisir votre code..."
                  />
                </div>
              </div> */}

              <div className="login-button">
                <button type="submit" disabled={loginLoading} className="login-button">
                  {loginLoading ? "Activation en cours..." : "Valider le code"}
                </button>
              </div>

              <div className="login-forgot-password">
                    <p className="login-p-link">
                        Pas encore activer le code ? <Link to="/resend"> Renvoie du code </Link>
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

export default Activaction
