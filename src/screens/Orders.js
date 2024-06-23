import React from 'react';
// import { Link } from 'react-router-dom';
import orders from '../images/orders.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Orders() {
    return (
        <div>
            <div><Navbar></Navbar></div>
            <div className="cart-container">
                <div className="cart-banner">
                    <img src={orders} alt="Cart Banner" className="cart-image" />
                </div>
            </div>
            <div className="order-confirmation-container">
                <div className="thank-recieve bg-white mb-30">
                    <p>Thank you. Your order has been received.</p>
                </div>
                <div className="order-info bg-white text-center clearfix mb-30">
                    <div className="single-order-info">
                        <h4 className="title-1 text-uppercase text-light-black mb-0">Order No</h4>
                        <p className="text-uppercase text-light-black mb-0"><strong>m 2653257</strong></p>
                    </div>
                    <div className="single-order-info">
                        <h4 className="title-1 text-uppercase text-light-black mb-0">Date</h4>
                        <p className="text-uppercase text-light-black mb-0"><strong>June 15, 2021</strong></p>
                    </div>
                    <div className="single-order-info">
                        <h4 className="title-1 text-uppercase text-light-black mb-0">Total</h4>
                        <p className="text-uppercase text-light-black mb-0"><strong>$ 170.00</strong></p>
                    </div>
                    <div className="single-order-info">
                        <h4 className="title-1 text-uppercase text-light-black mb-0">Payment Method</h4>
                        <p className="text-uppercase text-light-black mb-0"><strong>UPI</strong></p>
                    </div>
                </div>
                <div className="thank-recieve bg-white mb-30">
                    <p>Continue Shopping?</p>
                    <button className="button-one submit-btn-4" type="submit" data-text="Subscribe">View Products</button>
                </div>
            </div>
            <div><Footer></Footer></div>
        </div>
    )
}
