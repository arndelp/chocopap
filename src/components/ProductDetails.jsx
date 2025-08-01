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



  return (
    <>
      <div className="Details">     
        <div className= "kard pt-4 pb-4">              
          <Card style={{ width: '70vw' }}>
            <div className="container">
              <Card.Img variant="top" src={`${image}`} alt={title} className="imageDetails mt-2" />
            </div>
            <Card.Body>
              <Card.Title className="fs-1 lh-sm link-danger" >{title}</Card.Title>
              <Card.Text className="fs-3 lh-sm">
                {price} €
              </Card.Text>
              <Card.Text className="fs-3 lh-sm">
                {description}
              </Card.Text>
              <h3>Ingredients:</h3>
              <Card.Text className="fs-3 lh-sm">
                {ingredients}
              </Card.Text>

               {/* Section pour ajuster la quantité */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
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
              
              {/* Ajouter au panier */}
              <Card.Body>
                <Card.Link href="#" onClick={(e) => {
                  e.preventDefault();
                  addToCart(product, quantity);
                }}>
                  <Button variant="outline-dark">Ajouter {quantity} article(s) au panier</Button>
                  
                </Card.Link>
              </Card.Body>

       {/* Bouton Retour */}
              <Link to='/chocopap/boutique'>
                <p color="blue" className="boutonRetourDetail">Retour</p>
              </Link>
            </Card.Body>
          </Card>          
        </div>      
      </div>    
    </>
  )
}




