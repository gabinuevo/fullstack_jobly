import {
  SHOW_ERR,
  GET_COMPANIES,
  // ADD_COMPANY,
  // DELETE_COMPANY,
} from './ActionTypes';

import JoblyApi from '../JoblyAPI';


// gets all companies for user that is loggedin.
export function getAllCompanies(params) {
  return async function (dispatch) {
    try {
      const companies = await JoblyApi.getCompanies(params);
      dispatch(gotCompanies(companies));
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}

function gotCompanies(companies) {
  return {
    type: GET_COMPANIES,
    payload: { companies }
  }
}


export function showErr(errMsg) {
  return {
    type: SHOW_ERR,
    payload: { message: errMsg }
  }
}