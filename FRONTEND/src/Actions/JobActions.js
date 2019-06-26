// export const SHOW_ERR = 'SHOW_ERR';

import JoblyApi from '../JoblyAPI';
import { 
  GET_ALL_JOBS, 
  SHOW_ERR, 
  // ADD_JOB, 
  // PATCH_JOB, 
  // DELETE_JOB 
} from './ActionTypes';


/** 
 * Format data to be sent to the reducer
*/

// gets all jobs
export function getAllJobs(params = {}) {
  return async function (dispatch) {
    try {
      const jobs = await JoblyApi.getJobs(params);
      dispatch(gotJobs(jobs));
    } catch (err) {
      const errMsg = err.response.data;
      dispatch(showErr(errMsg));
    }
  }
}

function gotJobs(jobs) {
  return {
    type: GET_ALL_JOBS,
    payload: { jobs }
  }
}

export function showErr(errMsg) {
  return {
    type: SHOW_ERR,
    payload: { message: errMsg }
  }
}