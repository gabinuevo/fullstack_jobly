/** Job class for Jobly */
const db = require("../db");
const sqlForPartialUpdate = require("../helpers/partialUpdate");
const { makeGetQuery, makeInsertQuery } = require("../helpers/jobQueryGens");
const { BAD_REQUEST } = require("../config");


/** A job on the site */

class Job {

	static getSafeFields() {
		const safeFields = ["id", "title", "salary",
			"equity", "company_handle", "date_posted"];
		return safeFields;
	}

	/** Insert a new job into the database -- returns
 * {handle, name, num_employees, descrption, logo_url} */
	static async addJob(inputObj) {
		const safeFields = Job.getSafeFields();
		const queryInfo = makeInsertQuery(inputObj, safeFields);
		const result = await db.query(queryInfo.query, queryInfo.valuesArr);

		return result.rows[0];
	}

	/** Get a list of jobs 
	 * NOTE: MUST TAKE OBJECT
	 * -- returns
	 * [{handle, name}, ...]
	 */

	static async searchByTerms(queryObj) {
		const queryInfo = makeGetQuery(queryObj);
		const result = await db.query(queryInfo.query,
			queryInfo.searchParams);
		return result.rows;
	}

	/** Get all job data using job id in url. Returns job
	 * object or job not found error. */
	static async getDetailsofOneJob(jobID) {

		const result = await db.query(`SELECT title, 
                                                salary, 
                                                equity, 
                                                company_handle, 
                                                date_posted 
                                                FROM jobs 
                                            WHERE id=$1`,
			[jobID]);


		return result.rows[0];
	}

	/** Update one job using job id in url. Returns job
	 * object or job not found error. Takes obj with 
	 * tablename, items, key, and id as keys*/
	static async updateOneJob(tablename, reqObj, key, id) {
		const safeFields = Job.getSafeFields();
		const queryInfo = sqlForPartialUpdate(tablename, reqObj, key, id, safeFields);

		const result = await db.query(queryInfo.query,
			queryInfo.values);

		return result.rows[0];
	}

	/** delete one job using job id in url.*/
	static async deleteOneJob(id) {

		const result = await db.query(`DELETE FROM jobs WHERE id=$1`, [id]);

		return result;
	}


	/** get all jobs for 1 company.*/
	static async getAllJobsForCompany(handle) {

		const result = await db.query(`SELECT id, title, salary, equity FROM jobs WHERE company_handle=$1`, [handle]);

		return result.rows;
	}

	static async sendApplication(username, jobId, applied = "applied") {
		try {
			let result;
			if (!applied) {
				// TODO: Add feature to remove applications.
			} else {
				result = await db.query(`INSERT INTO applications (username, job_id, state) VALUES ($1, $2, $3) RETURNING username, job_id, state`, [username, jobId, applied]);
			}
			return result.rows;
		} catch (e) {
			console.log(e.message);
		}
	}

}

module.exports = Job;