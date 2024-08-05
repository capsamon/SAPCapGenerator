const xsenv = require("@sap/xsenv");
const { XssecPassportStrategy, XsuaaService } = require('@sap/xssec');
const passport = require("passport");
const express = require('express');

module.exports = {
    initializeUserInformationEndpoint: function() {
        const router = express.Router();
        const samlUaa = xsenv.readCFServices()['uaa_pricedelta'].credentials;
        const authService = new XsuaaService(samlUaa);
        const strategy = new XssecPassportStrategy(authService);
        passport.use('JWT', strategy);
        router.get("/userInformation", passport.initialize(), passport.authenticate('JWT', { session: false }), this.fetchUserInformation());
        return router;        
    },

    fetchUserInformation: function(){
        return (req, res) => {
            return res.send({
                result: {
                    user: req.user,
                    scopes: req.authInfo?.getTokenInfo()?.getPayload()?.scope,
                    space: JSON.parse(process.env.VCAP_APPLICATION).space_name                
                },
            });
        }
    }
}