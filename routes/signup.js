const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
    res.render('signup')
    console.log('signup')
})

router.post('/', async (req, res) => {
    const params = req.body
    const password = params.password
    const passwordHash = await bcrypt.hash(password, 5)

    const newUser = new User({
        email: params.email,
        passwordHash: passwordHash,
        name: params.name,
        contactPhone: params.contactPhone,
    })

    await newUser.save()
        .then(()=>{
            console.log('User saved')
        })

    res.redirect('signin')
})

module.exports = router
