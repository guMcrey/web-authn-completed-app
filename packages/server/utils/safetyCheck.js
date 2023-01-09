const sessionCheck = (req, res, next) => {
    if (req.session['signed-in'] !== 'yes') {
        return res.status(200).send({
            code: 401,
            data: {},
            message: 'not signed in.'
        });
    }
    next();
}

module.exports = {
    sessionCheck
}