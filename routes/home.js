const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

//rendering our homepage. 

router.get('/', homeController.getIndex) 

module.exports = router