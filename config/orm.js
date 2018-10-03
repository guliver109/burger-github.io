// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        //if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations
            //if (typeof value === "string" && value.indexOf(" ") >= 0) {
                //value = "'" + value + "'";
            //}

            arr.push(key + "=" + value);
        }
        return arr.toString();
    }
//}
    // Object for all our SQL statement functions
    var orm = {
        //Function for all burgers in our table
        selectAll: function (tableInput, cb) {
            //query string that returns all rows from the target table
            var queryString = "SELECT * FROM " + tableInput + ";";
            
            //database query
            connection.query(queryString, function (err, result) {
                if (err) {
                    throw err;
                }
                //returnig callback result
                cb(result);
            });
        },
        //Insert one table entry function
        insertOne: function (table, cols, vals, cb) {
            //string that inserts a single row into the target table
            var queryString = "INSERT INTO " + table;

            queryString += " (";
            queryString += cols.toString();
            queryString += ") ";
            queryString += "VALUES (";
            queryString += printQuestionMarks(vals.length);
            queryString += ") ";

            console.log(queryString);
            
            //data base query
            connection.query(queryString, vals, function (err, result) {
                if (err) {
                    throw err;
                }
                //returnig callback result
                cb(result);
            });
        },
        //update table function
        updateOne: function (table, objColVals, condition, cb) {
            //query string that updates a single entry in the target table
            var queryString = "UPDATE " + table;

            queryString += " SET ";
            queryString += objToSql(objColVals);
            queryString += " WHERE ";
            queryString += condition;

            console.log(queryString);
            
            //database query
            connection.query(queryString, function (err, result) {
                if (err) {
                    throw err;
                }
                //returnig callback result
                cb(result);
            });
        },
        //delete eaten burgers
        deleteOne: function(table, condition, cb) {
            var queryString = "DELETE FROM " + table;
            
            queryString += " WHERE ";
            queryString += condition;
            
            connection.query(queryString, function(err, data){
              if(err){
                throw err;
              }
              cb(data);
            });
          }
    };
  
    // Export the orm module    
    module.exports = orm;