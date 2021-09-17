const jwt = require('jsonwebtoken')

module.exports =  function (req, res, next) {
    const token = req.header('auth')

    if( !token ) return res.status(401).send('Access Denied')

    try{
        req.user = jwt.verify(token, 'partizan')
        next()

    }catch (error) {
        console.log(error)
        return res.status(401).send('Access denied')
    }

}
