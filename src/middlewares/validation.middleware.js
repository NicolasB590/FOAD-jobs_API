// Importation des codes de statut HTTP depuis le module http-status-codes
import { StatusCodes } from "http-status-codes";
// Importation de la bibliothèque de validation de schémas Zod
import { z } from "zod";

// Fonction de validation qui prend un schéma Zod comme argument
const validate = (schema) => (req, res, next) => {
	// Bloc try-catch pour gérer les erreurs de validation
	try {
		// Validation du corps de la requête en utilisant le schéma Zod
		const parsedBody = schema.parse(req.body);
		// Si la validation réussit, on remplace le corps de la requête par le corps validé
		req.body = parsedBody;
		// Passe au middleware suivant
		next();
	} catch (error) {
		// Vérifie si l'erreur est une erreur de validation Zod
		if (error instanceof z.ZodError) {
			// En cas d'erreur de validation, on renvoie une réponse avec le statut BAD_REQUEST
			// et les détails des erreurs de validation
			res.status(StatusCodes.BAD_REQUEST).json({ errors: error.errors });
		}
		// Si l'erreur n'est pas une erreur de validation Zod, elle est transmise au middleware d'erreur
		next(error);
	}
};

// Exportation de la fonction de validation
export default validate;
