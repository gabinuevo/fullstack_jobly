import React, { Component } from 'react';

/**
 * Component that renders form to login 
 * or register based on assigned props
 */
class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /** send inputs to App.js, redirects to /jobs after*/ 
  async handleSubmit(evt) {
    evt.preventDefault();
    if(this.props.path === "/login"){
      await this.props.triggerLogin({
        username: this.state.username,
        password: this.state.password
      });
    } else {
      await this.props.console.log("******************", queryInfo)(this.state);
    }
    this.props.history.push("/jobs");
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  
  render() {
    return (
      <form className="Login" onSubmit={ this.handleSubmit }>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" value={ this.state.username } onChange={ this.handleChange }></input>

        <label htmlFor="password">Password</label>
        <input name="password" id="password" type="password" value={ this.state.password } onChange={ this.handleChange }></input>

        {/* conditional to turn form into registration form */}
        { this.props.path === "/register" &&
          <section>
            <label htmlFor="first_name">First name</label>
            <input name="first_name" id="first_name" value={ this.state.first_name } onChange={ this.handleChange }></input>
            <label htmlFor="last_name">Last name</label>
            <input name="last_name" id="last_name" value={ this.state.last_name } onChange={ this.handleChange }></input>
            <label htmlFor="email">Email</label>
            <input name="email" id="email" value={ this.state.email } onChange={ this.handleChange }></input>
          </section>
        }
        <button>Submit</button>

      </form>
    );
  }
}

export default Login;
