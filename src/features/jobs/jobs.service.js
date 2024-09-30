import Job from "./jobs.model.js";

const get = (options) => {
	return Job.find({ createdBY: options.id });
};

const create = (data) => {
	return Job(data).save();
};

const getJob = (id) => {
	return Job.findById(id);
};

const remove = (data) => {
	return Job.findByIdAndDelete({ _id: data.id });
};

const modify = (data) => {
	console.log(data);

	return Job.findByIdAndUpdate(data.id, { status: data.status }, { new: true });
};

export { get, create, remove, modify, getJob };
