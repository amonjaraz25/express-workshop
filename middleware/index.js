module.exports = (req, res) => {
    return res.status(200).json({ code: 1, message: "Bienvenido al pokedex"})
}