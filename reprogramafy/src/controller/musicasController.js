const { response } = require('express')
const musicas = require('../models/musicas.json')

const getAllMusicas = (request, response) => {
    try {
        response.status(200).json([{
            "Musicas": musicas
        }])
    } catch (err) {
        response.status(500).send({ message: "Erro no server" })
    }
}

const getId = (req, res) => {
    let idRequest = req.params.id

    let idFiltro = musicas.filter(musicas => musicas.id == idRequest)

    if (idFiltro.length > 0) {
        res.status(200).send(idFiltro)
    } else {
        res.status(404).send([{ message: "Música não encontrada" }])
    }

}


const getArtist = (request, response) => {

    let artistaRequest = request.query.artists.toLowerCase();

    let musicFound = musicasJson.filter((musica) => {
        artistasLowerCase = musica.musicasJson.map((artistasArray) =>
            artistasArray.toLowerCase()
        );

        return artistasLowerCase.includes(artistaRequest);

    });
    console.log(musicFound)
    if (musicFound.length > 0) {
        response.status(200).send(musicFound);
    } else {
        response.status(404).send([
            {
                "message": "Artista não encontrado",
            },

        ]);
    }


};

 

const addMusicas = (request, response) => {
    try{
    let titleRequest = request.body.title
    let launchYearRequest = request.body.launchYear
    let favoritedRequest = request.body.favorited
    let artistsRequest = request.body.artists

    let newMusic = {
        id:Math.floor(Date.now() * Math.random()).toString(36),
        title: titleRequest,
        launchYear: launchYearRequest,
        favorited: favoritedRequest,
        artists: artistsRequest,

    }
musicas.push(newMusic)
response.status(201).json([{
    "message": "Nova música cadastrada",
    newMusic
}])

} catch (err){
    console.log(err)
    response.status(500).send([{
        "message": "Erro interno ao cadastrar a música",
    }])
}}

const updateNew = (request, response) => {

    const idRequest = request.params.id
    let musicasRequest = request.body

    let indexEncontrado = musicas.findIndex( musicas => musicas.id == idRequest)

    musicas.splice(indexEncontrado, 1 , musicasRequest)

    response.status(200).json([
        {
        "message": "Música atualizado, será que foi ?" ,
        musicas
        }
])
}

const deleteMusic = (request, response) => {

    const idRequest = request.params.id

    const indiceMusicas = musicas.findIndex(musicas => musicas.id == idRequest)

    musicas.splice(indiceMusicas, 1)

    response.status(200).json([{
        "message": " Música deletada, acho que foi",
        "deletado": idRequest,
        musicas
    }])

}

const favoritarMusic = (request, response) =>{
    const idRequest = request.params.id
    const favoritedRequest = request.body.favorited

    favoritedFilter = musicas.find((music => music.id == idRequest ))


    if(favoritedFilter){
        favoritedFilter.favorited = favoritedRequest
        response.status(200).json([{

            message: "Musica favoritada. Mandou bem !!!",
            musicas
        }])


    }else{
        response.status(404).json([{

            message:"Não foi atualizada, vixxi e agora? "
        }])
    }
}




module.exports = {
    getAllMusicas,
    getId,
    getArtist,
    addMusicas, 
    updateNew,
    deleteMusic,
    favoritarMusic,

};
