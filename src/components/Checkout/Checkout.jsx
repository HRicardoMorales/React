import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import Brief from './Brief';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [buyer, setBuyer] = useState({ name: '', email: '' });

    const handleChange = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!buyer.name || !buyer.email) {
            toast.warn('Por favor, completá todos los campos', {
                position: "top-right",
                autoClose: 1500,
                theme: "colored",
            });
            return;
        }

        const order = {
            buyer,
            items: cart,
            date: new Date().toLocaleString(),
        };

        localStorage.setItem('lastOrder', JSON.stringify(order));

        toast.success('¡Compra finalizada con éxito!', {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
        });

        clearCart();
        setBuyer({ name: '', email: '' });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Finalizar Compra</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={buyer.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={buyer.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Finalizar Compra</button>
            </form>

            <Brief />
        </div>
    );
};

export default Checkout;
