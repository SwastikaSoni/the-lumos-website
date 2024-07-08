import React, { useState, useEffect } from 'react';
import cart from '../images/Shopping cart.png';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

import Navbar from '../components/Navbar';
import { useCart, useDispatchCart } from '../context/ContextReducer';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    const handleQuantityChange = (index, increment) => {
        let newQty = data[index].qty + increment;
        if (newQty >= 1) {
            dispatch({ type: "UPDATE_QUANTITY", index: index, qty: newQty });
        }
    };
    let totalprice = data.reduce((total, product) => total + (product.price * product.qty), 0);

    return (
        <div>
            <Navbar></Navbar>
            <div className="cart-container">
                <div className="cart-banner">
                    <img src={cart} alt="Cart Banner" className="cart-image" />
                </div>
            </div>
            {data.length === 0 ? (<div>

                <div className="main-container tab-pane active show empty" id="shopping-cart">
                    <div className="shop-cart-table empty-table">The cart is Empty!</div>
                </div>
            </div>) : (<><div className="main-container tab-pane active show" id="shopping-cart">
                <form action="#">
                    <div className="shop-cart-table">
                        <div className="table-content table-responsive">
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((product, index) => (
                                        <tr key={index}>
                                            <td className="product-thumbnail text-left">
                                                <div className="cart-product">
                                                    <div className="cart-product-img">
                                                        <img src={product.image} alt="" />
                                                    </div>
                                                    <div className="product-info">
                                                        <h4 className="post-title">{product.name}</h4>
                                                        <p className="text-light-p">Essence: {product.fragrance}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="product-price">₹{product.price.toFixed(2)}</td>
                                            <td className="product-quantity">
                                                <div className="cart-plus-minus">
                                                    <div className="dec qtybutton" onClick={() => handleQuantityChange(index, -1)}>-</div>
                                                    <input type="number" value={product.qty} readOnly name="qtybutton" className="cart-plus-minus-box" />
                                                    <div className="inc qtybutton" onClick={() => handleQuantityChange(index, 1)}>+</div>
                                                </div>
                                            </td>
                                            <td className="product-subtotal">₹{(product.price * product.qty).toFixed(2)}</td>
                                            <td className="product-remove">
                                                <i className="zmdi zmdi-close" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="cart-payment row justify-content-center">
                        <div className="col-md-6">
                            <div className="customer-login payment-details">
                                <h4 className="footer-title title-border text-uppercase">payment details</h4>
                                <table className="payment-table">
                                    <tbody>
                                        <tr>
                                            <td className="text-left">Cart Subtotal</td>
                                            <td className="text-end">₹{totalprice.toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link to="/checkout"><button className="button-one">Checkout</button></Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </>)}
            <Footer />
        </div>
    );
}