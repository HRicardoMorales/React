import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { CartContext } from '../context/CartContext';
import AddItemButton from './ItemDetailContainer/AddItemButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryView = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(
                    collection(db, "products"), // ⚠️ Asegurate que esta es la colección correcta
                    where("category", "==", decodeURIComponent(categoryId))
                );
                const querySnapshot = await getDocs(q);
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(items);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchProducts();
    }, [categoryId]);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Productos en: {decodeURIComponent(categoryId)}</h2>
            <div className="row">
                {products.length === 0 ? (
                    <p>No se encontraron productos para esta categoría.</p>
                ) : (
                    products.map(product => (
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
                                        quantity={1}
                                        addToCart={addToCart}
                                    />

                                    <Link to={`/item/${product.id}`} className="btn btn-outline-primary mt-2">
                                        Ver detalles
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryView;

