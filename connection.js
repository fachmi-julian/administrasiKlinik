const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/klinikSetiaMekar";

mongoClient.connect(url, function (err, db) {
    if (err)  {
        console.log('db not connect')
    }
    console.log('db create');
    db.close();
})