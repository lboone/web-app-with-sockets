const expect = require('expect');
const {Users, User} = require('./users');


var users;

beforeEach(() => {
    users = new Users();
    users.addUser(new User('1','Mike 1','Node Course 1'));
    users.addUser(new User('2','Mike 2','Node Course 2'));
    users.addUser(new User('3','Mike 3','Node Course 2'));
    users.addUser(new User('4','Mike 4','Node Course 1'));
    users.addUser(new User('5','Mike 5','Node Course 1'));
});


describe('Users', () => {
    it('should add new user', () => {
        var users = new Users();
        var user = new User('id','Lloyd','Room');
        users.addUser(user);
        expect(users.users.length > 0).toBeTruthy();
        expect(users.users[0] === user).toBeTruthy();
    });

    it('should find user',() => {
        var user = users.getUser('1');
        expect(user.id).toBe('1');
    });

    it('should not find user',() => {
        var user = users.getUser('33');
        expect(user).toBe(undefined);

    });

    it('should remove a user',() => {
        var user = users.removeUser('1');
        expect(user.id).toBe('1');
        expect(users.users.length).toBe(4);
    });

    it('should not remove user',() => {
        var user = users.removeUser('33');
        expect(user).toBe(undefined);
        expect(users.users.length).toBe(5);
    });

    it('should return names for node course 1', () => {
        var userList = users.getUserList('Node Course 1');
        expect(userList).toEqual(['Mike 1','Mike 4','Mike 5']);
    });

    it('should return names for node course 2', () => {
        var userList = users.getUserList('Node Course 2');
        expect(userList).toEqual(['Mike 2','Mike 3']);
    });

    it('should return a unique list of rooms',() => {
        var uniqueRooms = users.getRoomList();
        console.log(uniqueRooms);
        expect(uniqueRooms).toEqual(['Node Course 1'.toUpperCase(),'Node Course 2'.toUpperCase()])
    })
});

describe('User', () => {
    it('should have all properties', () => {
        var user = new User('id','Lloyd','Room');
        expect(user.toObject()).toEqual({id:'id',name:'Lloyd',room:'Room'});
    });
});