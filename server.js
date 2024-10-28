const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')

// const Handlebars = require('handlebars');


const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const client = require('./config/connection');
const controllers = require('./controllers');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create({});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))


// turn on routes

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        store: new SequelizeStore({
            db: client,
        }),
        saveUninitialized: false,
        resave: false, // we support the touch method so per the express-session docs this should be set to false
        // proxy: true, // if you do SSL outside of node.
        // Only send a cookie that cannot be accessed by Browser JS
        cookie: {
            httpOnly: true
        }
    })
);


app.use('/', controllers);


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
