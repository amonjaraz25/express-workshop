const express = require('express');
const pokemonRouter = express.Router();
const db = require('../config/database')

pokemonRouter.post('/', (req, res) => {
    res.send('Hi ' + req.body.name).status(200)
})

pokemonRouter.get('/', async (req, res) => {
    const pkmn = await db.query("SELECT * FROM pokemon")
    return res.status(200).json(pkmn)
})

pokemonRouter.get('/:id([0-9]{1,3})', (req,res) => {
    const id = req.params.id - 1
    if (id >= 0 && id <= 150) {
        return res.send(pokemon[req.params.id - 1]).status(200)
    }else {
        return res.send("Pokemon no encontrado").status(404)
    }
})

pokemonRouter.get('/:name([A-Za-z]+)', (req, res) => {
    const name = req.params.name
     
    const pk = pokemon.filter((p) => {
        return p.name.toUpperCase() == name.toUpperCase() && p
    })

    return res.status(200).send(pk)
})

module.exports = pokemonRouter