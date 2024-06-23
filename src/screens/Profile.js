import React, { useState } from 'react';
import profile from '../images/profile.png'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
export default function Profile() {
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [showDeleteAccordion, setShowDeleteAccordion] = useState(false);
    const [form, setForm] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        newPassword: '',
        retypeNewPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    return (
        <div>
            <div><Navbar></Navbar></div>
            <div className="cart-container">
                <div className="cart-banner">
                    <img src={profile} alt="Cart Banner" className="cart-image" />
                </div>
            </div>
            <div className="profile-container">
                <div className="profile-details">
                    <h2 className="footer-title">Profile</h2>
                    <div className="profile-field">
                        <label>Name:</label>
                        <span className="text-left">{form.name}</span>
                    </div>
                    <div className="profile-field">
                        <label>Email:</label>
                        <span className="text-left">{form.email}</span>
                    </div>
                    <button onClick={() => setShowPasswordFields(!showPasswordFields)} className="button-one submit-btn-4">Change Password</button>
                    {showPasswordFields && (
                        <div className="password-fields">
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                value={form.newPassword}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="retypeNewPassword"
                                placeholder="Retype New Password"
                                value={form.retypeNewPassword}
                                onChange={handleChange}
                            />
                            <button type="submit" className="button-one submit-btn-4">Change</button>
                        </div>
                    )}
                </div>
                <div className="delete-account">
                    <h2 className="footer-title sad">
                        We are sad you are <span className="leaving-text">leaving!!!</span>
                    </h2>
                    <button onClick={() => setShowDeleteAccordion(!showDeleteAccordion)} className="button-one submit-btn-4">Delete Account</button>
                    {showDeleteAccordion && (
                        <div className="delete-accordion">
                            <p>Are you sure you want to delete your account?</p>
                            <button type="submit" className="button-one submit-btn-4">Delete</button>
                        </div>
                    )}
                </div>
            </div>
            <div><Footer></Footer></div>
        </div>
    );
}
