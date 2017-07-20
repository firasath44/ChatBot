
var config = require('../serverConfig');


var test = {
    GetMessages: function (req, res) {
             
        res.json(JSON.stringify({ success: true }));

        
    },

 
};

module.exports = test;