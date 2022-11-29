const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const usersRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const loginRouter = require('./routes/login');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
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
app.use((req, res, next) => {
    process.env.HOSTNAME = req.headers.host;
    const protocol = /^localhost/.test(process.env.HOSTNAME) ? 'http' : 'https';
    // TODO: why req.headers.origin can not be use?
    process.env.ORIGIN = req.headers.origin || `${protocol}://${process.env.HOSTNAME}`;
    if (req.get('x-forwarded-proto') && req.get('x-forwarded-proto').split(',')[0] !== 'https') {
        return res.redirect(301, process.env.ORIGIN);
    }
    req.schema = 'https';
    next();
});

app.use('/api/user', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api', loginRouter);

const port = 3001;
const listener = app.listen(port || process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;
