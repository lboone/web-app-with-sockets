const moment = require('moment');
var message = {};

message.generateMessage = (from,text,fromMe) => {
    return {
        from,
        text,
        fromMe: fromMe || false,
        createdAt: moment().valueOf()
    }
}
message.generateLocationMessage = (from, lat, lng,fromMe) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        fromMe: fromMe || false,
        createdAt: moment().valueOf()
    }
}

module.exports = message;