module.exports = restricted


function restricted(req, res, next) {
    req.session && req.session.username
        ? next()
        : res.status(400).json({
            message: 'You must login to access this page.'
        })
}