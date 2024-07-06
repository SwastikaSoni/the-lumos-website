import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import orders from '../images/orders.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';
export default function Orders() {
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate();
    const fetchMyOrder = async () => {
        try {
            const username = localStorage.getItem('username');
            const response = await fetch("https://the-lumos-website.onrender.com/api/myOrderData", {
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
                setOrderData([]);
            } else {
                setOrderData(data.orderData);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    const [notification, setNotification] = useState({ message: '', type: '' });
    const handleDelete = async () => {
        try {
            const response = await fetch("https://the-lumos-website.onrender.com/api/clearHistory", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: localStorage.getItem('username'),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            if (data.error) {
                setNotification({ message: 'Failed to delete. Please try again.', type: 'failure' });
            } else {
                setNotification({ message: 'History cleared!', type: 'success' });
            } setTimeout(() => {
                setNotification({ message: '', type: '' });
                window.location.href = '/orders';
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Failed to delete. Please try again.', type: 'failure' });
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);


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
                    <img src={orders} alt="Cart Banner" className="cart-image" />
                </div>
            </div>
            <div className="order-confirmation-container">
                {orderData.length === 0 ? (
                    <div className="thank-recieve bg-white mb-30">
                        <p>No orders yet :(</p>
                    </div>
                ) : (
                    <>
                        <div className="thank-recieve bg-white mb-30">
                            <p>Thank you. Your order has been received.</p>
                            <button onClick={handleDelete} className="button-one submit-btn-4" data-text="Subscribe">Clear History</button>
                        </div>
                        {orderData.map((ordersArray, index) => (
                            ordersArray.slice(1).map((order, innerIndex) => (<>
                                <div className="order-info bg-white text-center clearfix mb-30" key={`${index}-${innerIndex}`}>
                                    <div className="single-order-info order-product-img">
                                        <img src={order.image} alt="" />
                                    </div>
                                    <div className="single-order-info center-aligned">
                                        <h4 className="title-1 text-uppercase text-light-black mb-0">Name</h4>
                                        <p className="text-uppercase text-light-black mb-0"><strong>{order.name}</strong></p>
                                    </div>
                                    <div className="single-order-info center-aligned">
                                        <h4 className="title-1 text-uppercase text-light-black mb-0">Fragrance</h4>
                                        <p className="text-uppercase text-light-black mb-0"><strong>{order.fragrance}</strong></p>
                                    </div>
                                    <div className="single-order-info center-aligned">
                                        <h4 className="title-1 text-uppercase text-light-black mb-0">Date</h4>
                                        <p className="text-uppercase text-light-black mb-0"><strong>{ordersArray[0].Order_date}</strong></p>
                                    </div>
                                    <div className="single-order-info center-aligned">
                                        <h4 className="title-1 text-uppercase text-light-black mb-0">Price</h4>
                                        <p className="text-uppercase text-light-black mb-0"><strong>₹ {order.price}</strong></p>
                                    </div>
                                    <div className="single-order-info center-aligned">
                                        <h4 className="title-1 text-uppercase text-light-black mb-0">Quanity</h4>
                                        <p className="text-uppercase text-light-black mb-0"><strong>{order.qty}</strong></p>
                                    </div>
                                </div></>))

                        ))}
                    </>
                )}
                <div className="thank-recieve bg-white mb-30">
                    <p>Continue Shopping?</p>
                    <Link to={{ pathname: '/', state: { scrollToSection: 'products' } }}><button className="button-one submit-btn-4" type="submit" data-text="Subscribe">View Products</button>
                    </Link></div>
            </div>
            <div><Footer></Footer></div>
        </div>
    )
}