import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {
    const { totalItems } = useContext(CartContext);

    return (
        <Link to="/checkout" className="btn btn-outline-light">
            🛒 Carrito ({totalItems})
        </Link>
    );
};

export default CartWidget;

