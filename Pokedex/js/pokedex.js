window.onload = init

var headers = {}
var url = "http://localhost:3000"

function init() {
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')
        headers = {
            headers: {
                'Authorization': 'bearer' + localStorage.getItem('token')
            }
        }
        loadPokemon()
    }else {
        window.location.href = "index.html"
    }
}

function loadPokemon() {
    axios.get(url + '/pokemon').then(function(res) {
        displayPokemon(res.data.message)

    }).catch(function(err) {

    })
}

function displayPokemon(pokemon) {
    var body = document.querySelector('body')
    for (var i = 0; i < pokemon.length; i++) {
        body.innerHTML += `<h3>${pokemon[i].pok_name}</h3>`

    }
}