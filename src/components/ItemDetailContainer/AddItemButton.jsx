import React from 'react';
import { toast } from 'react-toastify';

const AddItemButton = ({ product, quantity, addToCart }) => {
    const handleClick = () => {
        addToCart(product, quantity);
        toast.success(`🛒 "${product.title}" agregado al carrito`, {
            position: 'bottom-right',
            autoClose: 2500,
            pauseOnHover: true,
            theme: 'colored',
        });
    };

    return (
        <button className="btn btn-primary mt-2" onClick={handleClick}>
            Agregar al carrito
        </button>
    );
};

export default AddItemButton;



