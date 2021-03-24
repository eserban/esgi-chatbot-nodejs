const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 3000;
const fichierRéponses = "réponses.json";
(async () => {
    let définitions = {};
    try{
        définitions = JSON.parse(await fs.promises.readFile(fichierRéponses, { encoding: 'utf8' }));
    }catch(err){
        console.log("Le fichier reponses.json n'existe pas encore");
    }
        
 // instancier le serveur applicatif "express"
 const app = express();
 app.use(express.json());
 // définir le point d'entrée `GET /` qui répond "Bonjour !" à chaque requête reçue
 app.get('/', (req, res) => {
 res.send('Bonjour !');
 });
 // ajouter le point d'entrée `GET /hello?nom=XXX` comme spécifié dans l'énoncé
 app.get('/hello', (req, res) => {
 if (req.query.nom) {
 res.send('Bonjour, ' + req.query.nom + ' !');
 } else {
 res.send('Quel est votre nom ?');
 }
 });
 // ajouter le point d'entrée `POST /chat` comme spécifié dans l'énoncé
 app.post('/chat', (req, res) => {
 // 1. chercher si on connait une définition de ce mot
 if (req.body.msg in définitions) {
 res.send(`${req.body.msg}: ${définitions[req.body.msg]}`);
 return;
 }
 // 2. si l'utilisateur fournit une définition, la stocker
 const parties = req.body.msg.split(" = ");
 if (parties.length === 2) {
 définitions[parties[0]] = parties[1];
 fs.promises.writeFile(fichierRéponses, JSON.stringify(définitions), { encoding: 'utf8' });
 res.send("Merci pour cette information !");
 return;
 }
 if (req.body.msg === "ville") {
 res.send("Nous sommes à Paris");
 } else if (req.body.msg === "météo") {
 res.send("Il fait beau");
 } else {
 res.send(`Je ne connais pas ${req.body.msg}`);
 }
 });
 // demander au serveur applicatif d'attendre des requêtes depuis le port spécifié plus haut
 app.listen(PORT, () => {
 console.log(`Example app listening at http://localhost:${PORT}`);
 });
})();
// pensez à réparer l'indentation