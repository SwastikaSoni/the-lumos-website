import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import checkout from '../images/checkout.png';
import upi from '../images/UPI.png'
import paypal from '../images/paypal.png'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function Checkout() {
    const [activeAccordion, setActiveAccordion] = useState('');

    const handleAccordionToggle = (method) => {
        setActiveAccordion((prev) => (prev === method ? '' : method));
    };
    const [form, setForm] = useState({
        name: '',
        lname: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        address: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };
    return (
        <div>
            <div><Navbar></Navbar></div>
            <div className="cart-container">
                <div className="cart-banner">
                    <img src={checkout} alt="Cart Banner" className="cart-image" />
                </div>
            </div>

            <div className="billing-container col-md-12">
                <div className="billing-details">
                    <h4 className="footer-title checkout-heading title-border text-uppercase mb-30">Billing Details</h4>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your first name here..."
                    />
                    <input
                        type="text"
                        name="lname"
                        value={form.lname}
                        onChange={handleChange}
                        placeholder="Your last name here..."
                    />
                    <input
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email address here..."
                    />
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone no. here..."
                    />
                    <input
                        type="text"
                        name="country"
                        value="India"
                        readOnly
                    />
                    <select
                        className="custom-select mb-15"
                        name="State"
                        value={form.state}
                        onChange={handleChange}
                    >
                        <option value="" >State / Union Territory</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadra and Nagar Haveli and Daman & Diu">Dadra and Nagar Haveli and Daman & Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshaweep">Lakshaweep</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                    </select>
                    <textarea
                        className="custom-textarea"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Your address here..."
                    ></textarea>
                </div>
                <div className="shop-cart-table check-out-wrap">
                    <div className="order-details">
                        <div className="our-order checkout-details pr-20">
                            <h4 className="footer-title checkout-heading title-border text-uppercase mb-30">Your Order</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th className="checkout-header checkout-text text-left"><strong>Product</strong></th>
                                        <th className="checkout-header checkout-text text-left"><strong>Total</strong></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="checkout-text text-left">Dummy Product Name x 2</td>
                                        <td className="checkout-text text-left">$86.00</td>
                                    </tr>
                                    <tr>
                                        <td className="checkout-text text-left">Dummy Product Name x 1</td>
                                        <td className="checkout-text text-left">$69.00</td>
                                    </tr>
                                    <tr>
                                        <td className="checkout-text text-left">Cart Subtotal</td>
                                        <td className="checkout-text text-left">$155.00</td>
                                    </tr>
                                    <tr>
                                        <td className="checkout-text text-left">Shipping and Handling</td>
                                        <td className="checkout-text text-left">$15.00</td>
                                    </tr>
                                    <tr>
                                        <td className="checkout-text text-left">GST</td>
                                        <td className="checkout-text text-left">$00.00</td>
                                    </tr>
                                    <tr>
                                        <td className="checkout-text text-total">Order Total</td>
                                        <td className="checkout-text text-total">$170.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="payment-details-container">
                        <div className="payment-method mt-60 pl-20">
                            <h4 className="footer-title checkout-heading title-border text-uppercase mb-30">Payment Method</h4>
                            <div className="payment-accordion">

                                {/* UPI Payment */}
                                <h3
                                    className={`checkout-header checkout-text text-left payment-accordion-toggle ${activeAccordion === 'UPI Payment' ? 'active' : ''}`}
                                    onClick={() => handleAccordionToggle('UPI Payment')}
                                >
                                    UPI Payment
                                    <i className={`fa ${activeAccordion === 'UPI Payment' ? 'fa-chevron-up' : 'fa-chevron-down'} toggle-icon text-end`}></i>
                                </h3>
                                <div className={`payment-content ${activeAccordion === 'UPI Payment' ? 'show' : ''}`}>
                                    <p>Please use your UPI ID to make payment</p>
                                    <Link to="#"><img className="checkout-img" src={upi} alt="upi" /></Link>
                                </div>

                                {/* PayPal */}
                                <h3
                                    className={`checkout-header checkout-text text-left payment-accordion-toggle ${activeAccordion === 'PayPal' ? 'active' : ''}`}
                                    onClick={() => handleAccordionToggle('PayPal')}
                                >
                                    PayPal
                                    <i className={`fa ${activeAccordion === 'PayPal' ? 'fa-chevron-up' : 'fa-chevron-down'} toggle-icon text-end`}></i>
                                </h3>
                                <div className={`payment-content ${activeAccordion === 'PayPal' ? 'show' : ''}`}>
                                    <p>You can pay with your credit/debit card via Paypal.</p>
                                    <Link to="#"><img className="checkout-img" src={paypal} alt="PayPal" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div><Footer></Footer></div>
        </div>
    );
}
