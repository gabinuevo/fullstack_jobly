/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import jobs from './Reducers/JobReducer';
import currUser from './Reducers/UserReducer';
import companies from './Reducers/CompanyReducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default combineReducers({
  jobs,
  companies,
  currUser
});