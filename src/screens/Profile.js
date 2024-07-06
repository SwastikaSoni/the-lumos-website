import React, { useState, useEffect } from 'react';
import profile from '../images/profile.png'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import Notification from '../components/Notification';
export default function Profile() {
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [showDeleteAccordion, setShowDeleteAccordion] = useState(false);
    const [form, setForm] = useState({
        newPassword: '',
        retypeNewPassword: '',
    });
    const [passwordError, setPasswordError] = useState('')
    const [notification, setNotification] = useState({ message: '', type: '' });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
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

    const handleSubmitPasswordChange = async (e) => {
        e.preventDefault();
        if (form.newPassword !== form.retypeNewPassword) {
            setPasswordError('Passwords do not match.');
            setForm({
                newPassword: '',
                retypeNewPassword: '',
            });
            return;
        }
        if (form.newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            setForm({
                newPassword: '',
                retypeNewPassword: '',
            });
            return;
        }
        try {
            const response = await fetch("https://the-lumos-website.onrender.com/api/changePassword", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: localStorage.getItem('username'),
                    newPassword: form.newPassword,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                setPasswordError(data.error);
                setForm({
                    newPassword: '',
                    retypeNewPassword: '',
                });
            } else {
                setForm({
                    newPassword: '',
                    retypeNewPassword: '',
                });
                setShowPasswordFields(false);
                setPasswordError('');
                setNotification({ message: 'Password changed successfully!', type: 'success' });
            }
            setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 2000);
        } catch (error) {
            console.error('Password change error:', error);
            setPasswordError('Failed to change password. Please try again.');
        }
    };

    const [deleteError, setDeleteError] = useState('')
    const handleDeleteAccount = async () => {
        try {
            const response = await fetch("https://the-lumos-website.onrender.com/api/deleteAccount", {
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
                setDeleteError('Failed to delete account. Please try again.');
            } else {
                setNotification({ message: 'Account deleted successfully!', type: 'success' });
                localStorage.removeItem('username');
            } setTimeout(() => {
                localStorage.removeItem("authToken")
                localStorage.removeItem("username")
                localStorage.removeItem("cart")
                setNotification({ message: '', type: '' });
                window.location.href = '/';
            }, 1000);
        } catch (error) {
            setDeleteError('Failed to delete account. Please try again.');
        }
    };


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
                    <img src={profile} alt="Cart Banner" className="cart-image" />
                </div>
            </div>
            <div className="profile-container">
                <div className="profile-details">
                    <h2 className="footer-title">Profile</h2>
                    <div className="profile-field">
                        <label>Name:</label>
                        <span className="text-left">{userData.username}</span>
                    </div>
                    <div className="profile-field">
                        <label>Email:</label>
                        <span className="text-left">{userData.email}</span>
                    </div>
                    <button onClick={() => { setShowPasswordFields(!showPasswordFields); setPasswordError(''); }} className="button-one submit-btn-4">Change Password</button>

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
                            {passwordError && <p className="error-message">{passwordError}</p>}
                            <button onClick={handleSubmitPasswordChange} className="button-one submit-btn-4">Change</button>
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
                            <button onClick={handleDeleteAccount} className="button-one submit-btn-4">Delete</button>
                            {deleteError && <p className="error-message">{deleteError}</p>}
                        </div>
                    )}
                </div>
            </div>
            <div><Footer></Footer></div>
        </div>
    );
}
