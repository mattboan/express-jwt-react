import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./Styles/Register.css";

const url = "http://localhost:8080/api/register";

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			token: Cookies.get("token"),
			username: "",
			password: "",
			res: "",
		};
	}

	handleUsernameChange = (event) => {
		this.setState({ username: event.target.value });
	};

	handlePasswordChange = (event) => {
		this.setState({ password: event.target.value });
	};

	postForm = () => {
		const params = new URLSearchParams();
		params.append("username", this.state.username);
		params.append("password", this.state.password);

		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${this.state.token}`,
			},
		};

		axios
			.post(url, params, config)
			.then((result) => {
				console.log(result.data.success);
				this.setState({ res: "Status: " + result.data.success });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div className="Register">
				<h3>Register</h3>
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
				<button onClick={this.postForm}>Register</button>
				<p>{this.state.res}</p>
			</div>
		);
	}
}

export default Register;
