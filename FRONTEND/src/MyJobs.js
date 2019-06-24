import React, { Component } from 'react';
import JobCard from './JobCard';

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
        triggerApply={() => this.props.triggerApply(job.id, appliedJobs.has(job.id))}
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

export default MyJobs;