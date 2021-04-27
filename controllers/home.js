//rendering our homepage ejs 

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    }
}