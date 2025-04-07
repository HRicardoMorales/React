import React from 'react';

const ItemQuantitySelector = ({ quantity, setQuantity }) => {
    return (
        <div className="my-2 d-flex align-items-center gap-2">
            <button className="btn btn-secondary" onClick={() => setQuantity(q => Math.max(q - 1, 1))}>-</button>
            <span>{quantity}</span>
            <button className="btn btn-secondary" onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>
    );
};

export default ItemQuantitySelector;