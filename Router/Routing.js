const express = require('express');
const routing = express.Router();
const connectDB = require('../DB/Connection');


routing.get('/',(req, res)=> {
    const client = connectDB;
    client.connect();
    console.log("Connected correctly to server");
    const db = client.db("testdashboard");
    console.log(db);
    // client.connect((err,db) => {

    //     db.listCollections().toArray(function (err, collectionInfos) {
    //         console.log(collectionInfos);
    //         db.close();
    //     });

    // const collection = client.db("testdashboard");
    // // perform actions on the collection object
    // collection.listCollections().toArray(function(err, collInfos) {
    //     // collInfos is an array of collection info objects that look like:
    //     // { name: 'test', options: {} }
    //     console.log(collInfos)
    // });

    // collection.collectionNames(function(err, collections){
    //     console.log(collections);
    // });

    client.close();
  });
// } );

routing.get('/getTestXMLCollections',(req, res, next)=>{
    console.log(req);
    console.log(res);
} );


module.exports = routing;