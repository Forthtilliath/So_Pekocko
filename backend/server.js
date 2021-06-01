require('dotenv').config();
const server = require('./controllers/server');
const app = require('./app');

server.create('http', process.env.PORT_HTTP, app);
// server.create('https', process.env.PORT_HTTPS, app);

/**
 * TODO Exigences concernant la sécurité
 * [ ] l’API doit respecter le RGPD et les standards OWASP ;
 * [x] le mot de passe des utilisateurs doit être chiffré ;
 * [ ] 2 types de droits administrateur à la base de données doivent être définis : un accès pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base de données ;
 * [ ] la sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine ;
 * [x] l’authentification est renforcée sur les routes requises ;
 * [x] les mots de passe sont stockés de manière sécurisée ;
 * [x] les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.
 */

/**
 * TODO Optimisation
 * [x] Réduire la taille des images avant de les enregistrer sur le server
 * [ ] Crypter email dans la base
 */
