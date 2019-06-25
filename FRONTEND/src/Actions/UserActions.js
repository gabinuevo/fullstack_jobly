import {
  POST_LOGIN,
  POST_REGISTER,
  PATCH_PROFILE_UPDATE,
  SHOW_ERR,
} from './ActionTypes';

import JoblyApi from '../JoblyAPI';

// gets userInfo, needs username
export function getUserInfoViaToken(username) {
  return async function (dispatch) {
    try {
      const currUser = await JoblyApi.getUserInfo(username);
      dispatch(gotUser(currUser));
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}

// gets userInfo, needs username + password
export function getUserInfoViaLogin(inputObj) {
  return async function (dispatch) {
    try {
      const userData = await JoblyApi.getTokenLogin(inputObj);
      localStorage.setItem("_token", userData.token);
      dispatch(gotUser(userData.user));
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}

function gotUser(currUser) {
  return {
    type: POST_LOGIN,
    payload: { currUser }
  }
}

// sends new user info to backend, sends new user info to store
export function getUserInfoViaRegister(inputObj) {
  return async function (dispatch) {
    try {
      const { token } = await JoblyApi.getTokenRegister(inputObj);
      localStorage.setItem("_token", token);
      inputObj.user.jobs = []
      dispatch(madeUser(inputObj));
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}

function madeUser(newUser) {
  return {
    type: POST_REGISTER,
    payload: { newUser }
  }
}

// sends new user info to backend, sends new user info to store
export function updateExistingUser(username, data) {
  return async function (dispatch) {
    try {
      await JoblyApi.updateUserInfo(username,data);
      dispatch(updatedUser(data));
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}

function updatedUser(newInfo) {
  return {
    type: PATCH_PROFILE_UPDATE,
    payload: { newInfo }
  }
}

export function showErr(errMsg) {
  return {
    type: SHOW_ERR,
    payload: { message: errMsg }
  }
}