var moment = require('moment');

// Jan 1st 1970 00:00:00 am

// var d = new Date();
// var dT = new Date().getTime();


// console.log('Date:',d,'Date Time',dT);
// console.log('Date Month:',d.getMonth(),);

var date = moment();

// console.log(date.format('MMM Do YYYY'));

console.log(date.format('h:mm a'));