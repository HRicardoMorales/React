import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../../context/CartContext';

const ItemDetailContainer = () => {
    const { itemId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        setLoading(true);
        fetch(`https://fakestoreapi.com/products/${itemId}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error("Error al obtener detalles del producto:", error))
            .finally(() => setLoading(false));
    }, [itemId]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`${product.title} agregado al carrito`);
    };

    const handleDecrease = () => {
        setQuantity(q => Math.max(q - 1, 1));
    };

    const handleIncrease = () => {
        setQuantity(q => q + 1);
    };

    if (loading) return <p className="text-center mt-5">Cargando detalles...</p>;
    if (!product) return <p className="text-center mt-5">Producto no encontrado</p>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid"
                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                </div>
                <div className="col-md-6">
                    <h2>{product.title}</h2>
                    <p className="text-muted">{product.description}</p>
                    <h4 className="mt-3">${product.price}</h4>

                    <div className="my-3 d-flex align-items-center gap-2">
                        <button className="btn btn-secondary" onClick={handleDecrease}>-</button>
                        <span>{quantity}</span>
                        <button className="btn btn-secondary" onClick={handleIncrease}>+</button>
                    </div>

                    <button className="btn btn-primary" onClick={handleAddToCart}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
        
    );
};

export default ItemDetailContainer;



