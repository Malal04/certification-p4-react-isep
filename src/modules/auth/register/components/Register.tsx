import { useEffect, useState } from "react";
import { useUserStore } from "../../../../stores";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaPhone, FaUser } from "react-icons/fa";

function Register() {

    const { register, error, loginLoading, setError, message, getCountries , countries } = useUserStore();
    const [password, setPassword] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleRegister = async () => {
        if (!countryCode || !firstName || !lastName || !phoneNumber || !password) { 
            setError("Merci de remplir tous les champs");
            return;
        }
    
        const phoneRegex = /^[0-9]{8,15}$/;
    
        if (!phoneRegex.test(phoneNumber)) {
            setError("Le numéro de téléphone est incorrect");
            return;
        }

        const cleanedTelephone = phoneNumber.replace(/\s+/g, '').trim();
    
        const success = await register({ countryCode, firstName, lastName, phoneNumber: cleanedTelephone, password });
    
        if (success) {
            navigate("/activation");
        } else {
            console.log("Erreur lors de l'inscription :", error);
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

        <div className="login">

            <div className="container">

                <div className="login-form">
                    
                    <div className="login-title">
                        <h1>Inscription</h1>
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
                            <label htmlFor="email">Nom de famille</label>
                            <div className="email-container">
                                <span className="email-icon">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    placeholder="Entrez votre nom de famille..."
                                />
                            </div>
                        </div>

                        <div className="login-input">
                            <label htmlFor="email">Prenom de l'utilisateur</label>
                            <div className="email-container">
                                <span className="email-icon">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} 
                                    placeholder="Entrez votre prenom..."
                                />
                            </div>
                        </div>

                        <div className="login-input">
                            <label htmlFor="email">Numero de telephone</label>
                            <div className="email-container">
                                <span className="email-icon">
                                    <FaPhone />
                                </span>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber" 
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                    placeholder="Saisir votre Numero de telephone..."
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
                                    onChange={(e) => setPassword(e.target.value)} 
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
                                {loginLoading ? "Connexion en cours..." : "S'inscrire"}
                            </button>
                        </div>
                        
                        <div className="login-forgot-password">
                            <p className="login-p-link">
                                Vous avez déjà un compte ? <Link to="/login"> Connexion</Link>
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

export default Register
