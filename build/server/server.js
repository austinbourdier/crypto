'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Dependencies
var app = (0, _express2.default)();

var publicPath = _express2.default.static(_path2.default.join(__dirname, '../'));
var indexPath = _path2.default.join(__dirname, '../index.html');
var port = process.env.PORT || 4444;

var UserSchema = new _mongoose2.default.Schema({
  name: String,
  password: String,
  updated_at: { type: Date, default: Date.now }
});

var User = _mongoose2.default.model('User', UserSchema);

var CallSchema = new _mongoose2.default.Schema({
  exchange: String,
  ticker: String,
  target: Number,
  stopLoss: Number,
  created_at: { type: Date, default: Date.now }
});

var Call = _mongoose2.default.model('Call', CallSchema);

require('dotenv').config();

_mongoose2.default.connect(process.env.MONGO_URI, function (err) {
  if (err) console.log('ERROR: ', err);else console.log('connected');
});

//Configure Body Pareser and Cookie Parser
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded());
app.use((0, _cookieParser2.default)());
app.use(publicPath);

app.get('/', function (req, res) {
  res.sendFile(indexPath);
});

app.post('/call', function (req, res) {
  if (req.body.password !== process.env.CALL_PASSWORD) {
    return res.status(401).send({ message: 'Wrong password' });
  }
  Call.create(req.body, function (err, call) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(call);
  });
});

app.get('/calls', function (req, res) {
  Call.find({}, function (err, calls) {
    if (err) {
      return res.status(500).send(err);
    }
    if (calls.length > 15) {
      return res.status(200).send(calls.slice(calls.length - 10));
    } else {
      return res.status(200).send(calls);
    }
  });
});

app.listen(port, function () {
  console.log('Listening at http://localhost:' + port);
});