
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from '../images/candle.svg';
import login2 from '../images/login.svg';
import logo from '../images/logo2.png';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
const Log = () => {

  let navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);

  const [notification, setNotification] = useState({ message: '', type: '' })
  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".home");

    const handleSignUp = () => {
      container.classList.add("sign-up-mode");
    };

    const handleSignIn = () => {
      container.classList.remove("sign-up-mode");
    };

    sign_up_btn.addEventListener("click", handleSignUp);
    sign_in_btn.addEventListener("click", handleSignIn);

    // Clean up event listeners on component unmount
    return () => {
      sign_up_btn.removeEventListener("click", handleSignUp);
      sign_in_btn.removeEventListener("click", handleSignIn);
    };
  }, []);

  const [credentials, setcredentials] = useState({ username: "", email: "", password: "" })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://the-lumos-website.onrender.com/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        { username: credentials.username, email: credentials.email, password: credentials.password }
      )
    });
    const json = await response.json()
    if (!json.success) {
      if (json.errors) {
        let errorMsg = "";
        json.errors.forEach(error => {
          errorMsg += `${error.msg}. `;
        });
        setSignupError(errorMsg);
      } else {
        setSignupError("Something went wrong");
      }
    }
    if (json.success) {
      setSignupError(null);
      setNotification({ message: 'User created successfully!', type: 'success' });
    }
    setTimeout(() => {
      setNotification({ message: '', type: '' });
      window.location.href = '/createuser';
    }, 1000);
  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  // login
  const [logincreds, setlogincreds] = useState({ username: "", password: "" })
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("https://the-lumos-website.onrender.com/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        { username: logincreds.username, password: logincreds.password }
      )
    });
    const json = await response.json()
    if (!json.success) {
      if (json.errors && Array.isArray(json.errors)) {
        let errorMsg = "";
        json.errors.forEach(error => {
          errorMsg += `${error.msg}. `;
        });
        setLoginError(errorMsg);
      } else if (typeof json.errors === 'string') {
        setLoginError(json.errors);
      } else {
        setLoginError("Something went wrong");
      }
    }
    if (json.success) {
      setLoginError(null);
      localStorage.setItem("username", logincreds.username)
      localStorage.setItem("authToken", json.authToken)
      navigate("/");
    }
  }

  const onLogin = (event) => {
    setlogincreds({ ...logincreds, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className="home">
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleLogin} action="" className="sign-in-form">
              <img className="form-image" src={logo} alt=""></img>
              <h2 className="title">Sign in</h2>
              {loginError && <p className="error-message">{loginError}</p>}
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder='Username' name='username' value={logincreds.username} onChange={onLogin}></input>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder='Password' name='password' value={logincreds.password} onChange={onLogin}></input>
              </div>
              <input type="submit" value="Login" className="btn solid"></input>
              {/* <p className="social-text">Or Sign In with Google</p>
              <div className="social-media">
                <Link to="#" className="social-icon"><i className="fab fa-google"></i></Link>
              </div> */}
            </form>

            <form onSubmit={handleSubmit} action="" className="sign-up-form">
              <img className="form-image" src={logo} alt=""></img>
              <h2 className="title">Sign up</h2>
              {signupError && <p className="error-message">{signupError}</p>}
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder='Username' name='username' value={credentials.username} onChange={onChange}></input>
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="text" placeholder='Email' name='email' value={credentials.email} onChange={onChange}></input>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder='Password' name='password' value={credentials.password} onChange={onChange}></input>
              </div>
              <input type="submit" value="Sign up" className="btn solid"></input>
              {/* <p className="social-text">Or Sign up with Google</p>
              <div className="social-media">
                <Link to="#" className="social-icon"><i className="fab fa-google"></i></Link>
              </div> */}
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="panel-content">
              <h3 className="panel-h3">New Here?</h3>
              <p className="panel-p">Light Up Your Life with Our Exquisite Candles – Join Us Today for a Brighter Tomorrow!</p>
              <button className="btn solid" id="sign-up-btn">Sign up</button>
            </div>
            <img src={login} className="panel-image" alt=""></img>
          </div>

          <div className="panel right-panel">
            <div className="panel-content">
              <h3 className="panel-h3">One of us?</h3>
              <p className="panel-p">Welcome Back! Let's Ignite Your Ambiance – Log In to Explore New Scents and Delights!</p>
              <button className="btn solid" id="sign-in-btn">Sign in</button>
            </div>
            <img src={login2} className="panel-image" alt=""></img>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Log;
