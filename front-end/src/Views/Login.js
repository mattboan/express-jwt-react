import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { login, logout } from "../utils";

import "./styles/Register.css";

const url = "http://localhost:8080/api/login";

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
		};
	}

	handleUsernameChange = (event) => {
		this.setState({ username: event.target.value });
	};

	handlePasswordChange = (event) => {
		this.setState({ password: event.target.value });
	};

	postForm = (e) => {
		e.preventDefault();
		logout(); //imported function: utils/index.js/logout()
		const params = new URLSearchParams();
		params.append("username", this.state.username);
		params.append("password", this.state.password);

		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		};

		axios
			.post(url, params, config)
			.then((result) => {
				console.log(result);

				login(result.data.token); //imported function: utils/index.js/login()

				this.props.history.push("/Profile");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<form className="Register" onSubmit={this.postForm}>
				<h3>Login</h3>
				<label>Username</label>
				<input
					type="text"
					value={this.state.username}
					onChange={this.handleUsernameChange}
				/>
				<label>Password</label>
				<input
					type="password"
					value={this.state.password}
					onChange={this.handlePasswordChange}
				/>
				<button type="submit">Login</button>
				<p>
					Need an account? Register <Link to="/Register">Here</Link>
				</p>
			</form>
		);
	}
}

export default Register;
