const { response } = require('express')
const podcasts = require('../models/podcasts.json')

//retorna todos os pods  sem erros
//const getAllPods = (request, response) => {
//response.status(200).json([{
//"Podcasts": podcasts
//}])
//}

//module.exports = {
//getAllPods
//}

// retorna todos os pods com erros
const getAllPods = (request, response) => {
    try {
        response.status(200).json([{
            "Podcasts": podcasts
        }])
    } catch (err) {
        response.status(500).send({ message: "Erro no server" })
    }
}
    const getPodByTopic = (req, res) => {
        let topicRequest = req.query.topic
    
        let topicFiltro = podcasts.filter(podcasts => podcasts.topic.includes(topicRequest))
    
        if (topicFiltro.length > 0) {
            res.status(200).send(topicFiltro)
        } else {
            res.status(404).send([{ message: "Tópico não encontrado" }])
        } 

    }
    

    // cria podcast
const addPods = (request, response) => {
    try{
    let nameRequest = request.body.name
    let podcasterRequest = request.body.podcaster
    let topicRequest = request.body.topic
    let starsRequest = request.body.stars

    let newPodcast = {
        id:Math.floor(Date.now() * Math.random()).toString(36),
        name: nameRequest,
        podcaster: podcasterRequest,
        topic:  topicRequest,
        stars: starsRequest,

    }
podcasts.push(newPodcast)
response.status(201).json([{
    "message": "Novo podcast cadastrado",
    newPodcast
}])

} catch (err){
    console.log(err)
    response.status(500).send([{
        "message": "Erro interno ao cadastrar",
    }])
}}

const atualizarPods = (request, response) => {
    const idRequest = request.params.id
    const starsRequest = request.body.stars
    starsFilter = podcasts.find((podcast) => podcast.id == idRequest)

    if (starsFilter){
        starsFilter.stars = starsRequest
        response.status(200).json([{
            "message": "Classificação atualizada com sucesso",
            podcasts
        }])
    }else{
        response.status(404).json([{
            "message": "Não foi modificado",
        }])
    }

}

const deletePods = (request, response) => {

    const idRequest = request.params.id

    const indicePodcasts = podcasts.findIndex(podcasts => podcasts.id == idRequest)

    podcasts.splice(indicePodcasts, 1)

    response.status(200).json([{
        "message": " Podcast deletado, acho que foi",
        "deletado": idRequest,
        podcasts,
    }])

}


module.exports = {
    getAllPods,
    getPodByTopic, 
    addPods, 
    atualizarPods,
    deletePods,
};





