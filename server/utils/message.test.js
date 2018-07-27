const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',() => {
    it('should generate the correct message object',() => {
        var messageObject = generateMessage('Lloyd','Hi there from Lloyd');

        expect(messageObject.from).toBe('Lloyd');
        expect(messageObject.text).toBe('Hi there from Lloyd');
        expect(messageObject.fromMe).toBeFalsy();
        expect(typeof messageObject.createdAt).toBe('number')
    });
});

describe('generateLocationMessage',() => {
    it('should generate the correct location object', () => {
        var from = 'Lloyd';
        var lat = 1;
        var lng = 2;
        var fromMe = true;
        var url = `https://www.google.com/maps?q=${lat},${lng}`;

        var messageObject = generateLocationMessage(from,lat,lng,fromMe);
        expect(messageObject.from).toBe(from);
        expect(messageObject.url).toBe(url);
        expect(messageObject.fromMe).toBeTruthy();
        expect(typeof messageObject.createdAt).toBe('number')
    });
});