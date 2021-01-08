const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = "mongodb+srv://dbHulk:dbHulk@cluster0.zpedc.mongodb.net/testdashboard?retryWrites=true&w=majority";

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl,{useUnifiedTopology: true}, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            // console.log(dbObject)
            // const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbObject);
        }
    });
}

module.exports = {
    initialize
};