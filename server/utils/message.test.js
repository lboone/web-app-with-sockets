const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage',() => {
    it('should generate the correct message object',() => {
        var messageObject = generateMessage('Lloyd','Hi there from Lloyd');

        expect(messageObject.from).toBe('Lloyd');
        expect(messageObject.text).toBe('Hi there from Lloyd');
        expect(typeof messageObject.createdAt).toBe('number')
    })
});