// Importation des codes de statut HTTP pour les réponses
// import { StatusCodes } from "http-status-codes";
// Importation des services des utilisateurs
import * as usersService from "../users/users.service.js";
// Importation d'une classe d'erreur personnalisée pour les utilisateurs non authentifiés
import { UnauthenticatedError } from "../../errors/index.js";

// Fonction pour enregistrer un nouvel utilisateur
const register = async (req, res) => {
	// Création d'un utilisateur via le service d'authentification
	const user = await usersService.create(req.body);
	// Génération d'un token d'accès pour l'utilisateur créé
	const token = user.createAccessToken();
	// Envoi d'une réponse avec le statut CREATED et les détails de l'utilisateur et du token
	res.status(StatusCodes.CREATED).json({ user, token });
};

// Fonction pour connecter un utilisateur existant
const login = async (req, res) => {
	// Vérifie si l'utilisateur avec l'email fourni existe
	const user = await usersService.get({ email: req.body.email });
	if (!user) {
		// Si l'utilisateur n'existe pas, lance une erreur d'authentification
		throw new UnauthenticatedError("Identifiants invalides.");
	}

	// Vérifie que le mot de passe correspond à celui enregistré
	const isPasswordCorrect = await user.comparePasswords(req.body.password);
	if (!isPasswordCorrect) {
		// Si le mot de passe est incorrect, lance une erreur d'authentification
		throw new UnauthenticatedError("Identifiants invalides.");
	}

	// Génération d'un token d'accès pour l'utilisateur connecté
	const token = user.createAccessToken();
	// Envoi d'une réponse avec le statut OK et les informations de l'utilisateur et du token
	res.status(StatusCodes.OK).json({ user: { userId: user._id, token } });
};

// Exportation des fonctions de connexion et d'enregistrement
export { login, register };

//==================================
//==================================

import { StatusCodes } from "http-status-codes";
import * as jobsService from "./jobs.service.js";

const getAllJobs = async (req, res) => {
	const jobs = await jobsService.get({ id: req.user.userId });

	res.status(StatusCodes.OK).json({ jobs });
};

const addJob = async (req, res) => {
	const job = await jobsService.create({
		company: req.body.company,
		position: req.body.position,
		createdBY: req.user.userId,
	});

	res.status(StatusCodes.CREATED).json({ job });
};

const removeJob = async (req, res) => {
	const { id: id } = req.params;
	const deletedItem = await jobsService.remove({ id });
	res.status(StatusCodes.OK).json({ deletedItem });
};

const modifyJob = async (req, res) => {
	const { id: id } = req.params;
	const updatedJob = await jobsService.modify({ id, status: req.body.status });
	res.status(StatusCodes.OK).json({ updatedJob });
};

export { getAllJobs, addJob, removeJob, modifyJob };
