import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Companies from '../Containers/Companies';
import Company from '../Containers/Company';
import Jobs from '../Containers/Jobs';
import Profile from '../Containers/Profile';
import MyJobs from '../Containers/MyJobs';


// Routes for loggedin users
class PrivateRoutes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		}
	}

	render() {
		//redirect user to login if not logged in
		if (!this.props.currUser) {
			return <Redirect to="/" />;
		}

		let { username,
			first_name,
			last_name,
			email,
			photo_url,
			jobs,
		} = this.props.currUser

		const { triggerApply } = this.props;

		return (
			<div className="PrivateRoutes" >

				<Switch>

					<Route
						exact // see all companies
						path="/companies"
						render={() => <Companies
						/>}
					/>

					<Route
						exact // see company details/jobs
						path="/companies/:handle"
						render={(rtProps) => <Company
							handle={rtProps.match.params.handle}
							triggerApply={triggerApply}
							currJobs={jobs}
						/>}
					/>

					<Route
						exact // see all jobs
						path="/jobs"
						render={() => <Jobs
							triggerApply={triggerApply}
						/>}
					/>

					<Route
						exact // see applied jobs
						path="/my-jobs"
						render={() => <MyJobs
							triggerApply={triggerApply}
						/>}
					/>

					<Route
						exact // update profile
						path="/profile"
						render={() => <Profile
							username={username}
							first_name={first_name}
							last_name={last_name}
							email={email}
							photo_url={photo_url}
						/>}
					/>

					<Redirect to="/" />

				</Switch>
			</div>
		);
	}
}

export default PrivateRoutes;