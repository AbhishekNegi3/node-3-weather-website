const request = require('postman-request')



const forecast = (latitude, longitude , callback)=>{
    const url = ('http://api.weatherstack.com/current?access_key=b016bfc23101ea8061017babb22d5c34&query='+latitude+','+longitude )
    request({url , json :true} , (error , {body})=>{
        if(error){
            callback('Unable to connect to forecast' , undefined)
        }
        else if(body.error){
            callback('Unable to find location. Try again', undefined)
        }
        else{
            callback(undefined , ` ${body.current.weather_descriptions[0]} .It is currently ${body.current.temperature} degress out . It feels like ${body.current.feelslike} degress out`)
        }
    })
}

module.exports= forecast