const express = require("express");
const controller = require('../controller/musicasController');
const router = express.Router();

router.get('/todas', controller.getAllMusicas)
router.get('/:id', controller.getId)
router.get('/:id', controller.getArtist)
router.post('/cadastrar', controller.addMusicas)
router.put('/atualiza/:id', controller.updateNew)
router.delete('/remove/:id', controller.deleteMusic)
router.patch('/favoritar/:id', controller.favoritarMusic)

 

module.exports = router

