import { UnauthenticatedError } from "../errors/index.js";
import { verifyJWT } from "../utils/token.utils.js";

const authenticateUser = (req, _res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new UnauthenticatedError("Pas de token fournit");
	}

	const token = authHeader.split(" ")[1];

	if (!token) {
		throw new UnauthenticatedError("Pas de token fournit");
	}

	try {
		const decodedToken = verifyJWT(token);
		req.user = { userId: decodedToken.userId };
		next();
	} catch (error) {
		throw new UnauthenticatedError("Accès non autorisé");
	}
};

export default authenticateUser;
