import React, { Component } from 'react';
import { decode } from 'jsonwebtoken';
import { connect } from 'react-redux';

import {
  getUserInfoViaToken,
  getUserInfoViaLogin,
  getUserInfoViaRegister
} from './Actions/UserActions';
import { postJobApp } from './Actions/ApplicationActions';
import JoblyApi from './JoblyAPI';
import Routes from './Routes/Routes'
import NavBar from './Components/NavBar'
import './Styles/App.css';

/**
 * Renders NavBar and Routes
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleApply = this.handleApply.bind(this);
  }

  // ensures currUser is updated prior to rendering page
  async componentDidMount() {
    let token = localStorage.getItem("_token")
    try {
      if (!token) {
        this.setState({
          loading: false,
        })
      } else if (!this.props.currUser) {
        let username = decode(token).username;
        await this.props.getUserInfoViaToken(username);
        this.setState({
          loading: false,
        })
        this.props.history.push('/jobs')
      } else {
        this.setState({
          loading: false,
        })
      }
    } catch (err) {
      this.setState({
        error: err
      });
    }
  }


  // get token from API
  async handleLogin(input) {
    try {
      // get token and save to local storage
      await this.props.getUserInfoViaLogin(input);
      this.props.history.push("/jobs");
    } catch (e) {
      this.setState({
        error: e.message,
      });
    }
  }

  // handles registering new user. 
  async handleRegister(input) {
    try {
      await this.props.getUserInfoViaRegister(input);
      this.props.history.push("/jobs");
    } catch (err) {
      this.setState({
        error: err
      });
    }
  }

  // removes token from local storage, updates currUser, 
  // and re-routes user to homepage.
  handleLogout() {
    try {
      localStorage.removeItem("_token");
      this.props.history.push("/login");
    } catch (e) {
      console.log("Goodbye!")
    }
  }

  // Sends note to server indicating that a job has been applied to. 
  // Updates currUser in state.
  async handleApply(id, state, jobInfo) {
    try {
      let applied = state ? false : "applied"
      await this.props.postJobApp(id, applied, jobInfo);
    } catch (err) {
      this.setState({
        error: err
      });
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.loading
          ? <p>loading...</p>
          : (<>
            <NavBar currUser={this.props.currUser} triggerLogout={this.handleLogout} />
            <Routes currUser={this.props.currUser} triggerLogin={this.handleLogin} triggerRegister={this.handleRegister} triggerApply={this.handleApply} />
          </>)
        }

      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    currUser: reduxState.currUser,
  };
}

const mapDispatchToProps = {
  getUserInfoViaToken,
  getUserInfoViaLogin,
  getUserInfoViaRegister,
  postJobApp,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
