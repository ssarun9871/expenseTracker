const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let db;//_db here 'underscore means it can be used internally only'

const mongoConnect = (cb) =>{
    MongoClient.connect('mongodb+srv://ssarun9871:9871Kumar@cluster0.oxomptf.mongodb.net/expenseTracker?retryWrites=true&w=majority')
    .then(client =>{
        console.log('Connected to mongoDB');
        
        db = client.db();//It will store connection to the database(expensTracker)
        cb(client);
    })
    .catch(err=>{
        console.log(err) 
        throw err;
    })
}


// It will return database instance we connected to
const getDb = ()=>{
    //check if db is not undefined
    if(db){
        return db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
