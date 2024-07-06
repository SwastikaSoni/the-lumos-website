import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import logo from '../images/logo2.png';
import { useCart } from '../context/ContextReducer';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("username")
    localStorage.removeItem("cart")
    window.location.href = '/';

  }

  let data = useCart();

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {(localStorage.getItem("authToken")) ?
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                    <Badge pill className="custom-badge">{data.length}</Badge>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">
                    My Orders
                  </Link>
                </li><li className="nav-item">
                  <Link onClick={handleLogout} className="nav-link">
                    Logout
                  </Link>
                </li> </> : <><li className="nav-item">
                  <Link className="nav-link" to="/createuser">
                    Login
                  </Link>
                </li>
              </>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
