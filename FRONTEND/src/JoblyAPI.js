import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

/** Helper class to send API requests to server and return resulting data*/
class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    paramsOrData._token = localStorage.getItem("_token") || null;
    console.log("API Call:", endpoint, paramsOrData, verb);
    try {
      let response = (await axios({
        method: verb,
        url: `${BASE_URL}${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
      console.log("THIS IS THE RESPONSE", response)
      return response
    }
    catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** gets all companies that match search query.*/
  static async getCompanies(params = {}) {
    let res = await this.request(`companies/`, params);
    return res.companies;
  }

  /** gets 1 company via handle & Returns all company data/jobs */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** gets all jobs that match search query*/
  static async getJobs(params) {
    let res = await this.request(`jobs/`, params);
    return res.jobs;
  }

  // apply for job and get message
  static async getApplicationMsg(id, state = "applied") {
    let res = await this.request(`jobs/${id}/apply`, { state }, "post");
    return res.message;
  }

  // login makes post request to /auth/login with username and password
  static async getTokenLogin(data) {
    let res = await this.request(`users/login`, data, "post");
    return { token: res.token, user: res.user };
  }

  // login makes post request to /auth/login with username and password
  static async getTokenRegister(data) {
    let res = await this.request(`users/`, data, "post");
    return res.token;
  }

  // get one user info
  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // update one user info
  static async updateUserInfo(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

}

export default JoblyApi;

