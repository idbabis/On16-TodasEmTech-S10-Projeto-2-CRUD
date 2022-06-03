const express = require("express")

const app = express() // executo o express

app.use(express.json())  // uso o body parser

// importar da continuação de rotas podcasts
const podRotas = require('./routes/podcastsRoutes')
const musicasRotas = require('./routes/musicasRoutes')

app.use("/podcast", podRotas) // crio uma rota raiz
app.use("/musicas", musicasRotas) 


// exportando para usar o server.js
module.exports = app


