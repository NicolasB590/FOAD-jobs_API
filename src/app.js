// Importation du module "express-async-errors" pour gérer les erreurs dans les fonctions asynchrones
import "express-async-errors";

// Importation du framework Express
import express from "express";

// Importation de la configuration de la connexion à la base de données depuis le fichier db.config.js
import connectDB from "./config/db.config.js";

// Importation du middleware de gestion des erreurs globales
import errorHandler from "./middlewares/error-handler.js";

// Importation du middleware pour gérer les routes non trouvées
import notFound from "./middlewares/not-found.middleware.js";

// Création d'une instance de l'application Express
const app = express();

// Connexion à la base de données MongoDB via la fonction connectDB
connectDB();

// Middleware pour traiter les requêtes avec un corps JSON
app.use(express.json());

// Importation et utilisation des routes liées à l'authentification
import { auth } from "./features/auth/index.js";
app.use("/api/v1/auth", auth);

import { jobs } from "./features/jobs/index.js";
app.use("/api/v1/jobs", jobs);

// Middleware pour gérer les routes non trouvées (404)
app.use(notFound);

// Middleware global de gestion des erreurs
app.use(errorHandler);

// Exportation de l'application Express pour pouvoir la démarrer ailleurs (par exemple, dans un fichier serveur)
export default app;
