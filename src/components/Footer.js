import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div>
            <div className="footer-area">
                <div className="container">
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
                                    <li><Link to="" className='link text-decoration-none'> My Profile</Link></li>
                                    <li><Link to="" className='link text-decoration-none'> My Cart</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12 custom-col">
                            <div className="single-footer">
                                <h3 className="footer-title title-border fs-5">shipping</h3>
                                <ul className="footer-menu list-unstyled">
                                    <li><Link to="" className='link text-decoration-none'> Products</Link></li>
                                    <li><Link to="" className='link text-decoration-none'> My Orders</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 custom-col">
                            <div className="single-footer">
                                <h3 className="footer-title title-border fs-5">Send Feedback</h3>
                                <div className="footer-subscribe">
                                    <form action="" className='footer-form'>
                                        <input type="text" name="feedback" placeholder="Feedback Here..." className="form-control" />
                                        <button className="button-one submit-btn-4" type="submit" data-text="Subscribe">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
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
