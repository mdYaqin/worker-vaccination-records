require('dotenv').config()
const mongoose = require('mongoose')
const _ = require('lodash')
const {WorkersModel} = require('../models/workers')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
let data = [
     { name: 'Mike Myers', image: 'https://images.unsplash.com/photo-1529088746738-c4c0a152fb2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', address: 'Tuas View' , contact: 1234, status: 'Vaccinated'},
     { name: 'Ben Ten', image: 'https://images.unsplash.com/photo-1529088746738-c4c0a152fb2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', address: 'Tuas View' , contact: 1234, status: 'Vaccinated'},
     { name: 'John Smith', image: 'https://images.unsplash.com/photo-1529088746738-c4c0a152fb2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', address: 'Tuas View' , contact: 1234, status: 'Vaccinated'},
     { name: 'Adam Lambert', image: 'https://images.unsplash.com/photo-1529088746738-c4c0a152fb2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', address: 'Tuas View' , contact: 1234, status: 'Vaccinated'},
     { name: 'Ali Daei', image: 'https://images.unsplash.com/photo-1529088746738-c4c0a152fb2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', address: 'Tuas View' , contact: 1234, status: 'Vaccinated'},
     { name: 'Aden Caine', image: 'https://images.unsplash.com/photo-1529088746738-c4c0a152fb2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', address: 'Tuas View' , contact: 1234, status: 'Vaccinated'},
   ]

   data = data.map( item => {
        item.slug = _.kebabCase(item.name)
        return item
   })

let connection = null

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
       connection = connResp

 return WorkersModel.insertMany((data))
       
  })
  .then(insertResp => {
       console.log('successful data insertion')
  })
  .catch (err => {
       console.log(err)
  })
  .finally(() => {
       if(connection !== null) {
            connection.disconnect()
       }
  })
