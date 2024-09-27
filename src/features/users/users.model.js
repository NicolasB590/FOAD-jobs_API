// Importation des fonctions nécessaires de mongoose pour créer un modèle et un schéma
import { model, Schema } from "mongoose";
// Importation de bcryptjs pour le hachage des mots de passe
import bcrypt from "bcryptjs";
// Importation de jsonwebtoken pour la création de tokens d'authentification
import jwt from "jsonwebtoken";

// Définition du schéma UserSchema pour le modèle d'utilisateur
const UserSchema = new Schema({
	// Champ 'name' : chaîne de caractères requise, avec une longueur minimale de 3 et maximale de 50 caractères
	name: {
		type: String,
		required: [true, "Veuillez fournir un nom"],
		maxlength: 50,
		minlength: 3,
	},
	// Champ 'email' : chaîne de caractères requise, unique, avec validation pour s'assurer qu'il s'agit d'un email valide
	email: {
		type: String,
		required: [true, "Veuillez fournir un email"],
		unique: true,
		// Expression régulière pour valider le format de l'email
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Veuillez fournir un email valide",
		],
	},
	// Champ 'password' : chaîne de caractères requise avec une longueur minimale de 6 caractères
	password: {
		type: String,
		required: [true, "Veuillez fournir un mot de passe"],
		minlength: 6,
	},
});

// Middleware qui s'exécute avant la sauvegarde d'un utilisateur pour hacher le mot de passe
UserSchema.pre("save", async function () {
	// Génération d'un sel pour le hachage
	const salt = await bcrypt.genSalt();
	// Hachage du mot de passe avant de le sauvegarder
	this.password = await bcrypt.hash(this.password, salt);
});

// Méthode pour supprimer le mot de passe de l'objet utilisateur lors de la conversion en JSON
UserSchema.methods.toJSON = function () {
	let userObject = this.toObject();
	delete userObject.password; // Suppression du mot de passe
	return userObject; // Retourne l'objet sans le mot de passe
};

// Méthode pour générer un token d'accès pour l'utilisateur
UserSchema.methods.createAccessToken = function () {
	// Création d'un token signé avec l'ID de l'utilisateur
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

// Méthode pour comparer le mot de passe fourni par l'utilisateur avec celui stocké
UserSchema.methods.comparePasswords = async function (candidatePassword) {
	// Compare le mot de passe donné avec le mot de passe haché stocké
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch; // Retourne un booléen indiquant si les mots de passe correspondent
};

// Exportation du modèle 'User' basé sur le schéma UserSchema
export default model("User", UserSchema);
