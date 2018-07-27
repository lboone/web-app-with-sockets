
class Users {
    constructor () {
        this.users = [];
    }

    addUser (user) {
        var uName = user.name.toLowerCase();
        var uRoom = user.room.toLowerCase();
        var userS = this.users.filter((user) => user.name.toLowerCase() === uName && user.room.toLowerCase() === uRoom)[0];
        if (!userS){
            this.users.push(user);
            return user;
        } else {
            return undefined;
        }
    }

    removeUser (id) {
        // return user that was removed
        var user = this.getUser(id);
        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }

    getRoomList () {
        var myArray =  this.users.map((user) => user.room.toUpperCase());
        if(myArray.length > 0){
            return myArray.filter((elem, pos) => myArray.indexOf(elem) == pos);
        }
        return [];
        
    }
}

class User {
    constructor (id,name,room) {
        this.id = id;
        this.name = name;
        this.room = room;
    }

    toObject () {
        return {
            id: this.id,
            name: this.name,
            room: this.room
        }
    }
}

module.exports = {Users,User};