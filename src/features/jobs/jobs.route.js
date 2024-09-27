// Importation du module express pour créer un routeur
// import express from "express";
// Création d'une instance de routeur
// const router = express.Router();
// Importation du middleware de validation
import validate from "../../middlewares/validation.middleware.js";
// Importation des schémas de validation pour l'enregistrement et la connexion des utilisateurs
import { LoginUserSchema, RegisterUserSchema } from "../users/user.schema.js";
// Importation des contrôleurs d'authentification
// import * as authController from "./auth.controller.js";

// Route pour l'enregistrement d'un nouvel utilisateur
// Utilise le middleware de validation avec le schéma d'enregistrement
// router.post("/register", validate(RegisterUserSchema), authController.register);

// Route pour la connexion d'un utilisateur existant
// Utilise le middleware de validation avec le schéma de connexion
// router.post("/login", validate(LoginUserSchema), authController.login);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
// export default router;

// ==================================================
// ==================================================

import express from "express";

const router = express.Router();
import * as jobsController from "./jobs.controller.js";
import authenticateUser from "../../middlewares/auth.middleware.js";

router.get("/jobs", authenticateUser, jobsController.getAllJobs);
// router.get("/jobs", authenticateUser, jobsController.getOne);
router.post("/jobs", authenticateUser, jobsController.addJob);
router.delete("/jobs/:id", authenticateUser, jobsController.removeJob);
router.put("/jobs/:id", authenticateUser, jobsController.modifyJob);

export default router;
