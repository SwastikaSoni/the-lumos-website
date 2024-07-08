import React, { useState } from 'react'
import Notification from '../components/Notification';
export default function Reset() {
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');

    const [userNotFound, setUserNotFound] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setUserNotFound(false); // Reset the user not found state

        // Define the fetch request
        fetch("http://localhost:5000/api/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ username }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 404) {
                    throw new Error('User not found');
                } else {
                    throw new Error('Failed to send reset link');
                }
            })
            .then((data) => {
                setNotification({ message: data.msg, type: 'success' });
                setTimeout(() => {
                    setNotification({ message: '', type: '' });
                    window.location.href = '/createuser'; // Redirect or navigate to the desired page
                }, 2000);
            })
            .catch((error) => {
                console.error('Error:', error.message);
                if (error.message === 'User not found') {
                    setUserNotFound(true);
                } else {
                    setNotification({ message: error.message || 'Failed to send reset link', type: 'error' });
                }
            });
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <div>
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: '', type: '' })}
            />
            <div className='billing-container col-md-12'>
                <div className='billing-details'>
                    <form action="" method="post" onSubmit={handleSubmit}>
                        <h4 className="footer-title checkout-heading title-border text-uppercase mb-30">Enter your username here:</h4>
                        <p>Please enter your username to receive a password reset link.</p>
                        {userNotFound && <p style={{ color: 'red' }}>User does not exist</p>}
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            value={username}
                            onChange={handleUsernameChange}
                        /><br />
                        <button type="submit" className="button-one">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
