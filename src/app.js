// Importation du module "express-async-errors" pour gérer les erreurs dans les fonctions asynchrones
import "express-async-errors";

import helmet from "helmet";

import { rateLimit } from "express-rate-limit";

import mongoSanitize from "express-mongo-sanitize";

import cors from "cors";

import swaggerUI from "swagger-ui-express";

import YAML from "yamljs";

// Importation du framework Express
import express from "express";

// Importation de la configuration de la connexion à la base de données depuis le fichier db.config.js
import connectDB from "./config/db.config.js";

// Importation du middleware de gestion des erreurs globales
import errorHandler from "./middlewares/error-handler.js";

// Importation du middleware pour gérer les routes non trouvées
import notFound from "./middlewares/not-found.middleware.js";

const swaggerDocument = YAML.load("./swagger.yaml");

// Création d'une instance de l'application Express
const app = express();

// Connexion à la base de données MongoDB via la fonction connectDB
connectDB();

app.use(helmet());

app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
		standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
		// store: ... , // Redis, Memcached, etc. See below.
	})
);

app.use(mongoSanitize());

app.use(cors());

// Middleware pour traiter les requêtes avec un corps JSON
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/", (_req, res) => {
	res
		.status(StatusCodes.OK)
		.send("<h1>API JOBS</h1><a href='/api-docs'>Documentation</a>");
});

// Importation et utilisation des routes liées à l'authentification
import { auth } from "./features/auth/index.js";
app.use("/api/v1/auth", auth);

import { jobs } from "./features/jobs/index.js";
import authenticateUser from "./middlewares/auth.middleware.js";
import { StatusCodes } from "http-status-codes";
app.use("/api/v1/jobs", authenticateUser, jobs);

// Middleware pour gérer les routes non trouvées (404)
app.use(notFound);

// Middleware global de gestion des erreurs
app.use(errorHandler);

// Exportation de l'application Express pour pouvoir la démarrer ailleurs (par exemple, dans un fichier serveur)
export default app;
