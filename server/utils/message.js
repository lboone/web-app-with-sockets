const moment = require('moment');
var message = {};

message.generateMessage = (from,text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
}
message.generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: moment().valueOf()
    }
}

module.exports = message;