const express = require('express')
const app = express()
const mongoose = require('mongoose')

const signin = require('./routes/signin')
const signup = require('./routes/signup')
const advertisement = require('./routes/advertisements')

const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://127.0.0.1:27017/term_paper')
    .then(()=>{
        console.log('Connected to data base')
        app.listen(PORT)
        console.log(`App listen ${PORT}`)
    })

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))


app.use('/api/signin', signin)

app.use('/api/signup', signup)

app.use('/api/advertisement', advertisement)