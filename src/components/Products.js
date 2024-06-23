import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import candle1 from '../images/lumos.jpg';
import candle2 from '../images/lumos2.jpg';
import candle3 from '../images/lumos3.jpg';
const Products = () => {
    // Dummy data for products (can be replaced with actual data from API)
    const dummyProducts = [
        { id: 1, name: 'Dummy Product 1', price: 56.20, rating: 4.1, image: candle1 },
        { id: 2, name: 'Dummy Product 2', price: 36.20, rating: 5, image: candle2 },
        { id: 1, name: 'Dummy Product 1', price: 56.20, rating: 1, image: candle3 },
        { id: 2, name: 'Dummy Product 2', price: 36.20, rating: 0, image: candle2 },
        { id: 1, name: 'Dummy Product 1', price: 56.20, rating: 3.5, image: candle1 },
        { id: 2, name: 'Dummy Product 2', price: 36.20, rating: 3.5, image: candle2 },
        { id: 1, name: 'Dummy Product 1', price: 56.20, rating: 3.5, image: candle1 },
        { id: 2, name: 'Dummy Product 2', price: 36.20, rating: 3.5, image: candle2 },
        { id: 1, name: 'Dummy Product 1', price: 56.20, rating: 3.5, image: candle1 },
        { id: 2, name: 'Dummy Product 2', price: 36.20, rating: 3.5, image: candle2 },
        { id: 1, name: 'Dummy Product 1', price: 56.20, rating: 3.5, image: candle1 },
        { id: 2, name: 'Dummy Product 2', price: 36.20, rating: 3.5, image: candle2 },
        { id: 1, name: 'Dummy Product 1', price: 56.20, rating: 3.5, image: candle1 },
        { id: 2, name: 'Dummy Product 2', price: 36.20, rating: 3.5, image: candle2 },
        { id: 1, name: 'Dummy Product 1', price: 56.20, rating: 3.5, image: candle1 },
        { id: 2, name: 'Dummy Product 2', price: 36.20, rating: 3.5, image: candle2 },
        { id: 1, name: 'Dummy Product 1', price: 56.20, rating: 3.5, image: candle1 },
        { id: 2, name: 'Dummy Product 2', price: 36.20, rating: 3.5, image: candle2 },
        { id: 1, name: 'Dummy Product 1', price: 56.20, rating: 3.5, image: candle1 },
        { id: 2, name: 'Dummy Product 2', price: 36.20, rating: 3.5, image: candle2 },

        // Add more products here
    ];

    // State to manage current page
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8; // Number of products to display per page

    // Logic to calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = dummyProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="product-title">
                <div className="text-center">
                    <h2 className="footer-title team-title ">Product Tab</h2>
                </div>
            </div>
            <div className="products-grid">
                {currentProducts.map(product => (
                    <div key={product.id} className="single-product">
                        <div className="product-img">
                            <Link to="single-product.html"><img className="productimg" src={product.image} alt="" /></Link>
                            <div className="product-action">
                                <Link to="#" data-bs-toggle="tooltip" data-placement="top" title="Like">
                                    <i className="fas fa-heart"></i>
                                </Link>
                                <Link to="#" data-bs-toggle="modal" data-bs-target="#productModal" title="Quick View">
                                    <i className="fas fa-search"></i>
                                </Link>
                                <Link to="#" data-bs-toggle="tooltip" data-placement="top" title="Add To Cart">
                                    <i className="fas fa-shopping-cart"></i>
                                </Link>
                            </div>

                        </div>
                        <div className="product-info clearfix">
                            <div className="fix">
                                <h4 className="post-title floatleft">{product.name}</h4>
                            </div>
                            <div className="fix">
                                <span className="pro-price floatleft">$ {product.price}</span>
                                <span className="pro-rating floatright">
                                    {[...Array(5)].map((_, index) => {
                                        if (index < Math.floor(product.rating)) {
                                            return <i key={index} className="zmdi zmdi-star"></i>;
                                        } else if (index === Math.floor(product.rating) && product.rating % 1 !== 0) {
                                            return <i key={index} className="zmdi zmdi-star-half"></i>;
                                        } else {
                                            return <i key={index} className="zmdi zmdi-star-outline"></i>;
                                        }
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className="pagination-container col-lg-12 text-center">
                <ul className="pagination">
                    {[...Array(Math.ceil(dummyProducts.length / productsPerPage))].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="extra"></div>
        </>
    );
};

export default Products;
