//handlers 
const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//middleware -> the only thing we need to check is someone is logged in. if someone goes to /todos, they only way they're going to do it is after the ensureAuth runs. Go to our middleware folder -> auth.js 
router.get('/', ensureAuth, todosController.getTodos)

//redirecting to to todosController and creating a todo with post. 
router.post('/createTodo', todosController.createTodo)

//our update request, redirected to todosController and running function markComplete 
router.put('/markComplete', todosController.markComplete)

//update, redirecting and running markIncomplete if it's not finished 
router.put('/markIncomplete', todosController.markIncomplete)

//redirecting to todosController, running deleteTodo and deleting the document. 
router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router