var config = {};

config.DEFAULT_ADMIN_NAME = 'Admin';
config.DEFAULT_ADMIN_GREETING = (room) => `Welcome to the ${room.toUpperCase()} chat room!`;
config.DEFAULT_ADMIN_NEW_USER_MESSAGE = (name) => `User ${name} has joined the room!`;
config.DEFAULT_ADMIN_USER_LEAVE_MESSAGE = (name) => `User ${name} has left the room!`;

module.exports = config;