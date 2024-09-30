// Importation des codes de statut HTTP depuis le module http-status-codes
import { StatusCodes } from "http-status-codes";
// Importation de la bibliothèque de validation de schémas Zod
import { z } from "zod";

// Fonction de validation qui prend en paramètres un schéma de corps (bodySchema)
// et un schéma de paramètres (paramsSchema).
const validate =
	({ bodySchema, paramsSchema }) =>
	(req, res, next) => {
		try {
			// Vérifie si un schéma de validation du corps est fourni.
			if (bodySchema) {
				// Parse le corps de la requête avec le schéma fourni.
				const parsedBody = bodySchema.parse(req.body);
				// Remplace le corps de la requête par le corps validé.
				req.body = parsedBody;
			}

			// Vérifie si un schéma de validation des paramètres est fourni.
			if (paramsSchema) {
				// Parse les paramètres de la requête avec le schéma fourni.
				const parsedParams = paramsSchema.parse(req.params);
				// Remplace les paramètres de la requête par les paramètres validés.
				req.params = parsedParams;
			}

			// Passe au middleware suivant si tout est valide.
			next();
		} catch (error) {
			// Si une erreur de validation est levée (ZodError), on renvoie un statut 400.
			if (error instanceof z.ZodError) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ errors: error.errors });
			}
			// Dans tous les autres cas d'erreur, passe l'erreur au middleware d'erreur suivant.
			next(error);
		}
	};

// Exportation de la fonction de validation
export default validate;
