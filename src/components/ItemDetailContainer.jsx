import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemDetailContainer = () => {
    const { itemId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://fakestoreapi.com/products/${itemId}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error("Error fetching product details:", error))
            .finally(() => setLoading(false));
    }, [itemId]);

    if (loading) return <p className="text-center mt-4">Cargando detalles...</p>;
    if (!product) return <p className="text-center mt-4">Producto no encontrado</p>;

    return (
        <div className="container mt-4">
            <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                <img src={product.image} className="card-img-top" alt={product.title} style={{ objectFit: 'contain', height: '300px' }} />
                <div className="card-body">
                    <h2 className="card-title">{product.title}</h2>
                    <p className="card-text">{product.description}</p>
                    <h4 className="text-primary">${product.price}</h4>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailContainer;