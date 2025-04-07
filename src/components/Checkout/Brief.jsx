import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

const Brief = () => {
    const { cart, addToCart, removeFromCart, totalPrice } = useContext(CartContext);

    const handleAdd = (item) => {
        addToCart(item, 1);
        toast.success(`+1 unidad de ${item.title}`, {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
        });
    };

    const handleRemove = (id) => {
        removeFromCart(id);
        toast.error('Producto eliminado del carrito', {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
        });
    };

    if (cart.length === 0) return <p className="text-center mt-4">Tu carrito está vacío.</p>;

    return (
        <div className="mt-4 container">
            <h3 className="mb-3">Resumen del carrito</h3>
            <ul className="list-group mb-3">
                {cart.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="flex-grow-1">
                            <strong>{item.title}</strong><br />
                            <small>Cantidad: {item.quantity} | ${item.price.toFixed(2)} c/u</small>
                        </div>
                        <div className="d-flex align-items-center">
                            <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleAdd(item)}>+1</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(item.id)}>🗑️</button>
                        </div>
                        <span className="fw-bold ms-3">
                            ${(item.price * item.quantity).toFixed(2)}
                        </span>
                    </li>
                ))}
            </ul>
            <h4 className="text-end">Total: ${totalPrice.toFixed(2)}</h4>
        </div>
    );
};

export default Brief;




