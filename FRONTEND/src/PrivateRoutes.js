import React, { Component} from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import Profile from './Profile';


// Routes for loggedin users
class PrivateRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }

    render() {

        return ( 
            <div className = "PrivateRoutes" >

                <Switch>

                {!this.props.currUser && //redirect user to login if not logged in
                    <Redirect to="/login"/>}

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
                            handle={ rtProps.match.params.handle }
                            currJobs= { this.props.currUser.jobs }
                            triggerApply={ this.props.triggerApply }
                        />} 
                    />

                    <Route 
                        exact // see all jobs
                        path="/jobs" 
                        render={() => <Jobs
                            currJobs={ this.props.currUser.jobs }
                            triggerApply={ this.props.triggerApply }
                        />}
                    />

                    <Route 
                        exact // update profile
                        path="/profile" 
                        render={() => <Profile 
                            username={this.props.currUser.username}
                            first_name={this.props.currUser.first_name}
                            last_name={this.props.currUser.last_name}
                            email={this.props.currUser.email}
                            photo_url={this.props.currUser.photo_url}
                        />}
                    />

                    <Redirect to="/"/>

                </Switch>
            </div>
        );
    }
}

export default PrivateRoutes;