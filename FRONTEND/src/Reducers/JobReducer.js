import {
  GET_ALL_JOBS,
  // ADD_JOB,
  // PATCH_JOB,
  // DELETE_JOB,
} from '../Actions/ActionTypes';


const INITIAL_STATE = { allJobs: [] };

/**
 * Reducer for all actions
 */
export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_JOBS:
      var test = { ...state, allJobs: [...action.payload.jobs] };
      return test
    default:
      return state;
  }
}