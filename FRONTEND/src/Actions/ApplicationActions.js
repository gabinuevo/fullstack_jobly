import { CHANGE_JOB_APP_STATUS } from './actionTypes';


// apply/unapply to a single job
export function postJobApp(jobId, state) {
  return async function (dispatch) {
    try {
      await JoblyApi.getApplicationMsg(jobId, state);
      dispatch(updateApplication(jobId));
    } catch (err) {
      const errMsg = err.response.data;
      dispatch(showErr(errMsg));
    }
  }
}

function updateApplication(jobId) {
  return {
    type: CHANGE_JOB_APP_STATUS,
    payload: { jobId }
  }
}