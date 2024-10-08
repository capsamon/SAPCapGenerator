import databaseConnection from "../utils/DatabaseConnection";
import genericProcedureCaller from "../utils/GenericProcedureCaller";
import { cds } from '@sap/cds';
cds.env.features.with_parameters = false;
module.exports = async function (srv) {
    //Await connection with the DB
    await databaseConnection.setupConnection();
    srv.on('sampleCreate', async (req) => {
        return await genericProcedureCaller(req.data, 'procedures::PR_SAMPLE');
    });
};
