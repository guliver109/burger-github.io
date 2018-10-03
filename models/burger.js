// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");


var burger = {
    //all burgers
    selectAll: function(cb) {
      orm.selectAll("burger", function(res) {
        cb(res);
      });
    },
    // create new
    insertOne: function(cols, vals, cb) {
      orm.insertOne("burger", cols, vals, function(res) {
        cb(res);
      });
    },
    //update existing
    updateOne: function(objColVals, condition, cb) {
      orm.updateOne("burger", objColVals, condition, function(res) {
        cb(res);
      });
    },
    //delete existing
    deleteOne: function(id, cb){
      orm.deleteOne("burger", id, function(res) {
        cb(res);
        console.log("hit burger remove");
      });
    }
}
//Export the database functions
module.exports = burger;