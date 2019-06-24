import React, { Component } from 'react';
import '../Styles/Search.css'

/**
 * Recieves triggerUpdateQuery from Companies
 * Renders a search bar
 * Sends new query to Companies
 */
class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.triggerUpdateQuery(this.state.query);
  }

  handleChange(evt) {
    this.setState({
      query: evt.target.value
    })
  }

  render() {
    return (
      <div className="Search">
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.handleChange } name="query" value={ this.state.query } placeholder="Enter search term..." />
          <svg viewBox="0 0 20 20" className="input-arrow">
            <path d="M20 0 L10 10 L20 20">
            </path>
          </svg>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Search;
