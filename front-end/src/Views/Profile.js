import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

//import "./Styles/Profile.css";

const url = "http://localhost:8080/api/profile";

class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			token: Cookies.get("token"),
			message: "",
		};
	}

	componentDidMount() {
		this.getForm();
	}

	getForm = () => {
		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${this.state.token}`,
			},
		};

		axios
			.get(url, config)
			.then((result) => {
				this.setState({ message: result.data });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div className="Profile">
				<p>{this.state.message}</p>
			</div>
		);
	}
}

export default Profile;
