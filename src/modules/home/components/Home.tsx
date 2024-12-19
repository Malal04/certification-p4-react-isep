
import { useUserStore } from "../../../stores";
import { useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Order } from "../../../interfaces/user";
import "./Home.css"
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const { orderde,orders, error, message , logout} = useUserStore();

   
  useEffect(() => {
      orderde()
     
  }, [orderde]);

  console.log(" orders " , orders);

  const handleLogout = async () => {
    // Afficher une alerte avant la déconnexion
    const confirmLogout = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    
    if (confirmLogout) {
        await logout(); 
        navigate("/"); 
        alert("Vous avez été déconnecté avec succès.");
    }
};

  return (
    <>
       <div className="candidat-container">


            <h2>Liste des Produits</h2>

            <div className="deconnection" >
              <Link
                onClick={handleLogout} to={"/login"}>Deconnection
              </Link>
            </div>

            <div className="candidat-stats">
                <table className="candidat-table">
                    <thead>
                        <tr>
                            <th> Nom du Produit</th>
                            <th> Quantité du Produit </th>
                            <th> Prix du Produit</th>
                            <th> Date de Commande du Produit </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                                orders.map((postuler: Order) => (
                                    <tr key={postuler.id}>
                                        <td>{postuler.label}</td>
                                        <td>{postuler.quantity}</td>
                                        <td>{postuler.price } </td>
                                        <td>{postuler.orderDate}</td>
                                        <td>
                                            <button type="button">
                                                <FaEye />
                                            </button>
                                            <button type="button" >
                                                <FaTrash /> 
                                            </button>
                                        </td>
                                    </tr>


                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan={4}> Aucun utilisateur trouvé </td>
                                    </tr>

                                )}
                    </tbody>
                </table>
            </div>

              <div className="login-forgot-password">
                    {message && <div className="success-message"> {message} </div>}
              </div>

              <div className="error">
                {error && <div className="error-message"> {error}</div>}
              </div>
        </div>
    </>
  );
};

export default Home;
