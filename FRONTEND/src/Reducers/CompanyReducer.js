import {
  GET_COMPANIES,
  // ADD_COMPANY,
  // DELETE_COMPANY,
} from '../Actions/ActionTypes';


const INITIAL_STATE = [];

/**
 * Reducer for all actions
 */
export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return action.payload.companies;
    default:
      return state;
  }
}