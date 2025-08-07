import { useContext } from "react";
import { CartContext } from "../../context/CartContext.jsx"; // 🔁 adapte le chemin si besoin
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "../style/Cart.css"

export function Cart({isOpen, onClose}) {

  const { cart, setCart } = useContext(CartContext);

  // Met à jour le panier dans le context + localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart); // CartContext s’occupe déjà de localStorage
  };

  // Augmenter la quantité
  const increaseQty = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  // Diminuer la quantité
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    updateCart(updatedCart);
  };

  // Supprimer un produit
  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  // Total général
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  

 return (
    <>
      {isOpen && <div className="overlay" onClick={onClose} />}  {/*overlay pour assombrir la page dérière*/}

      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h1>Votre Panier</h1>
          <button onClick={onClose} className="close-btn">
            &times;
          </button>
        </div>

        <div className="drawer-content">
          {cart.length === 0 ? (
            <p>Le panier est vide.</p>
          ) : (
            <>
              {cart.map(item => (
                <Card key={item.id} style={{ margin: "1rem" }}>
                  <Card.Body style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "140px", marginRight: "1rem" }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>Prix unitaire : {item.price}€</Card.Text>
                      <Card.Text>Quantité : {item.quantity}</Card.Text>
                      <Card.Text>
                        Total : {(item.price * item.quantity).toFixed(2)}€
                      </Card.Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      <Button
                        variant="success"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => removeItem(item.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
              <h3 style={{ marginTop: "2rem", marginLeft: "2rem" }}>
                Total à payer : {total.toFixed(2)}€
              </h3>
            </>
          )}
        </div>
      </div>
    </>
  );
}