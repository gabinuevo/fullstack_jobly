import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login'
import PrivateRoutes from './PrivateRoutes';


// All routes within the application.
class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		}
	}

	render() {

		return (
			<div className="Routes" >
				<Switch>


					<Route //NOTE: ALSO VALID WHEN LOGGED IN
						exact
						path="/"
						render={() => <Home currUser={this.props.currUser} />}
					/>


					<Route
						exact
						path="/login"
						render={(rtProps) => <Login
							triggerLogin={this.props.triggerLogin}
							history={rtProps.history}
							path={rtProps.match.path}
						/>}
					/>

					<Route
						exact
						path="/register"
						render={(rtProps) => <Login
							triggerRegister={this.props.triggerRegister}
							history={rtProps.history}
							path={rtProps.match.path}
						/>}
					/>


					<Route
						path="/"
						render={() => <PrivateRoutes
							currUser={this.props.currUser}
							triggerApply={this.props.triggerApply}
						/>}
					/>

				</Switch>
			</div>
		);
	}
}

export default Routes;