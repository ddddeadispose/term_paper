const express = require('express')
const router = express.Router()
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, passwordHash, done) => {
            try {
                const user = await User.findOne({ email })
                if (!user) {
                    return done(null, false, { message: 'Incorrect email.' })
                }

                const isPasswordMatch = await bcrypt.compare(passwordHash, user.passwordHash)

                if (!isPasswordMatch) {
                    return done(null, false, { message: 'Incorrect password.' })
                }

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

router.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
    })
)
router.use(passport.initialize())
router.use(passport.session())

router.get('/', async (req, res) => {
    res.render('signin')
    console.log('signin')
})

//Потом можно убрать, в требованиях этого нет
router.post('/',
    passport.authenticate('local', { failureRedirect: 'signup' }),
    (req, res) => {
        console.log("req.user: ", req.user)
        res.redirect('signin/home')
    }
)

router.get('/home', (req, res) => {
    console.log('Home')
    if(!req.user) {
        res.redirect('signin')
    } else {
        res.render('home', { user: req.user})
    }
})

router.get('/logout',  (req, res) => {
    req.logout(()=>{
        res.redirect('/api/signin')
    })
})

module.exports = router