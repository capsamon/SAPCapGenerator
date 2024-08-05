cds.env.features.with_parameters = false;
const databaseConnection = require("../utils/DatabaseConnection");
const genericProcedureCaller = require("../utils/GenericProcedureCaller");

module.exports = async function (srv) {
    //Await connection with the DB
    await databaseConnection.setupConnection();

    srv.on('sampleCreate', async (req) => {
        return await genericProcedureCaller(req.data, 'procedures::PR_SAMPLE');
    });
}

