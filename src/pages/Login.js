import React from "react";
import axios from 'axios';
import '../styles/login.css';
import { Link } from "react-router-dom";

const BASE_URL = 'http://13.235.87.215:4000';

function Login() {
    const loginFn = () => {
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        const data = {
            username: username.value,
            password: password.value
        };

        axios.post(BASE_URL + '/api/v1/user/login', data)
            .then(function (response) {
                if(response.data.success) {
                    localStorage.setItem("username", response.data.data.username)
                    localStorage.setItem("userId", response.data.data.userId);
                    window.location.href = "/home";
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div id="loginPage">
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div className="header-wrapper d-flex justify-content-between">
                            <div className="logo d-inline-block">
                                <Link className="text-decoration-none" to={"/"}>Ecommerce</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="home-title text-center">Welcome to Ecommerce</h2>
                        <div className="login-wrapper">
                            <h4 className="text-center">Login</h4>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Username" id="username" />
                            </div>
                            <div className="input-group">
                                <input type="password" className="form-control" placeholder="Password" id="password" />
                            </div>
                            <div className="input-group">
                                <input type="submit" className="form-control btn btn-primary" value="Log in as User" onClick={loginFn} />
                            </div>
                            <div className="signup-btn text-center text-info">Dont have an Account ? Signup</div>
                            <div className="auth-error-msg text-danger text-center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;