const databaseConnection = require("../database/DatabaseConnection");
const hdbext = require('@sap/hdbext');

module.exports = async function(dataObject, procedureName){
    try {
        const dbConn = databaseConnection.getConnection();
        const _procedureToCall = await dbConn.loadProcedurePromisified(hdbext, null, procedureName);        
        const output = await dbConn.callProcedurePromisified(_procedureToCall, dataObject);
        return output; //Needs to return object for the 'after', we just return the input...
    } 
    catch (error) {
        console.error(error);
        return {
            message: error
        };
    }
};