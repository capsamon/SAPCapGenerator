import proxy from '@cap-js-community/odata-v2-adapter';
import cds from '@sap/cds';
import passportUtils from './utils/PassportUtils';
cds.once('listening', (server) => {
    server.keepAliveTimeout = 3 * 60 * 1000; // > 3 mins
});
cds.on('bootstrap', (app) => {
    app.use(proxy());
    app.use(passportUtils.initializeUserInformationEndpoint());
});
cds.on('served', () => {
    console.log("All services started");
});
module.exports = cds.server;
