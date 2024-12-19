import React, { useState } from 'react';
import './Otp.css';
import { Link } from 'react-router-dom';

function Otp() {
  // État des champs OTP, chaque champ a une valeur vide au début
  const [otp, setOtp] = useState({ first: '', second: '', third: '', fourth: '', fifth: '', sixth: '' });
  const [isValid, setIsValid] = useState(true); // État de validation du formulaire

  // Fonction pour gérer le changement de chaque champ OTP
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof otp) => {
    const value = e.target.value;

    // Vérification que la valeur entrée est un chiffre ou une lettre
    if (!/^[0-9A-Za-z]$/.test(value) && value !== '') return;

    // Mise à jour de l'OTP
    setOtp((prevOtp) => ({
      ...prevOtp,
      [field]: value,
    }));

    // Si un champ est rempli, on passe au champ suivant
    if (value && field !== 'sixth') {
      const nextField = document.getElementById(getNextField(field));
      if (nextField instanceof HTMLInputElement) {
        nextField.focus();
      }
    }
  };

  // Fonction pour revenir au champ précédent lors de la pression sur "Backspace"
  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, field: keyof typeof otp) => {
    if (e.key === 'Backspace' && !otp[field] && field !== 'first') {
      const prevField = document.getElementById(getPrevField(field)) as HTMLInputElement;
      prevField?.focus();
    }
  };

  // Fonction pour obtenir l'ID du champ suivant
  const getNextField = (field: keyof typeof otp): string => {
    const fields = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
    const currentIndex = fields.indexOf(field);
    return currentIndex < fields.length - 1 ? fields[currentIndex + 1] : '';
  };

  // Fonction pour obtenir l'ID du champ précédent
  const getPrevField = (field: keyof typeof otp): string => {
    const fields = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
    const currentIndex = fields.indexOf(field);
    return currentIndex > 0 ? fields[currentIndex - 1] : '';
  };

  // Fonction pour vérifier si tous les champs sont remplis avant la soumission
  const handleSubmit = () => {
    const otpValues = Object.values(otp);
    if (otpValues.every((value) => value !== '')) {
      alert('OTP validé');
      setOtp({ first: '', second: '', third: '', fourth: '', fifth: '', sixth: '' }); // Réinitialiser l'OTP
      setIsValid(true);
    } else {
      setIsValid(false); // Afficher une erreur si OTP incomplet
    }
  };

  return (
    <div className="otp">
      <div className="container">
        <div className="otp-container">
          <div className="otp-card">
            <h6>Veuillez entrer le mot de passe à usage unique pour vérifier votre compte</h6>
            <div className="code-info">
              <span>Un code a été envoyé à</span>
              <small>*******9897</small>
            </div>
            <div id="otp" className="otp-inputs">
              {['first', 'second', 'third', 'fourth', 'fifth', 'sixth'].map((field) => (
                <input
                  key={field}
                  className={`otp-input ${!isValid ? 'input-error' : ''}`} // Ajout de la classe d'erreur si OTP invalide
                  type="text"
                  id={field}
                  maxLength={1}
                  value={otp[field as keyof typeof otp]}
                  onChange={(e) => handleInputChange(e, field as keyof typeof otp)}
                  onKeyDown={(e) => handleBackspace(e, field as keyof typeof otp)}
                  aria-label={`Digit ${field} of OTP`}
                  placeholder="0"
                />
              ))}
            </div>
            {!isValid && <p className="error-message">Veuillez remplir tous les champs avec des chiffres ou lettres valides.</p>}
            <div className="validate-btn">
              <button type="button" className="validate" onClick={handleSubmit}>Valider</button>
            </div>
          </div>
          <div className="resend-container">
            <div className="resend-content">
              <span>Vous n'avez pas reçu le code ?</span>
              <Link to="#" className="resend-link">Renvoyer(1/3)</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
