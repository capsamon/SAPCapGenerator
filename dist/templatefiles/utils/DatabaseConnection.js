"use strict";
const cds = require('@sap/cds');
const dbClass = require("sap-hdbext-promisfied");
_connection = null;
module.exports = {
    setupConnection: async function () {
        const db = await cds.connect.to('db');
        _connection = new dbClass(await dbClass.createConnection(db.options.credentials));
    },
    getConnection: function () {
        return _connection;
    }
};
