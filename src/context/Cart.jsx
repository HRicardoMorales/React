import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';



const Cart = () => {
    const { cart, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Tu carrito está vacío</h2>
                <Link to="/" className="btn btn-primary mt-3">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2>Tu carrito</h2>
            <div className="row">
                {cart.map(item => (
                    <div key={item.id} className="col-md-6 mb-4">
                        <div className="card">
                            <div className="row g-0">
                                <div className="col-md-4 d-flex align-items-center justify-content-center">
                                    <img src={item.image} alt={item.title} className="img-fluid p-3" style={{ maxHeight: "150px", objectFit: "contain" }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">Precio unitario: ${item.price}</p>
                                        <p className="card-text">Cantidad: {item.quantity}</p>
                                        <p className="card-text fw-bold">Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>

                                        <div className="d-flex gap-2">
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn btn-sm btn-success">+</button>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn btn-sm btn-warning" disabled={item.quantity <= 1}>-</button>
                                            <button onClick={() => removeFromCart(item.id)} className="btn btn-sm btn-danger">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-end">
                <h4>Total ({totalItems} productos): <strong>${totalPrice.toFixed(2)}</strong></h4>
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button className="btn btn-danger" onClick={clearCart}>Vaciar carrito</button>
                    <Link to="/checkout" className="btn btn-success">Finalizar compra</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;


