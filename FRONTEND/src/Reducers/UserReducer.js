import {
  POST_LOGIN,
  // POST_REGISTER,
  // POST_PROFILE_UPDATE,
  // SHOW_ERR,
} from '../Actions/ActionTypes';


const INITIAL_STATE = null;

/**
 * Reducer for all actions
 */
export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_LOGIN:
      return { ...action.payload.currUser };
    default:
      return state;
  }
}