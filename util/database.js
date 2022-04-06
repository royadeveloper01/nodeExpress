// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// async function main() {

//     const uri = 'mongodb+srv://prince:node1234@cluster0.nihym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//     const client = new MongoClient(uri);

//     try {
//         await client.connect();

//         // await listDatabases(client);

//     } catch (e) {
//         console.log(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

// module.exports = main;

// async function listDatabases(client) {
//     const databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => {
//         console.log(` - ${db.name}`)
//     });
// }

// let db;

// const mongoConnect = (callback) => {
//     MongoClient.connect(
//         'mongodb+srv://prince:node1234@cluster0.nihym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//     )
//     .then(client => {
//         console.log('Connected!!!');
//         db = client.db();
//         callback();
//     })
//     .catch(err => {
//         console.log(err);
//         throw err;
//     });
// };

// const getDb = () => {
//     if(db) {
//         return db;
//     }
//     throw 'No database found!';
// };

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;



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

//     err => {
// //   const collection = client.db("test").collection("devices");
// //   // perform actions on the collection object
// //   client.close();
