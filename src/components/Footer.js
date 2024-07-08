import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Notification from '../components/Notification';
export default function Footer() {
    const [feedback, setFeedback] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' })
    const handleFeedback = async (e) => {
        e.preventDefault();
        await fetch("https://the-lumos-website.onrender.com/api/sendfeedback", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                feedback: feedback
            })
        });
        setFeedback('');
        setNotification({ message: 'Thanks for the feedback!', type: 'success' });
        setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 1000);
    }

    return (
        <div>
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: '', type: '' })}
            />
            <div className="footer-area">
                <div className="container">
                    {(localStorage.getItem("authToken")) ?
                        <>
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-12 custom-col">
                                    <div className="single-footer">
                                        <h3 className="footer-title">Contact Us</h3>
                                        <ul className="footer-contact">
                                            <li><span className="fw-bold">Cell-Phone :</span> +91 8797489490</li>
                                            <li><span className="fw-bold">Email :</span> saumilyasumeet@gmail.com</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-12 custom-col">
                                    <div className="single-footer">
                                        <h3 className="footer-title title-border fs-5 ">accounts</h3>
                                        <ul className="footer-menu list-unstyled">
                                            <li><Link to="/profile" className='link text-decoration-none'> My Profile</Link></li>
                                            <li><Link to="/cart" className='link text-decoration-none'> My Cart</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-12 custom-col">
                                    <div className="single-footer">
                                        <h3 className="footer-title title-border fs-5">shipping</h3>
                                        <ul className="footer-menu list-unstyled">
                                            <li><Link to={{ pathname: '/', state: { scrollToSection: 'products' } }} className='link text-decoration-none'> Products</Link></li>
                                            <li><Link to="/orders" className='link text-decoration-none'> My Orders</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12 custom-col">
                                    <div className="single-footer">
                                        <h3 className="footer-title title-border fs-5">Send Feedback</h3>
                                        <div className="footer-subscribe">
                                            <form action="" className='footer-form' onSubmit={handleFeedback}>
                                                <input type="text" name="feedback" placeholder="Feedback Here..." className="form-control" value={feedback}
                                                    onChange={(e) => setFeedback(e.target.value)} />
                                                <button className="button-one submit-btn-4" type="submit" data-text="Subscribe">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div></div></> : <>
                            <div className="row">
                                <div className="col-lg-5 col-md-6 col-sm-12 custom-col">
                                    <div className="single-footer">
                                        <h3 className="footer-title">Contact Us</h3>
                                        <ul className="footer-contact">
                                            <li><span className="fw-bold">Cell-Phone :</span> +91 8797489490</li>
                                            <li><span className="fw-bold">Email :</span> saumilyasumeet@gmail.com</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 custom-col">
                                    <div className="single-footer">
                                        <h3 className="footer-title title-border fs-5 ">accounts</h3>
                                        <ul className="footer-menu list-unstyled">
                                            <li><Link to="/createuser" className='link text-decoration-none'> Login</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12 custom-col">
                                    <div className="single-footer">
                                        <h3 className="footer-title title-border fs-5">Send Feedback</h3>
                                        <div className="footer-subscribe">
                                            <form action="" className='footer-form'>
                                                <input type="text" name="feedback" placeholder="Feedback Here..." className="form-control" required />
                                                <button className="button-one submit-btn-4" type="submit">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>}
                </div>
            </div>
            <div className="copyright-area copyright-2 py-3 custom-col">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyright">
                                <p className="m-0 text-center">&copy; The Lumos 2024. All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
