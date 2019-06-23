import React, { Component } from 'react';
import './JobCard.css';

/**Recieves ONE job data
 * Renders a card with job data*/
class JobCard extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.applied !== this.props.applied;
    }

    render() {
        // check if already applied (in currUser.jobs )
        const { title, salary, equity, applied } = this.props;
        const button = (applied
            ? <button disabled>APPLIED</button> 
            : <button onClick={ this.props.triggerApply }>APPLY</button>
        );

        return (
            <div className="JobCard">
                <div className="JobCard-text">
                    <p className="JobCard-title">
                        {title}
                    </p>

                    <p className="JobCard-salary">
                        Salary: {salary}
                    </p>

                    <p className="JobCard-equity">
                        Equity: {equity}
                    </p>
                </div>
                { button }
            </div>
        );
    }
}

export default JobCard;
