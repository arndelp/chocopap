import "../style/Boutique.css";
import { useState, useEffect, useContext } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Button from 'react-bootstrap/Button';


export function Boutique() {
  const [items, setItems] = useState([]);

   // Récupération du panier et de la fonction pour le modifier depuis le contexte
  const { cart, setCart } = useContext(CartContext);

  // États pour chaque filtre (checkbox) + "Tous"
  const [tousChecked, setTousChecked] = useState(true);
  const [blancChecked, setBlancChecked] = useState(false);
  const [caramelChecked, setCaramelChecked] = useState(false);
  const [fruitChecked, setFruitChecked] = useState(false);
  const [laitChecked, setLaitChecked] = useState(false);
  const [liqueurChecked, setLiqueurChecked] = useState(false);
  const [noirChecked, setNoirChecked] = useState(false);
  const [noixChecked, setNoixChecked] = useState(false);

  // Etat Filtre de prix
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  //Etat Filtre par note
  const [minNote, setMinNote] = useState('');
  const [maxNote, setMaxNote] = useState('');

  // Récupération des données JSON au montage du composant
  useEffect(() => {
    fetch('/chocopap/public/products.json')
      .then(response => response.json())
      .then(data =>  setItems(data.items))
      .catch(error => console.error("Erreur de chargement :", error));
  }, []);

  //Fonction d'ajoute au panier
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    let updatedCart = [...cart];

    if (existing) {
      existing.quantity += 1; //incrémente si déjà dans le panier
    } else {
      updatedCart.push({ ...product, quantity: 1 }); //sinon ajoute un nouveau produit
    }

    setCart(updatedCart); // Met à jour le panier
    alert(`${product.title} ajouté au panier`); 
  };

  // Composant qui affiche un produit individuel (carte Bootstrap)
  const Details = ({ id, title, price, note, image, category, description, ingredients }) => {
    const product = { id, title, price, image, category, description, ingredients };
    return (
      <Card style={{ width: '18rem', margin: '1rem' }}>
        <Link className="no-underline" to='/chocopap/boutique/ProductDetails' state={product}>
          <Card.Img variant="top" src={image} alt={title} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{price}€</ListGroup.Item>
            <ListGroup.Item>Note: {note}</ListGroup.Item>
          </ListGroup>
        </Link>
        <Card.Body>
          <Button variant="outline-dark" onClick={() => addToCart(product)}>Ajouter au panier</Button>
        </Card.Body>
      </Card>
    );
  };

  // Composant qui filtre et affiche la liste des produits selon les cases cochées
  const ListProducts = () => {
    const selectedCategories = {
      blanc: blancChecked,
      caramel: caramelChecked,
      fruit: fruitChecked,
      lait: laitChecked,
      liqueur: liqueurChecked,
      noir: noirChecked,
      noix: noixChecked,
    };

     // On extrait uniquement les catégories cochées
    const activeFilters = Object.entries(selectedCategories)   //Méthode qui transforme un objet en tableau de paire [clé,valeur]
      .filter(([ , checked]) => checked)  // filtre uniquement les entrées où la valeur "checked" est true
      .map(([value]) => value); // Ensuite, on transforme les paires restantes en liste de catégories sélectionnées (on extrait juste la clé).

     // Filtrage des produits selon les cases cochées
    const filteredItems = items.filter(item => {

       // Filtrage par catégorie
      const matchCategory = tousChecked || activeFilters.length === 0 
        || activeFilters.some(cat => item.category?.[cat]);   // méthode .some  permet de vérifier si au moins une valeur du tableau activeFilters remplit une condition donnée. 
                                                              // La condition donnée ici est cat => item.category?.[cat], qui vérifie si le produit actuel possède cette catégorie.

      // Filtrage par prix
      const matchMinPrice = minPrice === '' || item.price >= parseFloat(minPrice);  // parseFloat pour concertir la chaine de caractère venant du select en nombre à virgule
      const matchMaxPrice = maxPrice === '' || item.price <= parseFloat(maxPrice);

      // FIltrage par note
      const matchMinNote = minNote === '' || item.note >= parseFloat(minNote);
      const matchMaxNote = maxNote === '' || item.note <= parseFloat(maxNote);



     // Retourne un produit si il correspond à la catégorie ET aux prix (min et max)
      return matchCategory && matchMinPrice && matchMaxPrice && matchMinNote && matchMaxNote;
    });
    

    return (
       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredItems.map(product => (
          <Details key={product.id} {...product} />
        ))}
      </div>
    );
  };

  return (
    <>
    

      {/* Titre et liste des produits */}
     
        <h1 className="titleBoutique">Boutique</h1>
      
      <div className="Boutique">
      
        <div className="allFilters col-2 ">
      {/* Zone des filtres */}
        <div className='ico'>
          <label className="filterLabelTitle">Catégories:</label>
          {/* Chaque case désactive "Tous" lorsqu'elle est cochée , "Tous" désactive les autres lorsqu'elle est cochée */}
          <label className="filterLabel"><input type="checkbox" checked={tousChecked} onChange={() => {setTousChecked(!tousChecked); setBlancChecked(false); setCaramelChecked(false); setFruitChecked(false);setLaitChecked(false); setLiqueurChecked(false); setNoirChecked(false); setNoixChecked(false); }} /> Tous</label>
          <label className="filterLabel"><input type="checkbox" checked={blancChecked} onChange={() => { setBlancChecked(!blancChecked); setTousChecked(false); }} /> Blanc </label>
          <label className="filterLabel"><input type="checkbox" checked={caramelChecked} onChange={() => { setCaramelChecked(!caramelChecked); setTousChecked(false); }} /> Caramel</label>
          <label className="filterLabel"><input type="checkbox" checked={fruitChecked} onChange={() => { setFruitChecked(!fruitChecked); setTousChecked(false); }} /> Fruit</label>
          <label className="filterLabel"><input type="checkbox" checked={laitChecked} onChange={() => { setLaitChecked(!laitChecked); setTousChecked(false); }} /> Lait</label>
          <label className="filterLabel"><input type="checkbox" checked={liqueurChecked} onChange={() => { setLiqueurChecked(!liqueurChecked); setTousChecked(false); }} /> Liqueur</label>
          <label className="filterLabel"><input type="checkbox" checked={noirChecked} onChange={() => { setNoirChecked(!noirChecked); setTousChecked(false); }} /> Noir</label>
          <label className="filterLabel"><input type="checkbox" checked={noixChecked} onChange={() => { setNoixChecked(!noixChecked); setTousChecked(false); }} /> Noix</label>
        </div>

        {/* Menus déroulants  pour les filtres de Prix*/}
        <div className="prix-filtres-top " >
          <label className="filterLabelTitle">Prix:</label>
          <label className="filterLabel ">
            Prix min : 
            <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)} style={{ marginLeft: '0.5rem' }}>
              <option value="">--</option>
              <option value="5">5€</option>
              <option value="10">10€</option>
              <option value="15">15€</option>
              <option value="20">20€</option>
            </select>
          </label>

          <label className="filterLabel prix-filtres">
          Prix max : 
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ marginLeft: '0.5rem' }}>
              <option value="">--</option>
              <option value="10">10€</option>
              <option value="15">15€</option>
              <option value="20">20€</option>
              <option value="25">25€</option>
            </select>
          </label>
        </div>

        {/* Menus déroulants  pour les filtres de note*/}
        <div className="notes-filtres-top" >
          <label className="filterLabelTitle">Note:</label>
          <label className="filterLabel notes-filtres">
            Note min : 
            <select value={minNote} onChange={(e) => setMinNote(e.target.value)} style={{ marginLeft: '0.5rem' }}>
              <option value="">--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>

          <label className="filterLabel notes-filtres">
          Note max : 
            <select value={maxNote} onChange={(e) => setMaxNote(e.target.value)} style={{ marginLeft: '0.5rem' }}>
              <option value="">--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>
      </div>
      <div className="col-10 ListProduct">
        <ListProducts />
      </div>
      </div>
    </>
  );
}
