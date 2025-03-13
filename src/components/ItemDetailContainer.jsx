import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const mockProducts = [
    { id: '1', category: 'ropa', name: 'Camiseta', description: 'Una camiseta de algodón' },
    { id: '2', category: 'electronica', name: 'Teléfono', description: 'Un teléfono inteligente' },
    { id: '3', category: 'accesorios', name: 'Gorra', description: 'Una gorra de béisbol' }
];

const ItemDetailContainer = () => {
    const { itemId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            const foundProduct = mockProducts.find(p => p.id === itemId);
            setProduct(foundProduct);
        }, 500);
    }, [itemId]);

    if (!product) return <p>Cargando detalles...</p>;

    return (
        <div className="container mt-4">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
        </div>
    );
};

export default ItemDetailContainer;