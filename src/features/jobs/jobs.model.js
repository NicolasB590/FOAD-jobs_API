// Importation des fonctions nécessaires de mongoose pour créer un modèle et un schéma
import { model, Schema } from "mongoose";
import mongoose from "mongoose";
// Importation des constantes de statut d'emploi depuis un module utilitaire
import { JOB_STATUS } from "../../utils/constants.js";

// Définition du schéma JobSchema pour le modèle de poste
const JobSchema = new Schema(
	{
		// Champ 'company' : chaîne de caractères requise, avec une longueur maximale de 50 caractères
		company: {
			type: String,
			required: [true, "Veuillez fournir une entreprise"],
			maxlength: 50,
		},
		// Champ 'position' : chaîne de caractères requise, avec une longueur maximale de 100 caractères
		position: {
			type: String,
			required: [true, "Veuillez fournir un intitulé"],
			maxlength: 100,
		},
		// Champ 'status' : chaîne de caractères qui doit être l'un des statuts définis dans JOB_STATUS
		status: {
			type: String,
			enum: [JOB_STATUS.DECLINED, JOB_STATUS.INTERVIEW, JOB_STATUS.PENDING],
			default: JOB_STATUS.PENDING, // Statut par défaut est 'PENDING'
		},
		// Champ 'createdBY' : référence à un utilisateur (ObjectId), requise pour indiquer qui a créé l'offre d'emploi
		createdBY: {
			type: mongoose.Types.ObjectId,
			ref: "User", // Référence au modèle 'User'
			required: [true, "Veuillez fournir un utilisateur"],
		},
	},
	{ timestamps: true } // Ajoute des champs 'createdAt' et 'updatedAt' automatiquement
);

// Exportation du modèle 'Job' basé sur le schéma JobSchema
export default model("Job", JobSchema);
