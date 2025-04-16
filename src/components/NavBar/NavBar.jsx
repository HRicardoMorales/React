import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import 'bootstrap/dist/css/bootstrap.min.css';

const categories = [
    { name: 'sunglasses' },
    { name: 'motorcycle' },
    { name: 'smartphones' }
];

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Mi Tienda</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {categories.map(category => (
                            <li key={category.name} className="nav-item">
                                <Link className="nav-link" to={`/categoria/${encodeURIComponent(category.name)}`}>
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <CartWidget />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

