import React, { Component } from 'react';
import { connect } from 'react-redux';

import JobCard from '../Components/JobCard';

class MyJobs extends Component {


  render() {
    const appliedJobs = new Set(this.props.currJobs.map(job => job.id));
    const jobs = this.props.currJobs.map(job =>
      <JobCard
        title={job.title}
        salary={job.salary}
        equity={job.equity}
        key={job.id}
        id={job.id}
        applied={appliedJobs.has(job.id)}
        triggerApply={() => this.props.triggerApply(job.id, appliedJobs.has(job.id), job)}
      />
    )
    return (
      <div className="MyJobs">
        <h2> Applied Jobs </h2>
        {jobs}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    currJobs: reduxState.currUser.jobs,
  };
}

export default connect(mapStateToProps)(MyJobs);