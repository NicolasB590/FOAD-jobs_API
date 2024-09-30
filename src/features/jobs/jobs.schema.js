// Importation de la bibliothèque Zod pour la validation des schémas
import z from "zod";
// Importation des constantes relatives aux statuts des emplois
import { JOB_STATUS } from "../../utils/constants.js";
// Importation de Mongoose pour les manipulations liées à MongoDB
import mongoose from "mongoose";

// Définition d'un schéma de validation pour les paramètres de l'emploi
const JobParamsSchema = z.object({
	// L'ID doit être une chaîne de caractères et doit être un ID MongoDB valide
	id: z.string().refine((id) => mongoose.isValidObjectId(id), {
		message: "Format d'ID invalide", // Message d'erreur en cas d'ID invalide
	}),
});

// Définition d'un schéma de validation pour le corps de la requête d'emploi
const JobBodySchema = z.object({
	// La société doit être une chaîne de caractères non vide, sans espaces superflus
	company: z.string().trim().min(1),
	// Le poste doit également être une chaîne de caractères non vide, sans espaces superflus
	position: z.string().trim().min(1),
	// Le statut doit être l'un des valeurs définies dans JOB_STATUS
	status: z.enum([
		JOB_STATUS.DECLINED, // Statut "refusé"
		JOB_STATUS.INTERVIEW, // Statut "en entretien"
		JOB_STATUS.PENDING, // Statut "en attente"
	]),
});

// Exportation des schémas pour une utilisation dans d'autres parties de l'application
export { JobBodySchema, JobParamsSchema };
