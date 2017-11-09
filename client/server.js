var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path')

var env = (process.env.NODE_ENV ? process.env.NODE_ENV : 'development')

var config = require('./config/config.' + env + '.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
})

app.listen(config.port, onListening);


function onListening() {

    console.log('yomefun system listend on ' + config.port + ' and env is ' + env);
}

