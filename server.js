const path = require('path');
const express = require('express');
const session = require('express-session');
const exhbs = require('express-handlebars');
const routes = require('./controllers');

const app = express();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Inform Express.js on which template engine to use
const hbs = exhbs.create({})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


app.use(routes);



sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});



