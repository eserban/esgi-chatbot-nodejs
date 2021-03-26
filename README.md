Ce projet est un serveur HTTP implémenté avec Express.
Il est accessible en production depuis l'URL suivante: https://chatbot-3moc.herokuapp.com/
## Comment installer
```
$ npm install
```
## Comment exécuter
```
$ npm start
```
### Variables d'environnement
Spécifier les variables d'environnement suivantes:
- `PORT`: port sur lequel le serveur attendra les requêtes, par défaut: 3000
- `MONGODB_URI`: URI de connexion à la base de données MongoDB
## Comment tester
```
$ curl "http://localhost:3000/" # doit répondre “Bonjour !”
$ curl "http://localhost:3000/hello?nom=Sasha" # doit répondre “Bonjour, Sasha !””
$ curl "http://localhost:3000/hello?nom=Michel" # doit répondre “Bonjour, Michel !””
$ curl "http://localhost:3000/hello" # doit répondre “Quel est votre nom ?”
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"ville\"}" "http://localhost:3000/chat" # doit répondre “Nous sommes à Paris”
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"météo\"}" "http://localhost:3000/chat" # doit répondre “Il fait beau”
$ curl -X GET "http://localhost:3000/messages/all" # affiche l’historique des conversations
$ curl -X DELETE "http://localhost:3000/messages/last" # supprime le dernier échange de l’historique
```
## Deploiement en production
```
heroku login
heroku git:clone -a chatbot-3moc
git add .
git commit -am "deploiement"
git push heroku master
```