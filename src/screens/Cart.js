import React from 'react';
import { Link } from 'react-router-dom';
import cart from '../images/Shopping cart.png';
import candle1 from '../images/lumos.jpg';
import candle2 from '../images/lumos2.jpg';
import candle3 from '../images/lumos3.jpg';

export default function Cart() {
    return (
        <div>
            <div className="cart-container">
                <div className="cart-banner">
                    <img src={cart} alt="Cart Banner" className="cart-image" />
                </div>
            </div>
            <div className="main-container tab-pane active show" id="shopping-cart">
                <form action="#">
                    <div className="shop-cart-table">
                        <div className="table-content table-responsive">
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th className="">Product</th>
                                        <th className="">Price</th>
                                        <th className="">Quantity</th>
                                        <th className="">Total</th>
                                        <th className="">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="product-thumbnail text-left">
                                            <div className="cart-product">
                                                <div className="product-img">
                                                    <Link to="cart-product.html"><img src={candle1} alt="Product 1" /></Link>
                                                </div>
                                                <div className="product-info">
                                                    <h4 className="post-title"><Link className="text-light-black" to="#">dummy product name</Link></h4>
                                                    <p className="text-light-p">Essence: lavender</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="product-price">$56.00</td>
                                        <td className="product-quantity">
                                            <div className="cart-plus-minus">
                                                <div className="dec qtybutton">-</div>
                                                <input type="text" value="02" name="qtybutton" className="cart-plus-minus-box" />
                                                <div className="inc qtybutton">+</div>
                                            </div>
                                        </td>
                                        <td className="product-subtotal">$112.00</td>
                                        <td className="product-remove">
                                            <Link to="#"><i className="zmdi zmdi-close"></i></Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="product-thumbnail text-left">
                                            <div className="cart-product">
                                                <div className="product-img">
                                                    <Link to="cart-product.html"><img src={candle2} alt="Product 2" /></Link>
                                                </div>
                                                <div className="product-info">
                                                    <h4 className="post-title"><Link className="text-light-black" to="#">dummy product name</Link></h4>
                                                    <p className="text-light-p">Essence: Mint</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="product-price">$56.00</td>
                                        <td className="product-quantity">
                                            <div className="cart-plus-minus">
                                                <div className="dec qtybutton">-</div>
                                                <input type="text" name="qtybutton" className="cart-plus-minus-box" />
                                                <div className="inc qtybutton">+</div>
                                            </div>
                                        </td>
                                        <td className="product-subtotal">$112.00</td>
                                        <td className="product-remove">
                                            <Link to="#"><i className="zmdi zmdi-close"></i></Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="product-thumbnail">
                                            <div className="cart-product">
                                                <div className="product-img">
                                                    <Link to="cart-product.html"><img src={candle3} alt="Product 3" /></Link>
                                                </div>
                                                <div className="product-info">
                                                    <h4 className="post-title"><Link className="text-light-black" to="#">dummy product name</Link></h4>
                                                    <p className="text-light-p">Essence: Mint</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="product-price">$56.00</td>
                                        <td className="product-quantity">
                                            <div className="cart-plus-minus">
                                                <div className="dec qtybutton">-</div>
                                                <input type="text" value="02" name="qtybutton" className="cart-plus-minus-box" />
                                                <div className="inc qtybutton">+</div>
                                            </div>
                                        </td>
                                        <td className="product-subtotal">$112.00</td>
                                        <td className="product-remove">
                                            <Link to="#"><i className="zmdi zmdi-close"></i></Link>
                                        </td>
                                    </tr>
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
                                            <td className="text-end">$155.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className="button-one submit-btn-4" type="submit" data-text="Subscribe">Checkout</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
