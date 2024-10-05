const express = require('express');
const pokemonRouter = express.Router();
const db = require('../config/database')

pokemonRouter.post('/', async (req, res) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body

    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)"
        query += ` VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Pokemon creado exitosamente" })
        }

        return res.status(500).json({ code: 500, message: "Ocurrio un error" })
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" })
})

pokemonRouter.delete("/:id([0-9]{1,3})", async (req, res) => {
    const query = `DELETE FROM pokemon WHERE pok_id = ${req.params.id}`
    const rows = await db.query(query)

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Pokemon eliminado correctamente" })
    }
    return res.status(404).json({ code: 404, message: "Pokemon no encontrado" })

})

pokemonRouter.put("/:id([0-9]{1,3})", async (req, res) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body


    if (pok_name && pok_height && pok_weight && pok_base_experience) {

        let query = `UPDATE pokemon SET pok_name='${pok_name}',
        pok_height=${pok_height},pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id}`

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Pokemon actualizado exitosamente" })
        }

        return res.status(500).json({ code: 500, message: "Ocurrio un error" })
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" })
})

pokemonRouter.patch("/:id([0-9]{1,3})", async (req, res) => {


    if(req.body.pok_name) {
        let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id=${req.params.id}`

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Pokemon actualizado exitosamente" })
        }
        return res.send(500).json({code: 500, message: "Ocurrio un error"})
    }
    return res.send(500).json({code: 500, message: "Campos incompletos"})


})

pokemonRouter.get('/', async (req, res) => {
    const pkmn = await db.query("SELECT * FROM pokemon")
    return res.status(200).json({ code: 200, message: pkmn })
})

pokemonRouter.get('/:id([0-9]{1,3})', async (req, res) => {
    const id = req.params.id - 1
    if (id >= 1 && id <= 722) {
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id=" + id + ";")
        return res.status(200).json({ code: 200, message: pkmn })
    }
    return res.status(404).json({ code: 404, message: "Pokemon no encontrado" })
})

pokemonRouter.get('/:name([A-Za-z]+)', async (req, res) => {
    const name = req.params.name
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name=" + name + ";")

    if (pkmn.length > 0) {
        return res.status(200).json({ code: 200, message: pkmn })
    }
    return res.status(404).json({ code: 404, message: "Pokemon no encontrado" })

})

module.exports = pokemonRouter