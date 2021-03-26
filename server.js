const express = require('express');
const PORT = process.env.PORT || 3000;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin-mongo:Serban2708@node-js-cours.rmpru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
    await client.connect();
    const collection = client.db("test").collection("messages");

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
    app.get('/messages/all', async (req, res) => {
        const docs = await collection.find({}).toArray();
        res.send(docs);
    });
    // ajouter le point d'entrée `POST /chat` comme spécifié dans l'énoncé
    app.post('/chat', async (req, res) => {
        let réponse;
        if (req.body.msg === "ville") {
            réponse = "Nous sommes à Paris";
        } else if (req.body.msg === "météo") {
            réponse = "Il fait beau";
        } else {
            réponse = `Je ne connais pas ${req.body.msg}`;
        }
        await collection.insertMany([
            {
                from: "user",
                msg: req.body.msg,
            },
            {
                from: "bot",
                msg: réponse,
            }
        ]);
        res.send(réponse);
    });
    app.delete('/messages/last', async (req, res) => {
        try {
            const docs = await collection.find().sort( { _id : -1 } ).limit(2).toArray();
            const idRéponse = docs[0]._id;
            const idQuestion = docs[1]._id;
            await collection.deleteOne({ _id: idRéponse });
            await collection.deleteOne({ _id: idQuestion });
            res.send({ success: true, result: docs });
        } catch (err) {
            res.send({ success: false, error: "unable to delete last conversation" });
        }
    });
    // demander au serveur applicatif d'attendre des requêtes depuis le port spécifié plus haut
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
    });
})();