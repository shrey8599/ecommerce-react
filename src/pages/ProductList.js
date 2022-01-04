import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/productList.css';

const BASE_URL = 'http://13.235.87.215:4000';

function ProductList() {
	const [categoryList, setCategoryList] = useState([]);
	const [productList, setProductList] = useState([]);
	const [username, setUsername] = useState('User');
	const [currentCategory, setCurrentCategory] = useState('');
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(-1);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const data = {};
		setUsername(localStorage.getItem("username"));
		axios.post(BASE_URL + '/api/v1/category/all', {})
			.then(function (response) {
				if (response.data.success) {
					setCategoryList(response.data.categories);
				}
			})
			.catch(function (error) {
				console.log(error);
			});

		if (currentCategory) {

		}
		if (window.location.search) {
			setCurrentCategory(window.location.search.split("=")[1]);
			data.categoryId = window.location.search.split("=")[1];
		}
		fetchProducts(data);
	}, []);

	const searchProduct = (e) => {
		setSearchQuery(e.target.value);
		const data = {
			query: e.target.value
		};

		if (currentCategory) {
			data.categoryId = currentCategory;
		}

		fetchProducts(data);
	}

	const fetchProducts = (data) => {
		axios.post(BASE_URL + '/api/v1/product/all', data)
			.then(function (response) {
				if (response.data.success) {
					setProductList(response.data.products);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const updateCategory = (categoryId) => {
		setCurrentCategory(categoryId);
		const data = {
			categoryId
		};
		fetchProducts(data);
	}

	const updateMinPrice = (e) => {
		setMinPrice(e.target.value);
		filterProduct(e.target.value, maxPrice, searchQuery);
	}

	const updateMaxPrice = (e) => {
		setMaxPrice(e.target.value);
		filterProduct(minPrice, e.target.value, searchQuery);
	}

	const filterProduct = (minPrice, maxPrice, searchQuery) => {
		const data = {
			query: searchQuery,
			minPrice,
			maxPrice,
		};

		if (currentCategory) {
			data.categoryId = currentCategory;
		}

		fetchProducts(data);
	}

	const clearFilter = () => {
		window.location.href = "/products";
	}

	return (
		<div id="productListPage">
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
								<div className="logout-btn">Logout</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<h2 className="product-list-title text-center">All Products</h2>
					<div className="product-list-wrapper d-flex flex-row">
						<div className="product-list-sidebar d-flex flex-column">
							<div className="sidebar-title">Search</div>
							<div className="sidebar-search form-group">
								<input type="text" placeholder="Search by name" className="form-control" onChange={searchProduct} />
							</div>
							<div className="sidebar-title fw-bold">Categories</div>
							<div>
								{
									categoryList.map((category) => (
										<Link onClick={() => updateCategory(category.categoryId)} key={category.categoryId} className={"d-flex text-decoration-none " + (category.categoryId == currentCategory ? 'active' : undefined)} to={"/products?categoryId=" + category.categoryId}>{category.name}</Link>
									))
								}
							</div>
							<div className="sidebar-title">Filter by Price</div>
							<div className="price-filter">
								<div className="price-filter-select d-flex flex-row justify-content-between">
									<div className="form-group">
										<select className="form-select" onChange={updateMinPrice}>
											<option value="0">0</option>
											<option value="1000">1000</option>
											<option value="2000">2000</option>
											<option value="5000">5000</option>
											<option value="10000">10000</option>
											<option value="20000">20000</option>
											<option value="50000">50000</option>
										</select>
									</div>
									<div className="form-group">
										<select className="form-select" onChange={updateMaxPrice}>
											<option value="1000">1000</option>
											<option value="2000">2000</option>
											<option value="5000">5000</option>
											<option value="10000">10000</option>
											<option value="20000">20000</option>
											<option value="50000">50000</option>
											<option value="-1">100000+</option>
										</select>
									</div>
								</div>
								<div className="price-filter-title d-flex flex-row justify-content-between">
									<div>Min Price</div>
									<div>Max Price</div>
								</div>
							</div>
							<div className="btn btn-primary clear-filter" onClick={clearFilter}> Clear All Filters</div>
						</div>
						<div className="product-list-box">
							{
								productList.map((product) => (
									<Link key={product.productId} className="product-item text-decoration-none d-inline-block" to={"/product/" + product.productId + "/details"}>
										<div className="product-img">
											<img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" />
										</div>
										<div className="product-name text-center">{product.name}</div>
										<div className="product-price text-center">₹ {product.price}</div>
									</Link>
								))
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductList;
