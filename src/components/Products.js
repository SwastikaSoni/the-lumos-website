import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatchCart, useCart } from '../context/ContextReducer';
const Products = () => {
    // Dummy data for products (can be replaced with actual data from API)
    const [products, setProdcuts] = useState([])

    const [imageLoading, setImageLoading] = useState({});
    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        response = await response.json();
        setProdcuts(response);
    }
    useEffect(() => {
        loadData();
    }, []);
    // State to manage current page
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8; // Number of products to display per page

    // Logic to calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleImageLoad = (id) => {
        setImageLoading(prevState => ({
            ...prevState,
            [id]: false,
        }));
    };

    const handleImageError = (id) => {
        setImageLoading(prevState => ({
            ...prevState,
            [id]: false,
        }));
    };

    const handleImageLoading = (id) => {
        setImageLoading(prevState => ({
            ...prevState,
            [id]: true,
        }));
    };



    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };
    const [form, setForm] = useState({
        fragrance: '',
        quantity: 1
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    let dispatch = useDispatchCart();
    const [fragrance, setFragrance] = useState("")
    const [qty, setQty] = useState(1)
    let data = useCart()
    const handleAddToCart = async () => {
        await dispatch({ type: "ADD", id: selectedProduct._id, name: selectedProduct.name, price: selectedProduct.price, qty: form.quantity, fragrance: form.fragrance })
        console.log(data);
    }

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
                            {imageLoading[product.id] ? (
                                <div className="image-placeholder"></div>
                            ) : (
                                <img
                                    className="productimg"
                                    src={product.product_image[0]}
                                    alt=""
                                    onLoad={() => handleImageLoad(product.id)}
                                    onError={() => handleImageError(product.id)}
                                    onLoadStart={() => handleImageLoading(product.id)}
                                />
                            )}
                            <div className="product-action">
                                <Link to="" data-bs-toggle="tooltip" data-placement="top" title="Like">
                                    <i className="fas fa-heart"></i>
                                </Link>
                                <Link to="" onClick={() => handleShowModal(product)} data-bs-toggle="tooltip" data-placement="top" title="Add To Cart">
                                    <i className="fas fa-shopping-cart"></i>
                                </Link>
                            </div>

                        </div>
                        <div className="product-info clearfix">
                            <div className="fix">
                                <h4 className="post-title floatleft">{product.name}</h4>
                            </div>
                            <div className="fix">
                                <span className="pro-price floatleft">₹ {product.price}</span>
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
                    {[...Array(Math.ceil(products.length / productsPerPage))].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="extra"></div>



            <div>
                {showModal && selectedProduct && (
                    <div className="modal fade show" id="productModal" tabIndex="-1" style={{ display: 'block' }} aria-modal="true" role="dialog">
                        <div className="modal-dialog custom-modal-dialog modal-lg" role="document">
                            <div className="modal-content custom-modal-content">
                                <div className="modal-header custom-modal-header">
                                    <button type="button" onClick={handleClose} className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body custom-modal-body">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div id="productCarousel" className="product-carousel carousel" data-ride="carousel">
                                                <div className="product-carousel-inner carousel-inner">
                                                    {selectedProduct.product_image.map((image, index) => (
                                                        <div key={index} className={`product-carousel-item carousel-item ${index === 0 ? 'active' : ''}`}>
                                                            <img src={image} className="modal-product d-block w-100" alt={`Product ${index + 1}`} />
                                                        </div>
                                                    ))}
                                                </div>
                                                <a className="product-carousel-control-prev carousel-control-prev" href="#productCarousel" role="button" data-slide="prev">
                                                    <span className="fa fa-chevron-left" aria-hidden="true"></span>
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                                <a className="product-carousel-control-next carousel-control-next" href="#productCarousel" role="button" data-slide="next">
                                                    <span className="fa fa-chevron-right" aria-hidden="true"></span>
                                                    <span className="sr-only">Next</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="product-info">
                                                <h1>{selectedProduct.name}</h1>
                                                <div className="price-box-3">
                                                    <hr />
                                                    <div className="s-price-box">
                                                        <span className="new-price">₹ {selectedProduct.price}</span>
                                                    </div>
                                                    <hr />
                                                </div>
                                                <div className="quick-add-to-cart">
                                                    <form method="post" className="modal-cart" onSubmit={handleSubmit}>
                                                        <select
                                                            id="fragrance"
                                                            className="modal-select custom-select form-control"
                                                            name="fragrance"
                                                            value={form.fragrance}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Fragrance</option>
                                                            <option value="jasmine">Jasmine</option>
                                                            <option value="sandalwood">Sandalwood</option>
                                                            <option value="relaxing">Relaxing</option>
                                                            <option value="lavender">Lavender</option>
                                                            <option value="peppermint">Peppermint</option>
                                                            <option value="rose">Rose</option>
                                                            <option value="eucalyptus">Eucalyptus</option>
                                                            <option value="lemon_grass">Lemon Grass</option>
                                                            <option value="citronella">Citronella</option>
                                                        </select>
                                                        <input
                                                            type="number"
                                                            id="quantity"
                                                            name="quantity"
                                                            value={form.quantity}
                                                            onChange={handleChange}
                                                            min="1"
                                                            className="modal-form-control custom-select"
                                                        />
                                                        {(localStorage.getItem("authToken")) ?
                                                            <button className="modal-button button-one submit-btn-4 col-md-10" type="submit" data-text="Add to Cart" onClick={handleAddToCart}>Add to Cart</button> : <button
                                                                className="submit-btn-4 col-md-10"
                                                                type="button"
                                                                data-text="Login to add"
                                                                disabled
                                                            >
                                                                Login to add
                                                            </button>}
                                                    </form>
                                                </div>
                                                <div className="quick-desc">
                                                    {selectedProduct.description}
                                                </div>
                                            </div>{/* .product-info */}
                                        </div>
                                    </div>
                                </div>{/* .modal-body */}
                            </div>{/* .modal-content */}
                        </div>{/* .modal-dialog */}
                    </div >
                )
                }
            </div >
        </>
    );
};

export default Products;
