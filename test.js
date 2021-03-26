const assert = require("assert");
const fetch = require('node-fetch');

describe('Quand le chatbot', function() {


    it('reçoit une requête HTTP GET à la racine (/), il répond “Bonjour !”', async () => {
            const res = await fetch("http://localhost:3000");
            assert.equal(await res.text(), "Bonjour !");
    });
});