const Todo = require('../models/Todo')
module.exports = {
    getTodos: async (req,res)=>{
        //this is what gets our todos to load on the page. Get request. 
        console.log(req.user)
        try{
            const todoItems = await Todo.find()
            //find to do
            const itemsLeft = await Todo.countDocuments({microsoftId: req.user.microsoftId, completed: false})
            //how many non completed items are left per the logged in user. Looking at request being sent which has a user property with microsoftId. Can find documents where it matches. I'm only going to count the documents where the microsoftId matches the logged in user. 
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    //creating our todos
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, microsoftId: req.user.microsoftId})
            //todo added based on microsoftId for individual user. 
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            //adding to completed, find if the todo matches the parameters. Mark it as completed 
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            //checking if it's not completed, if it matches the parameters. 
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            //false, so it's not completed 
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    //deleting my todo 
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            //check if it matches parameters 
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    