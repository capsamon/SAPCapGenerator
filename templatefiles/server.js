const proxy = require('@cap-js-community/odata-v2-adapter')
const cds = require('@sap/cds');
const passportUtils = require('./utils/passportUtils');

cds.once('listening', ({ server }) => {
    server.keepAliveTimeout = 3 * 60 * 1000 // > 3 mins
});

cds.on('bootstrap', app => {
    app.use(proxy());
    app.use(passportUtils.initializeUserInformationEndpoint());
});

cds.on('served', () => {
    console.log("All services started");
});
module.exports = cds.server;