import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/CompanyCard.css';
/**
 * Recieves ONE company data from Companies
 * Renders a card with company data
 * On click, routes to company details page
 */

class CompanyCard extends Component {

  render() {
    const { handle, logo_url, name, description }= this.props;

    return (
      <Link className="CompanyCard-link" to={`/companies/${handle}`}>
        <div className="CompanyCard">

          {logo_url
            ? <img className="CompanyCard-logo" src={logo_url} alt={name} />
            : <i className="far fa-building CompanyCard-logo"></i>
          }

          <p className="CompanyCard-name">
            {name}
          </p>

          <p className="CompanyCard-desc">
            {description.substring(0, 40)}...
          </p>

        </div>
      </Link>
    );
  }
}

export default CompanyCard;
