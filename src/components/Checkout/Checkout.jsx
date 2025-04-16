import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { db } from '../../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Brief from './Brief'; // ⬅️ IMPORTANTE: importás Brief

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useContext(CartContext);
    const [buyer, setBuyer] = useState({ name: '', email: '', phone: '' });
    const [orderId, setOrderId] = useState(null);

    const handleChange = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!buyer.name || !buyer.email || !buyer.phone) {
            toast.error('Completa todos los campos');
            return;
        }

        const order = {
            buyer,
            items: cart,
            total: totalPrice,
            date: Timestamp.fromDate(new Date())
        };

        try {
            const docRef = await addDoc(collection(db, 'orders'), order);
            setOrderId(docRef.id);
            clearCart();
            toast.success('¡Compra realizada con éxito!');
        } catch (error) {
            console.error("Error al guardar la orden: ", error);
            toast.error('Error al procesar la compra');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Checkout</h2>

            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <Brief /> // ⬅️ Aquí se muestra el resumen del carrito reutilizando Brief
            )}

            <h2 className="mt-4">Finalizar compra</h2>
            {orderId ? (
                <div className="alert alert-success">
                    ¡Gracias por tu compra! Tu ID de orden es: <strong>{orderId}</strong>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" name="name" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" name="phone" className="form-control" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-success">Finalizar compra</button>
                </form>
            )}
        </div>
    );
};

export default Checkout;




