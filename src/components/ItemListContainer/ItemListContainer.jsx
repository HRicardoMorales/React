import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddItemButton from '../ItemDetailContainer/AddItemButton';
import ItemQuantitySelector from '../ItemDetailContainer/ItemQuantitySelector';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const categoryMap = {
    "men's clothing": "ropa",
    "electronics": "electronica",
    "jewelery": "accesorios",
    "women's clothing": "ropa"
};

const ItemListContainer = ({ greeting }) => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        setLoading(true);
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                const filteredProducts = categoryId
                    ? data.filter(p => categoryMap[p.category] === categoryId)
                    : data;
                setProducts(filteredProducts);
            })
            .catch(error => console.error("Error al obtener productos:", error))
            .finally(() => setLoading(false));
    }, [categoryId]);

    const handleQuantityChange = (productId, newQuantity) => {
        setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
    };

    if (loading) return <p className="text-center mt-5">Cargando productos...</p>;

    return (
        <div className="container mt-4">
            <h2 className="mb-3">{greeting}</h2>
            <p>{categoryId ? `Mostrando productos de: ${categoryId}` : "Mostrando todos los productos"}</p>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card h-100 d-flex flex-column">
                            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                <img
                                    src={product.image}
                                    className="card-img-top"
                                    alt={product.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text fw-bold">${product.price}</p>

                                <AddItemButton
                                    product={product}
                                    quantity={quantities[product.id] || 1}
                                    addToCart={addToCart}
                                />

                                <Link to={`/item/${product.id}`} className="btn btn-outline-primary mt-2">
                                    Ver detalles
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemListContainer;






