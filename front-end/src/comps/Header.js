import react from "react";
import { withRouter } from "react-router-dom";
import { isLogin, logout } from "../utils/index";

import "./styles/Header.css";

class Header extends react.Component {
	componentDidUpdate(prevProps) {
		console.log("test");
		if (this.props.location.pathname !== prevProps.location.pathname) {
			console.log("Route change!");
		}
	}

	logoutHandler = () => {
		logout();
		this.props.history.push("/Login");
	};

	loginHandler = () => {
		this.props.history.push("/Login");
	};

	render() {
		return (
			<div className="Header">
				<h3>Express JWT React Example</h3>

				{isLogin() ? (
					<button onClick={this.logoutHandler}>Log Out</button>
				) : (
					<button onClick={this.loginHandler}>Log In</button>
				)}
			</div>
		);
	}
}

export default withRouter((props) => <Header {...props} />);
