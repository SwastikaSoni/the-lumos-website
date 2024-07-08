import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import checkout from '../images/checkout.png';
import upi from '../images/UPI.png'
import paypal from '../images/paypal.png'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart, useDispatchCart } from '../context/ContextReducer';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

export default function Checkout() {
    let data = useCart();
    let dispatch = useDispatchCart();
    const navigate = useNavigate();
    const [activeAccordion, setActiveAccordion] = useState('');

    const handleAccordionToggle = (method) => {
        setActiveAccordion((prev) => (prev === method ? '' : method));
    };
    const [form, setForm] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        country: 'India',
        state: '',
        address: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const [userData, setUserData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const username = localStorage.getItem('username');
            const response = await fetch("https://the-lumos-website.onrender.com/api/displayProfile", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                console.log('Backend error:', data.error);
                setUserData([]);
            } else {
                setUserData(data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    useEffect(() => {
        fetchMyOrder();
    }, []);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        for (let field in form) {
            if (!form[field]) {
                formErrors[field] = 'You need to fill this field';
                isValid = false;
            }
        }

        setErrors(formErrors);
        return isValid;
    };
    const handleCheckOut = async (event) => {
        event.preventDefault();

        console.log("I am clicked before validateForm");
        if (!validateForm()) {
            console.log("Form validation failed");
            return;
        }

        console.log("I am clicked after validateForm");
        try {
            let username = localStorage.getItem("username");
            let response = await fetch("https://the-lumos-website.onrender.com/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_data: data,
                    username: username,
                    order_date: new Date().toDateString()
                })
            });
            await fetch("http://localhost:5000/api/saveBill", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fname: form.fname,
                    lname: form.lname,
                    email: form.email,
                    phone: form.phone,
                    address: form.address,
                    total: finalprice,
                    username: username
                })
            });
            await fetch("https://the-lumos-website.onrender.com/api/feedback", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail: userData.email,
                    orderData: data
                })
            });
            dispatch({ type: "DROP" })
            const json = await response.json()
            if (!json.success) {
                throw new Error(`Checkout failed: ${json.message || 'Unknown error'}`);
            }
            setNotification({ message: 'Order placed!', type: 'success' });
            setTimeout(() => {
                setNotification({ message: '', type: '' });
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Checkout error:', error);
        }
    }
    const [shippingCost, setShippingCost] = useState(0);
    const fetchShippingCost = async (state) => {
        try {
            const response = await fetch("http://localhost:5000/api/calculate-shipping", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ state })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setShippingCost(data.shipping);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    useEffect(() => {
        if (form.state) {
            fetchShippingCost(form.state);
        }
    }, [form.state]);
    let totalprice = data.reduce((total, product) => total + (product.price * product.qty), 0);
    let finalprice = totalprice + shippingCost;
    return (
        <div>
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: '', type: '' })}
            />
            <div><Navbar></Navbar></div>
            <div className="cart-container">
                <div className="cart-banner">
                    <img src={checkout} alt="Cart Banner" className="cart-image" />
                </div>
            </div>
            {data.length === 0 ? (<div>

                <div className="main-container tab-pane active show empty" id="shopping-cart">
                    <div className="shop-cart-table empty-table">No Orders yet</div>
                </div>
            </div>) : (<>
                <div className="billing-container col-md-12">
                    <div className="billing-details">
                        <form method="post" className="modal-cart" >
                            <h4 className="footer-title checkout-heading title-border text-uppercase mb-30">Billing Details</h4>
                            {errors.name && <div className="error-message">{errors.name}</div>}
                            <input
                                type="text"
                                name="fname"
                                value={form.fname}
                                onChange={handleChange}
                                placeholder="Your first name here..."
                                required
                            />
                            {errors.lname && <div className="error-message">{errors.lname}</div>}
                            <input
                                type="text"
                                name="lname"
                                value={form.lname}
                                onChange={handleChange}
                                placeholder="Your last name here..."
                                required
                            />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                            <input
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email address here..."
                                required
                            />
                            {errors.phone && <div className="error-message">{errors.phone}</div>}
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone no. here..."
                                required
                            />
                            <input
                                type="text"
                                name="country"
                                value="India"
                                readOnly
                            />
                            {errors.state && <div className="error-message">{errors.state}</div>}
                            <select
                                className="modal-select custom-select"
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                required
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
                            {errors.address && <div className="error-message">{errors.address}</div>}
                            <textarea
                                className="custom-textarea"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Your full address here..."
                                required
                            ></textarea>
                        </form>
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
                                        {data.map((product, index) => (
                                            <tr>
                                                <td className="checkout-text text-left">{product.name} x {product.qty}</td>
                                                <td className="checkout-text text-left">₹{product.price.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="checkout-text text-left">Cart Subtotal</td>
                                            <td className="checkout-text text-left">₹{totalprice.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="checkout-text text-left">Shipping and Handling</td>
                                            <td className="checkout-text text-left">₹{shippingCost.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="checkout-text text-total">Order Total</td>
                                            <td className="checkout-text text-total">${finalprice.toFixed(2)}</td>
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
                                        <img className="checkout-img" src={upi} alt="upi" onClick={handleCheckOut} />
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
                                        <div onClick={handleCheckOut}><img className="checkout-img" src={paypal} alt="PayPal" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></>)}
            <div><Footer></Footer></div>
        </div>
    );
}