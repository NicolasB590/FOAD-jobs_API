import { StatusCodes } from "http-status-codes";
import * as jobsService from "./jobs.service.js";
import { checkPermission } from "../../utils/checkPermission.js";

const getUserJobs = async (req, res) => {
	const jobs = await jobsService.get({ id: req.user.userId });

	res.status(StatusCodes.OK).json({ nbhits: jobs.length, jobs });
};

const addJob = async (req, res) => {
	const job = await jobsService.create({
		company: req.body.company,
		position: req.body.position,
		createdBY: req.user.userId,
	});

	res.status(StatusCodes.CREATED).json({ job });
};

const get = async (req, res) => {
	const { id: id } = req.params;
	const item = await jobsService.getJob(id);
	checkPermission(req.user, job.createdBy);
	res.status(StatusCodes.OK).json({ item });
};

const removeJob = async (req, res) => {
	const { id: id } = req.params;
	const job = await jobsService.get(id);
	checkPermission(req.user, job.createdBY);
	const deletedItem = await jobsService.remove({ id });
	res.status(StatusCodes.OK).json({ deletedItem });
};

const modifyJob = async (req, res) => {
	const { id: id } = req.params;
	const job = await jobsService.get(id);
	checkPermission(req.user, job.createdBY);
	const updatedJob = await jobsService.modify({ id, status: req.body.status });
	res.status(StatusCodes.OK).json({ updatedJob });
};

export { getUserJobs, addJob, removeJob, modifyJob, get };
