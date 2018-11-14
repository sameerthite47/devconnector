const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys').secretOrKey;
const passport = require('passport');
const _ = require('lodash');
const router = express.Router();

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load user model
const User = require('../../models/User');

router.get('/test', (req, res) => {
    res.send({name:'Test'});
});

//@Route    POST /api/users/register
//@Desc     Register User
//@Access   Public
router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then( user => {
            if (user) {
                errors.email = 'Email already exists.';
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //Size
                    r: 'pg', //Rating
                    d: 'mm' //Default
                });

                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password:req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

//@Route    POST /api/users/login
//@Desc     Login User / Returning JWT Token
//@Access   Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email })
        .then(user => {
            //Check for user
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //User matched
                        const payload = { id:user.id, name:user.name, avatar:user.avatar } //Create jwt payload
                        //Sign token
                        jwt.sign(payload, keys, { expiresIn:3600 }, (err, token) => {
                            res.json({
                                success:true,
                                token: 'Bearer ' + token
                            })
                        });
                    } else {
                        errors.password = 'Incorrect password'
                        return res.status(400).json(errors);
                    }
                });
        })
});

//@Route    GET /api/users/current
//@Desc     Return current user
//@Access   Private
router.get('/current', passport.authenticate('jwt', { session:false }), (req, res) => {
    res.json(_.pick(req.user, ['id', 'name', 'email', 'avatar']));
});

module.exports = router;