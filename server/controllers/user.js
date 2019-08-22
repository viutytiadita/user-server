const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        console.log(req.body);

        User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone_number: req.body.phone_number,
            password: req.body.password
        })
            .then((newuser) => {
                res.status(201).json(newuser)
            })
            .catch(next)
    }

    static login(req, res, next) {
        console.log(req.body);

        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                throw err
            } else {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let obj = {
                            id: user._id,
                            email: user.email
                        }
                        res.json({ token: jwt.sign(obj) })

                    } else {
                        res.status(400).json({
                            message: "wrong password"
                        })
                    }
                } else {
                    res.status(400).json({
                        message: "username wrong"
                    })
                }
            }
        })
    }

    static updateProfile(req,res,next){
        User.findByIdAndUpdate(req.decoded.id, 
            {firstname, lastname, email, phone_number, password }, { runValidators: true, new: true })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
       
    }



}

module.exports = UserController