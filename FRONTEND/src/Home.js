import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

/** Renders basic home component
 * Changes based on user being logged in or not
 */
class Home extends Component {
  render() {
    return (
      <div className="Home">
            <h1>Jobly</h1>
            <h4>All the jobs in one, convenient place</h4>
            {this.props.currUser
            ? <h2>Welcome back!</h2>
            : <Link to="/login" className="Home-button">Login</Link>}
      </div>
    );
  }
}

export default Home;
