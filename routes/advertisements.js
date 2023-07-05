const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('signup')
    console.log('advertisement')
})

module.exports = router