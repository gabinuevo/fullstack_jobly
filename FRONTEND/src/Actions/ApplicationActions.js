import JoblyApi from '../JoblyAPI';
import { CHANGE_JOB_APP_STATUS, SHOW_ERR } from './ActionTypes';


// apply/unapply to a single job
export function postJobApp(jobId, state, allJobInfo) {
  return async function (dispatch) {
    try {
      await JoblyApi.getApplicationMsg(jobId, state);
      dispatch(updateApplication(state, allJobInfo));
    } catch (err) {
      const errMsg = err.response.data;
      dispatch(showErr(errMsg));
    }
  }
}

function updateApplication(jobState, allJobInfo) {
  return {
    type: CHANGE_JOB_APP_STATUS,
    payload: { allJobInfo, jobState }
  }
}

export function showErr(errMsg) {
  return {
    type: SHOW_ERR,
    payload: { message: errMsg }
  }
}