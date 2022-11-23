const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const usersRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const app = express();

app.use(session({
    secret: 'web-authn-secret',
    name: 'web-authn-completed-app',
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', usersRouter);
app.use('/api/auth', authRouter);

module.exports = app;
