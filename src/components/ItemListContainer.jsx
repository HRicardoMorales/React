import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const mockProducts = [
    { id: '1', category: 'ropa', name: 'Camiseta' },
    { id: '2', category: 'electronica', name: 'Teléfono' },
    { id: '3', category: 'accesorios', name: 'Gorra' }
];

const ItemListContainer = ({ greeting }) => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const filteredProducts = categoryId ? mockProducts.filter(p => p.category === categoryId) : mockProducts;
            setProducts(filteredProducts);
        }, 500);
    }, [categoryId]);

    return (
        <div className="container mt-4">
            <h2>{greeting}</h2>
            <p>{categoryId ? `Mostrando productos de: ${categoryId}` : "Mostrando todos los productos"}</p>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <Link to={`/item/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemListContainer;

