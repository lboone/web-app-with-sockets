var message = {};

message.generateMessage = (from,text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}

module.exports = message;