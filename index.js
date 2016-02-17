'use strict';

/**
 * Twillio SMS Services
 */


var Promise  = require('bluebird'),
    twilio = require('twilio');

var Twilio = function(configs){
    this.sender = configs.number;
    this.client = new twilio(configs.accountSid, configs.authToken);
};

Twilio.prototype.send = function(number, message){
    var self = this;
    var send =  Promise.promisify(self.client.messages.create);

    return send({
        to : number.toString(),
        from : this.sender,
        body : message
    });
};

module.exports = function(configs) {
    return new Twilio(configs);
};
