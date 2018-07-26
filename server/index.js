const port = process.env.PORT || 3000;
const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const app = express();

app.use(express.static(publicPath));

// Start the server
app.listen(port,() => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};