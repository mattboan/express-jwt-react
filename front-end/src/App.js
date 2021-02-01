import "./App.css";
import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import Header from "./comps/Header";
import Footer from "./comps/Footer";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Profile from "./views/Profile";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Header />

				<Switch>
					<PublicRoute
						restricted={false}
						component={Home}
						path="/"
						exact
					/>
					<PublicRoute
						restricted={false}
						component={Register}
						path="/Register"
						exact
					/>
					<PublicRoute
						restricted={true}
						component={Login}
						path="/Login"
						exact
					/>
					<PrivateRoute component={Profile} path="/Profile" exact />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default App;
