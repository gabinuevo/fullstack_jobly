import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.css'

/**For rendering links to all main pages 
 * everywhere in the app
 * changes based off whether user is/is not logged in
 *  */
class NavBar extends Component {

	render() {
		return ( 
			<nav className="NavBar" >
				<NavLink className="NavBar-logo" exact to="/">Jobly</NavLink> 
				{ this.props.currUser
					? <section>
						<NavLink to="/companies">Companies</NavLink>
						<NavLink exact to="/jobs">Jobs</NavLink>
						<NavLink exact to="/profile">Profile</NavLink>
						<a onClick={ this.props.triggerLogout } href="/">Log Out</a>
					</section>
					: <section>
						<NavLink exact to="/login">Log In</NavLink>
						<NavLink exact to="/register">Register</NavLink>
					</section>
				}
			</nav>
		);
	}
}

export default NavBar;