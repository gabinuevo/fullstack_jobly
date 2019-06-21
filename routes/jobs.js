const Router = require("express").Router;
const Job = require("../models/job");
const ExpressError = require("../helpers/expressError");
const { BAD_REQUEST, NOT_FOUND } = require("../config");
const { validate } = require("jsonschema");
const jobSchemaNew = require("../schemas/jobSchemaNew.json");

const router = new Router();

/** Post a new job, return error if data is invalid. */
router.post("/", async function (req, res, next) {
    try {
        const validation = validate(req.body, jobSchemaNew);

        if (!validation.valid) {
            const errors = validation.errors.map(e => e.stack);
            throw new ExpressError (errors, BAD_REQUEST);
        }
        const job = await Job.addJob(req.body);

        return res.status(201).json({ job });
    } catch (err) {
        return next(err);
    }
});

/** GET /  - get full list of jobs or
* list of jobs matching passed in parameters.
* => {jobs: [{title, company_handle}, ...]}
*/
router.get("/", async function (req, res, next) {
    try {
        const { search, min_salary, min_equity } = req.body;

        const result = await Job.searchByTerms({ search, min_salary, min_equity });
        return res.json({jobs: result});
        
    } catch (err) {
        return next(err);
    }
});

/** GET /:id  - get details of 1 job w/ id in params
* => {job:jobData}
*/
router.get("/:id", async function (req, res, next) {
    try {
        const jobID = req.params.id;

        const result = await Job.getDetailsofOneJob(jobID);

        if (result === undefined) {
            throw new ExpressError('Job not found', NOT_FOUND)
        } else {
            return res.json({job: result});
        }
    } catch (err) {
        return next(err);
    }  
});

/** PATCH /:id  - updates a job by its ID 
 * returns an the newly updated job
* => {job:jobData}
*/
router.patch("/:id", async function (req, res, next) {
    try {
        const jobID = req.params.id;

        const result = await Job.updateOneJob('jobs', req.body, 'id', jobID);

        if (result === undefined) {
            throw new ExpressError('Job not found', NOT_FOUND)
        } else {
            return res.json({job: result});
        }
    } catch (err) {
        return next(err);
    }
});

/** DELETE /:id  - delete a job by its ID 
 * returns message of deletes
* => { message: "Job deleted." } */
router.delete("/:id", async function (req, res, next) {
    try {
        const jobID = req.params.id;

        const result = await Job.deleteOneJob(jobID);

        if (result.rowCount === 0) {
            throw new ExpressError('Job not found', NOT_FOUND)
        } else {
            return res.json({message: 'Job deleted.'});
        }
    } catch (err) {
        return next(err);
    }
});

module.exports = router;