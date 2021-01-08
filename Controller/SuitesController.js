const DB = require('./DB/Connection');

const list = DB.db('testdashboard').listCollection().toArray();
console.log(list)