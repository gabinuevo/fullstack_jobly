import React, { Component } from 'react';
import JoblyApi from './JoblyAPI';
import Search from './Search';
import JobCard from './Components/JobCard';

/**
 * Recieves a list of job data from API request & search keyword from Search
 * Renders all/searched jobs (JobCard) and search bar (Search)
 * Sends individual job data to JobCard
 */

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      jobData: [],
      error: null
    }
    this.updateQuery = this.updateQuery.bind(this)
  }

  // get job data from API
  async componentDidMount() {
    try {
      const data = await JoblyApi.getJobs()
      this.setState({
        jobData: data,
        loading: false
      });
    } catch (err) {
      this.setState({
        error: err
      });
    }
  }

  // updates query make another API req
  async updateQuery(query) {
    try {
      const searchData = await JoblyApi.getJobs({ "search": query });
      this.setState({
        jobData: searchData,
      });
    } catch (err) {
      this.setState({
        error: err,
      });
    }
  }


  render() {
    //  appliedJobs is a set of all jobs user has applied to
    let jobs;
    let appliedJobs;
    if (!this.state.loading) {
      appliedJobs = new Set(this.props.currJobs.map(job => job.id));
      jobs = this.state.jobData.map(job =>
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
    }
    return (
      <div className="jobs">
        {!this.state.error && this.state.loading
          ? <p>Loading...</p>
          : <div>
            <Search triggerUpdateQuery={this.updateQuery} />
            {jobs}
          </div>
        }
        {this.state.error && <p>Something happened</p>}
      </div>
    );
  }
}

export default Jobs;
