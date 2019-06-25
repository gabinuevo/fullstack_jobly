import {
  POST_LOGIN,
  CHANGE_JOB_APP_STATUS,
  // POST_REGISTER,
  // POST_PROFILE_UPDATE,
  // SHOW_ERR,
} from '../Actions/ActionTypes';


const INITIAL_STATE = null;

// 

/**
 * Reducer for all actions
 */
export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_LOGIN:
      return { ...action.payload.currUser };

    case CHANGE_JOB_APP_STATUS:
      const job = action.payload.allJobInfo;
      let jobs = [...state.jobs];
      if (!action.payload.jobState) {
        jobs = jobs.filter(j => j.id !== job.id);
      } else {
        jobs.push(job);
      }
      return { ...state, jobs };
    default:
      return state;
  }
}