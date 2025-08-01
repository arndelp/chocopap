import { useLocation, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';import { useContext } from "react";
import { CartContext } from "../../context/CartContext.jsx";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import "../style/ProductDetails.css"




/*Utilisation de la méthose useLocation de react router pour récupérer les données de Produit */

export  function ProductDetails () {
  const location = useLocation();
  const id = location.state.id
  const title = location.state.title
  const price = location.state.price  
  const image = location.state.image  
  const category = location.state.category
  const description = location.state.description
  const ingredients = location.state.ingredients

  //Récupération du panier ( du cartContext)
  const { cart, setCart } = useContext(CartContext);

   // Ajouter un état pour la quantité
  const [quantity, setQuantity] = useState(1);

    // Fonction pour gérer le changement de quantité
  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10)); // Empêcher les valeurs négatives ou nulles
    setQuantity(value);
  };

  // Augmenter la quantité
  const increaseQuantity = () => setQuantity(prev => prev + 1);

  // Diminuer la quantité
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));


   const product = { id, title, price, image, category, description, ingredients };

// Fonction pour ajouter un produit avec la quantité au panier
  const addToCart = (product, quantity) => {    
    const existing = cart.find(item => item.id === product.id);
    const updatedCart = [...cart];

    if (existing) {
      existing.quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity});
    }

    setCart(updatedCart);
    alert(`${quantity} ${product.title} ajouté(s) au panier`);
  };

  //URL de l'image
 const baseUrl = '/chocopap';
 const imagePath = `${baseUrl}/${image}`;

console.log("Chemin image :", image);
  return (
    <>
      <div className="Details">     
        <div className= "kard pt-4 pb-4">              
          <Card style={{ display: 'flex', flexDirection: 'row', maxWidth: '100vw', margin: 'auto' }}>
  {/* Image à gauche */}
  <div style={{ width: '500px', height: 'auto' }}>
    <img
      src={imagePath}
      alt={title}
      style={{ width: '20vw', height: 'auto', objectFit: 'cover' }}
    />
  </div>

  {/* Détails à droite */}
  <div className="d-flex flex-column flex-grow-1 p-3">
    <Card.Body>
      <Card.Title className="fs-1 lh-sm link-danger">{title}</Card.Title>
      <Card.Text className="fs-3 lh-sm">{price} €</Card.Text>
      <Card.Text className="fs-4 lh-sm">{description}</Card.Text>

      <h3>Ingrédients:</h3>
      <Card.Text className="fs-4 lh-sm">{ingredients}</Card.Text>

      <div className="my-3 d-flex align-items-center">
        <button onClick={decreaseQuantity} style={{ fontSize: '18px', width: '30px', height: '30px' }}>-</button>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
          style={{ width: '50px', margin: '0 10px', textAlign: 'center' }}
        />
        <button onClick={increaseQuantity} style={{ fontSize: '18px', width: '30px', height: '30px' }}>+</button>
      </div>

      <Button variant="outline-dark" onClick={() => addToCart(product, quantity)}>
        Ajouter {quantity} article(s) au panier
      </Button>

      <div className="mt-4">
        <Link to="/chocopap/boutique" className="btn btn-link">← Retour à la boutique</Link>
      </div>
    </Card.Body>
  </div>
</Card>         
        </div>      
      </div>    
    </>
  )
}




