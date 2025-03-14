import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const categoryMap = {
    "men's clothing": "ropa",
    "electronics": "electronica",
    "jewelery": "accesorios"
};

const ItemListContainer = ({ greeting }) => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                const filteredProducts = categoryId ? data.filter(p => categoryMap[p.category] === categoryId) : data;
                setProducts(filteredProducts);
            })
            .catch(error => console.error("Error al obtener productos:", error))
            .finally(() => setLoading(false));
    }, [categoryId]);

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div className="container mt-4">
            <h2>{greeting}</h2>
            <p>{categoryId ? `Mostrando productos de: ${categoryId}` : "Mostrando todos los productos"}</p>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 mb-3">
                        <div className="card" style={{ height: "100%" }}>
                            <img src={product.image} className="card-img-top" alt={product.title} style={{ objectFit: "cover", height: "250px" }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text flex-grow-1">{product.description}</p>
                                <Link to={`/item/${product.id}`} className="btn btn-primary mt-auto">Ver detalles</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemListContainer;


