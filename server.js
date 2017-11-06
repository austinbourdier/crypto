//Dependencies
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


var app = express();

const publicPath = express.static(path.join(__dirname, '../'));
const indexPath = path.join(__dirname, '../index.html');
const port = process.env.PORT || 4444;


import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  updated_at: { type: Date, default: Date.now },
});

var User = mongoose.model('User', UserSchema);

const CallSchema = new mongoose.Schema({
  exchange: String,
  ticker: String,
  target: Number,
  stopLoss: Number,
  created_at: { type: Date, default: Date.now },
});

var Call = mongoose.model('Call', CallSchema);


require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) console.log('ERROR: ', err)
    else console.log('connected')
});

//Configure Body Pareser and Cookie Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(publicPath);

app.get('/', (req, res) => {
    res.sendFile(indexPath);
})

app.listen(port, function(){
  console.log(`Listening at http://localhost:${port}`);
});