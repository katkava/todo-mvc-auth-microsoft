//our handlers _ server Setup  

const express = require('express')
const app = express()
//requiring express to separate our code out thanks to HTTP 
const mongoose = require('mongoose')
//requiring mongoose, no longer using mongoClient 
const passport = require('passport')
//passport for authentication from Microsoft 
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
//setting up our sessions above which allow the user to stay logged in 
const connectDB = require('./config/database')
//connecting to DB and route 
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')
//separating our code and the request gets to the right path. Requestion for homepage, requests for todos and requests for authentication. 


require('dotenv').config({path: './config/.env'})
//setting my environment variables with path

// Passport config
require('./config/passport')(passport)
//requiring passport - and pathway. Spitting out a function because of the (passport)

connectDB()
//calling for our database file. Correlates to our Config -> database.js  


//Middleware for ejs ? Generating a static file with ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))
//Leon's fav line => any static file we put in this folder, express will serve it up for us without us having to find routes etc. No need for individual routes
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//above lines, looking at data sent with our request. Get response from the client form and are used instead of bodyparsers. Serving up some json. 

// Setting up session and Passport which is authentication middleware for Node.js. 
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      //storing each of our sessions in our MongoDB. to keep them logged in 
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

  //Middleware for our routes. 
app.use('/', homeRoutes)
//generic route like 2121, get send here
app.use('/auth', authRoutes)
//if it's an auth request, sent here
app.use('/todos', todoRoutes)
//anything to todos, get sent here. 
//not putting our controllers here to make code more dry. 
 
//server is listening 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    