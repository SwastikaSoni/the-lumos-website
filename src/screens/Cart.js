import React, { useState, useEffect } from 'react';
import cart from '../images/Shopping cart.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart, useDispatchCart } from '../context/ContextReducer';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    const navigate = useNavigate();

    const handleQuantityChange = (index, increment) => {
        let newQty = data[index].qty + increment;
        if (newQty >= 1) {
            dispatch({ type: "UPDATE_QUANTITY", index: index, qty: newQty });
        }
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
    const handleCheckOut = async (event) => {
        event.preventDefault();
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
                navigate('/cart');
            }, 2000);
        } catch (error) {
            console.error('Checkout error:', error);
        }
    }

    let totalprice = data.reduce((total, product) => total + (product.price * product.qty), 0);

    return (
        <div>
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: '', type: '' })}
            />
            <Navbar />
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
                                <button className="button-one" onClick={handleCheckOut}>Checkout</button>
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