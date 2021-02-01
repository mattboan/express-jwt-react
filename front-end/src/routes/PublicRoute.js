import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Route
			{...rest}
			render={(props) =>
				isLogin() && restricted ? (
					<Redirect to="/Profile" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PublicRoute;
