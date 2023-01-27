const express = require('express');
const app = express();
const env = require('./config/environment');
const port = env.port;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const db = require('./config/mongoose');
const session = require('express-session');     //used for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');


//sass middleware setup
if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css' 
    }));
}

//static path setup for css, js and images files
app.use(express.static(path.join(__dirname, env.asset_path)));
app.use(express.urlencoded({extended: false}));

//express layout setup
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// View Engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'socialapp',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongoUrl: `mongodb://127.0.0.1/${env.db}`,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup successful');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));





app.listen(port, (err)=>{
    if(err){
        console.log(`Error in starting server : ${err}`);return;
    }
    console.log(`Server is running at 127.0.0.1:${port}`);
});