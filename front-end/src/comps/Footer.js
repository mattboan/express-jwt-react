import React from "react";

import "./styles/Footer.css";

class Footer extends React.Component {
	render() {
		return (
			<footer>
				<p>
					Developed by Matt Boan. Source Code can be found at:{" "}
					<a href="https://github.com/mattboan/express-jwt-react">
						Github
					</a>
				</p>
			</footer>
		);
	}
}

export default Footer;
