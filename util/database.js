const { MongoClient, ServerApiVersion } = require('mongodb');

let db;

const uri = "mongodb+srv://prince:node1234@cluster0.nihym.mongodb.net/shop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const mongoConnect = callback => {
    client.connect()
    .then(client => {
        console.log('Connected!!');
        db = client.db()
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if (db) {
        return db;
    }
    throw 'No database found!!'
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;