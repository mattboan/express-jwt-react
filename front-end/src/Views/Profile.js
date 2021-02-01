import React from "react";
import axios from "axios";
import { getToken, isLogin } from "../utils";

import "./styles/Profile.css";

const url = "http://localhost:8080/api/profile";

class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			role: "",
			id: "",
			error: "",
		};
	}

	componentDidMount() {
		this.getForm();
	}

	getForm = () => {
		let authHead = null;
		if (isLogin()) {
			authHead = `Bearer ${getToken()}`;
		}

		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: authHead,
			},
		};

		axios
			.get(url, config)
			.then((result) => {
				this.setState({
					username: result.data.username,
					role: result.data.role,
					id: result.data.id,
				});
			})
			.catch((err) => {
				console.log(err);
				this.setState({ error: err.message });
			});
	};

	render() {
		return (
			<div className="Profile">
				<p>ID: {this.state.id}</p>
				<p>Username: {this.state.username}</p>
				<p>Role: {this.state.role}</p>
			</div>
		);
	}
}

export default Profile;
