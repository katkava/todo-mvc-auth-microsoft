const mongoose = require('mongoose')
//requiring mongoose which is an ODM (Object Data Model ) which gives us access to structures and things like the schema, help define the shape of the documents in that collection. 

//2 things need to know here 

//1) connecting to our database with mongoose 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      //DB_string part here is important, getting our unique string. This is not memories but in mongo documentation 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
//below telling us if it's successful or not 
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB
