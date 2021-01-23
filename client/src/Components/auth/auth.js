import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { login } from "../../actions/auth";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/twitter.png";
import linkedin from "../../assets/instagram.png";
import twitter from "../../assets/linkedin.png";

import "./test.css";
function Landing1({ login, isAuthenticated, setAlert, register }) {
    var x = document.querySelector(".img-btn");
    if (x) {
        x.addEventListener("click", function () {
            document.querySelector(".cont").classList.toggle("s-signup");
        });
    }
    const [FormData, SetFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    const { name, email, password, password2 } = FormData;
    const onChange = (e) => SetFormData({ ...FormData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
    };
    const onSubmit2 = async (e) => {
        e.preventDefault();

        if (password!==password2){
            setAlert('passwords do not match','danger')}
       else {
          register({name,email,password})
         
    }}
    // redirect if logged in 
    if (isAuthenticated){
      return <Redirect to="/dashboard" />}
    return (
        <div className="body">
            <title>How to Design Login &amp; Registration Form Transition</title>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" type="text/css" href="style.css" />
            <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700,800&display=swap" rel="stylesheet" />
            <div className="cont">
                <form className="form sign-in" onSubmit={(e) => onSubmit(e)}>
                    <h2>Sign In</h2>
                    <label>
                        <span>Email Address</span>
                        <input name="email" value={email} required onChange={(e) => onChange(e)} type="email" />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" name="password" id="password" value={password} required onChange={(e) => onChange(e)} />
                    </label>
                    <button className="submit" type="submit">
                        Sign In
                    </button>

                    <div className="social-media">
                        <ul>
                            <li>
                                {" "}
                                <img src={facebook} alt="..." />
                            </li>
                            <li>
                                {" "}
                                <img src={twitter} alt=".." />{" "}
                            </li>
                            <li>
                                {" "}
                                <img src={linkedin} alt=".." />{" "}
                            </li>
                            <li>
                                {" "}
                                <img src={instagram} alt=".." />{" "}
                            </li>
                        </ul>
                    </div>
                </form>
                <div className="sub-cont">
                    <div className="img">
                        <div className="img-text m-up">
                            <h2>New here?</h2>
                            <p>Sign up and discover great amount of new opportunities!</p>
                        </div>
                        <div className="img-text m-in">
                            <h2>One of us?</h2>
                            <p>If you already has an account, just sign in. We've missed you!</p>
                        </div>
                        <div className="img-btn">
                            <span className="m-up">Sign Up</span>
                            <span className="m-in">Sign In</span>
                        </div>
                    </div>
                    <form onSubmit={(e) => onSubmit2(e)} className="form sign-up">
                        <h2>Sign Up</h2>
                        <label>
                            <span>Name</span>
                            <input type="text" className="in" required onChange={(e) => onChange(e)} label="name" value={name} name="name" />
                        </label>
                        <label>
                            <span>Email</span>
                            <input type="text" required value={email} className="in" name="email" onChange={(e) => onChange(e)} />
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="text" required value={password} name="password" onChange={(e) => onChange(e)} />
                        </label>
                        <label>
                            <span>Confirm Password</span>
                            <input type="text" required value={password2} name="password2" onChange={(e) => onChange(e)} />
                        </label>
                        <button type="submit" className="submit">
                            Sign Up Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login, setAlert, register })(Landing1);
