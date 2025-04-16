import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddItemButton from '../ItemDetailContainer/AddItemButton';
import { CartContext } from '../../context/CartContext';

const ItemListContainer = ({ greeting }) => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const productsRef = collection(db, "products");

                let q = productsRef;
                if (categoryId) {
                    q = query(productsRef, where("category", "==", categoryId));
                }

                const querySnapshot = await getDocs(q);
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(items);
            } catch (error) {
                console.error("Error al obtener productos de Firebase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
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
                                    alt={product.title}
                                    className="img-fluid"
                                    style={{ maxHeight: '250px', objectFit: 'contain' }}
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







