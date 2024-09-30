import express from "express";

const router = express.Router();
import * as jobsController from "./jobs.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import { JobBodySchema, JobParamsSchema } from "./jobs.schema.js";

router
	.route("/")
	.get(jobsController.getUserJobs)
	.post(validate({ bodySchema: JobBodySchema }), jobsController.addJob);

router
	.route("/:id")
	.delete(validate({ paramsSchema: JobParamsSchema }), jobsController.removeJob)
	.put(validate({ paramsSchema: JobParamsSchema }), jobsController.modifyJob)
	.get(validate({ paramsSchema: JobParamsSchema }), jobsController.get);

export default router;
