var config = require('../serverConfig');
var apiai = require('apiai');
var app = apiai(config.hostingApiConfig.apiaiClientId);

var apiAi = {
    getMessages: function (req, res) {
        try {
            if (req) {

                var request = app.textRequest(req.body.inputMessage, {
                    sessionId: req.body.sessionID
                });

                request.on('response', function (response) {
                    console.log("api called");
                    res.json(response);
                });

                request.on('error', function (error) {
                    console.log(error);
                    res.json({ error: error });
                });

                request.end();
            }
        }
        catch (ex){
            res.json({ error: "Request could not be processed" });
        }

    },


};

module.exports = apiAi;