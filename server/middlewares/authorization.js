const Article = require('../models/article')

function authorization(req, res, next) {
    Article.findById(req.params.articleid)
        .then((data) => {
            if (data.user_id == req.decoded.id) {
                next()
            }else{
                console.log("you are not authorized")
            }
        })
        .catch((err) => {
            console.log(err)
            res.send(401).json({
                message: " you are not authorized"
            })
        })
}

module.exports = { authorization }