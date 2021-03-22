const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.listen($PORT);

app.get('/', (req, res) => {
  res.send('Bonjour !');
});

app.get('/hello', (req, res) => {
    if(req.query.nom){
        res.send('Bonjour, ' + req.query.nom + " !");
    }else{
        res.send("Quel est votre nom ?");
    }
});

app.post('/chat', function (req, res) {
    if(req.body.msg === "ville"){
        res.send("Nous sommes à Paris");
    }else if(req.body.msg === "météo") {
        res.send("Il fait beau");
    }
});

