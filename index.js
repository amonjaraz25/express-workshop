const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {pokemon} = require('./pokedex.json')

app.get('/', (req, res) => {
    return res.status(200).send("Bienvenido al pokedex")
})

app.post('/pokemon', (req, res) => {
    res.send('Hi ' + req.body.name).status(200)
})

app.get('/pokemon', (req, res) => {
    return res.send(pokemon).status(200)
})

app.get('/pokemon/:id([0-9]{1,3})', (req,res) => {
    const id = req.params.id - 1
    if (id >= 0 && id <= 150) {
        return res.send(pokemon[req.params.id - 1]).status(200)
    }else {
        return res.send("Pokemon no encontrado").status(404)
    }
})

app.get('/pokemon/:name([A-Za-z]+)', (req, res) => {
    const name = req.params.name
     
    const pk = pokemon.filter((p) => {
        return p.name.toUpperCase() == name.toUpperCase() && p
    })

    return res.status(200).send(pk)
})

app.listen(process.env.port || 3000, () => {
    console.log(`Example app listening on port 3000}`)
})