import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartWidget = () => {
    return (
        <div className="cart-widget">
            <FaShoppingCart size={24} color="white" />
            <span className="badge bg-danger ms-2">3</span>
        </div>
    );
};

export default CartWidget;
