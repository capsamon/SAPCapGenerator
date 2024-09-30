import { cds } from "@sap/cds";
import dbClass from "sap-hdbext-promisfied";
let _connection = null;
export default {
    setupConnection: async function () {
        const db = await cds.connect.to('db');
        _connection = new dbClass(await dbClass.createConnection(db.options.credentials));
    },
    getConnection: function () {
        return _connection;
    }
};
