import React, { Component } from 'react';
import '../Styles/JobCard.css';

/**Recieves ONE job data
 * Renders a card with job data*/
class JobCard extends Component {

	shouldComponentUpdate(nextProps) {
		return nextProps.applied !== this.props.applied;
	}

	render() {
		// check if already applied (in currUser.jobs )
		const { title, salary, equity, applied } = this.props;
		const button = (applied
			? <button onClick={this.props.triggerApply} className="JobCard-Applied-Button">APPLIED</button>
			: <button onClick={this.props.triggerApply} className="JobCard-Apply-Button">APPLY</button>
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
				{button}
			</div>
		);
	}
}

export default JobCard;
