// Importation de la bibliothèque Zod pour la validation de schémas
import { z } from "zod";

// Définition du schéma de validation pour l'enregistrement d'un utilisateur
const RegisterUserSchema = z.object({
	// Champ 'name' : doit être une chaîne de caractères, sans espaces en début et fin,
	// avec une longueur minimale de 3 caractères et maximale de 50 caractères
	name: z
		.string()
		.trim()
		.min(3, { message: "Doit avoir au minimum 3 caractères" })
		.max(50, { message: "Doit avoir au maximum 50 caractères" }),
	// Champ 'email' : doit être une chaîne de caractères au format email valide
	email: z.string().email({ message: "Email invalide" }),
	// Champ 'password' : doit être une chaîne de caractères, sans espaces en début et fin,
	// avec une longueur minimale de 6 caractères
	password: z
		.string()
		.trim()
		.min(6, { message: "Doit avoir au minimum 6 caractères" }),
});

// Définition du schéma de validation pour la connexion d'un utilisateur
const LoginUserSchema = z.object({
	// Champ 'email' : doit être une chaîne de caractères au format email valide
	email: z.string().email({ message: "Email invalide" }),
	// Champ 'password' : doit être une chaîne de caractères, sans espaces en début et fin
	password: z.string().trim(),
});

// Exportation des schémas de validation pour qu'ils soient utilisés ailleurs dans l'application
export { RegisterUserSchema, LoginUserSchema };
