import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/productDetails.css';

const BASE_URL = 'http://13.235.87.215:4000';

function ProductDetails() {
    const [productDetails, setProductDetails] = useState({});
    const [username, setUsername] = useState('User');

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        const productId = window.location.pathname.split('/')[2];
        const data = {
            productId,
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token")
        };

        axios.post(BASE_URL + '/api/v1/product/details', data)
            .then(function (response) {
                if (response.data.success) {
                    setProductDetails(response.data.productDetails);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const addToCart = () => {
        const productId = window.location.pathname.split('/')[2];
        const data = {
            productId,
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token")
        };

        axios.post(BASE_URL + '/api/v1/order/add', data)
            .then(function (response) {
                const newProductDetails = { ...productDetails };
                newProductDetails.addedToCart = 1;
                setProductDetails(newProductDetails)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const logoutFn = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('token')

        window.location.href = "/";
    }

    return (
        <div id="productDetailsPage">
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div className="header-wrapper d-flex justify-content-between">
                            <div className="logo d-inline-block">
                                <Link className="text-decoration-none" to={"/home"}>Ecommerce</Link>
                            </div>
                            <div className="user-actions d-flex flex-row">
                                <Link className="text-decoration-none" to={"/account"}>Account</Link>
                                <Link className="text-decoration-none" to={"/cart"}>Cart</Link>
                                <div className="user-intro">Hi {username}</div>
                                <div className="logout-btn" onClick={logoutFn}>Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="product-details-wrapper d-flex flex-row">
                        <div className="product-img d-flex">
                            <div>
                                <img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" />
                            </div>
                        </div>
                        <div className="product-details-box d-flex flex-column">
                            <div className="product-name">{productDetails.name}</div>
                            <div className="product-price fw-bold">₹ {productDetails.price}</div>
                            <div className="product-description">
                                <div className="product-description-title fw-bold">Description</div>
                                <div className="product-description-data">{productDetails.description}</div>
                            </div>
                            {
                                productDetails && productDetails.addedToCart == 1 ? (
                                    <Link
                                        className="product-details-action btn btn-primary text-decoration-none"
                                        to={"/cart"}
                                    >
                                        Go To Cart
                                    </Link>
                                ) : (
                                    <div className="product-details-action btn btn-primary text-decoration-none" onClick={addToCart}>Add To Cart</div>
                                )
                            }
                            <div className="add-to-cart-error-msg text-danger"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;