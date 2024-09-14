const express = require('express')
const app = express()
const morgan = require("morgan")
const pokemonRouter = require('./routes/pokemon')

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.status(200).send("Bienvenido al pokedex")
})

app.use("/pokemon", pokemonRouter)

app.listen(process.env.port || 3000, () => {
    console.log(`Example app listening on port 3000}`)
})