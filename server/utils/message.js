var message = {};

message.generateMessage = (from,text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}
message.generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: new Date().getTime()
    }
}

module.exports = message;