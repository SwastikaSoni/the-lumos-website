import React from 'react';
import img1 from '../images/lumos.jpg';
import img2 from '../images/lumos2.jpg';
import img3 from '../images/lumos3.jpg';
import { useState } from 'react';

export default function Pop() {
    const [showModal, setShowModal] = useState(true); // State to manage modal visibility

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
        console.log('Form submitted:', form);
    };

    return (
        <div>
            {showModal && (
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
                                                <div className="product-carousel-item carousel-item active">
                                                    <img src={img1} className="modal-product d-block w-100" alt="Product 1" />
                                                </div>
                                                <div className="product-carousel-item carousel-item">
                                                    <img src={img2} className="modal-product d-block w-100" alt="Product 2" />
                                                </div>
                                                <div className="product-carousel-item carousel-item">
                                                    <img src={img3} className="modal-product d-block w-100" alt="Product 3" />
                                                </div>
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
                                            <h1>Aenean eu tristique</h1>
                                            <div className="price-box-3">
                                                <hr />
                                                <div className="s-price-box">
                                                    <span className="new-price">$160.00</span>
                                                </div>
                                                <hr />
                                            </div>
                                            <div className="quick-add-to-cart">
                                                <form method="post" className="modal-cart" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <select
                                                        id="fragrance"
                                                        className="modal-select custom-select"
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

                                                    <button className="modal-button button-one submit-btn-4 col-md-10" type="submit" data-text="Add to Cart">Add to Cart</button>
                                                </form>
                                            </div>


                                            <div className="quick-desc">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero.
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
    );
}
