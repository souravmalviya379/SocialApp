const express = require('express');
const app = express();
const env = require('./config/environment');
const port = env.port;

app.use('/', require('./routes'));

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in starting server : ${err}`);return;
    }
    console.log(`Server is running at 127.0.0.1:${port}`);
})