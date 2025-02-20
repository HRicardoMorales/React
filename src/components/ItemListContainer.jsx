import React from 'react';

const ItemListContainer = ({ greeting }) => {
    return (
        <div className="container mt-4">
            <h2>{greeting}</h2>
        </div>
    );
};

export default ItemListContainer;
