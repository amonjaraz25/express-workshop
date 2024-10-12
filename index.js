// Dependencies
const express = require('express')
const app = express()
const morgan = require("morgan")
// Routers
const pokemonRouter = require('./routes/pokemon')
const user = require('./routes/user')
//Middleware
const auth = require('./middleware/auth')
const notFound = require('./middleware/notFound')
const index = require('./middleware/index')

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', index)

app.use('/user', user)

app.use(auth)

app.use("/pokemon", pokemonRouter)

app.use(notFound)

app.listen(process.env.port || 3000, () => {
    console.log(`Example app listening on port 3000`)
})