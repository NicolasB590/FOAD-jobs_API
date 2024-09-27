import User from "./users.model.js";

const get = (options) => {
	return User.findOne(options);
};

const create = (data) => {
	return User(data).save();
};

export { get, create };
