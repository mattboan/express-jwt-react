import React from "react";
import { Link } from "react-router-dom";

import "./styles/Home.css";

class Home extends React.Component {
	render() {
		return (
			<div className="Home">
				<h3>Hello World!</h3>
				<p>
					Trying to learn more about React JS Authentication. So
					thought what better way of learning than actually trying to
					implement a React JS application that authenticates with an
					express node js server and then authorises API requests
					utilizing JWT tokens.
				</p>
				<h4>Routes: </h4>
				<ul>
					<li>
						<Link to="/Login">Login</Link>
					</li>
					<li>
						<Link to="/Register">Register</Link>
					</li>
					<li>
						<Link to="/Profile">
							View Profile [ Private Route ]
						</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default Home;
