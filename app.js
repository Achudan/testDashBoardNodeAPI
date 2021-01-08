const express = require('express');

const router = require('./Router/Routing');

const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// app.use(express.json({ extended: false }));
app.use(
    function(req,res,next){
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
        res.header("Access-Control-Allow-Headers", "content-type");
        next()
    }
)


const db = require("./DB/Connection");
const dbName = "testdashboard";
const collectionName = "";

db.initialize(dbName, collectionName, function(dbObject) { // successCallback

    //Added by Achu TS
    //Thanks to https://dev.to/lennythedev/rest-api-with-mongodb-atlas-cloud-node-and-express-in-10-minutes-2ii1
    // << db CRUD routes >>

    app.get("/getAllXML", (request, response) => {
        dbObject.listCollections().toArray((err, collInfos)=> {
            if (err) throw err;
            let xmlArr = []
            collInfos.forEach(doc=>{
                console.log(doc.name)
                xmlArr.push(doc.name)
            })
            response.send(xmlArr);
        });
    });

    app.get("/getXMLDetails/:id", (request, response) => {

        const itemId = request.params.id;
        const dbCollection = dbObject.collection(itemId);

        dbCollection.find().toArray((error, result) => { 
            // callback of find
            if (error) throw _error;
            let dateTimeArr = []
            result.forEach(doc=>{
                dateTimeArr.push(doc.date_and_time)
            })
            // console.log(result)
            response.send(dateTimeArr);
            // response.json(result)
        });     
    });

    app.get("/getListOfDetails/:xmlName/:dateAndTime", (request, response) => {

        const xmlName = request.params.xmlName;
        const dateAndTimeID = request.params.dateAndTime;
        const dbCollection = dbObject.collection(xmlName);

        dbCollection.findOne({date_and_time : dateAndTimeID},(error, result) => { 
            // callback of find
            if (error) throw _error;
            // console.log(result.list_of_testClasses)
            response.json(result.list_of_testClasses);
        });     
    });

}, function(err) { // failureCallback
    throw (err);
});

const PORT = 8080
const HOST = '0.0.0.0';
app.listen(PORT,HOST, ()=>{
    console.log('server started in port '+PORT)
})