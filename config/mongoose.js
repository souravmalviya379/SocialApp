const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const env = require('./environment');

mongoose.connect('mongodb://127.0.0.1/'+env.db);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to DB'));

db.once('open', ()=>{
    console.log('Connection to DB successful !!');
});

module.exports = db;


