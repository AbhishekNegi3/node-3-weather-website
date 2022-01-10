
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() ;
const port = process.env.PORT || 3000

//DEFINE PATH FOR EXPRESS CONFIG

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname ,'../templates/partials')

//SETUP HANDLEBAR ENGINES AND VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))


app.get('' , (req, res) => {
    res.render('index' , {
        title : 'Weather app',
        name : 'abhishek'
    })
})

app.get('/about' , (req,res) => {
    res.render('about' , {
        title : 'About page ' ,
        name : 'kamal negi'
    })
})

app.get('/help' , (req , res) => {
    res.render('help' , {
        title : 'Help page' ,
        name : 'abhishek Negi'
    })
})

app.get('/weather' , (req ,res) => {
    if(!req.query.address){
       return res.send({
            error : "You must provide a search "
        })
    }

    geocode(req.query.address, (error , {longitude , latitude , location}={}) =>{
        if(error){
            return res.send({error})
        }

        forecast(longitude , latitude , (error ,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData ,
                location ,
                address : req.query.address

            })    
           
        })
    })
})
app.get('*' , (req,res) => {
    res.render('404' , {
        title : '404' ,
        name : 'abhishek',
        errorMessage : "page not found"
    })
})



app.listen(port, ()=>{
    console.log('Server is up on port ' + port )
})
