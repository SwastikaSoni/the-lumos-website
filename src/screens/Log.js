import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import login from '../images/candle.svg';
import login2 from '../images/login.svg';
import logo from '../images/logo2.png';
const Log = () => {
  const [isSignUp, setIsSignUp] = useState(false);

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
  return (
    <div class="home">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="" class="sign-in-form">
            <img class="form-image" src={logo} alt=""></img>
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder='Username'></input>
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder='Password'></input>
            </div>
            <input type="submit" value="Login" class="btn solid"></input>
            <p class="social-text">Or Sign In with Google</p>
            <div class="social-media">
              <Link to="#" class="social-icon"><i className="fab fa-google"></i></Link>
            </div>
          </form>

          <form action="" class="sign-up-form">
            <img class="form-image" src={logo} alt=""></img>
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder='Username'></input>
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="text" placeholder='Email'></input>
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder='Password'></input>
            </div>
            <input type="submit" value="Sign up" class="btn solid"></input>
            <p class="social-text">Or Sign up with Google</p>
            <div class="social-media">
              <Link to="#" class="social-icon"><i className="fab fa-google"></i></Link>
            </div>
          </form>
        </div>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="panel-content">
            <h3 class="panel-h3">New Here?</h3>
            <p class="panel-p">Light Up Your Life with Our Exquisite Candles – Join Us Today for a Brighter Tomorrow!</p>
            <button class="btn solid" id="sign-up-btn">Sign up</button>
          </div>
          <img src={login} class="panel-image" alt=""></img>
        </div>

        <div class="panel right-panel">
          <div class="panel-content">
            <h3 class="panel-h3">One of us?</h3>
            <p class="panel-p">Welcome Back! Let's Ignite Your Ambiance – Log In to Explore New Scents and Delights!</p>
            <button class="btn solid" id="sign-in-btn">Sign in</button>
          </div>
          <img src={login2} class="panel-image" alt=""></img>
        </div>
      </div>
    </div>
  );
};

export default Log;