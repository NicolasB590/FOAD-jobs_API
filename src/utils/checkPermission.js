import { UnauthorizedError } from "../errors/index.js";

const checkPermission = (requestUser, ressourceUserId) => {
	if (requestUser.userId !== ressourceUserId.toString()) {
		throw new UnauthorizedError("Accès à cette route interdit");
	}
};

export { checkPermission };
