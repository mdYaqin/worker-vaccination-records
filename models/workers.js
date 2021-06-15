const mongoose = require('mongoose')
const workersSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: Number, required: true },
    status: { type: String, required: true },

})

const WorkersModel = mongoose.model('Worker', workersSchema)

module.exports = {

    // bakedGoods : [
    //      { name: 'Mike', image: 'https://images.unsplash.com/photo-1529088746738-c4c0a152fb2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', address: 'Tuas View' , contact: 1234, status: 'Vaccinated'},
    //      { name: 'Ben', image: 'https://images.unsplash.com/photo-1529088746738-c4c0a152fb2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', address: 'Tuas View' , contact: 1234, status: 'Vaccinated'},
    //      { name: 'John', image: 'https://images.unsplash.com/photo-1529088746738-c4c0a152fb2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', address: 'Tuas View' , contact: 1234, status: 'Vaccinated'},
    //      { name: 'Adam', image: 'https://images.unsplash.com/photo-1529088746738-c4c0a152fb2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', address: 'Tuas View' , contact: 1234, status: 'Vaccinated'},
    //      { name: 'Ali', image: 'https://images.unsplash.com/photo-1529088746738-c4c0a152fb2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', address: 'Tuas View' , contact: 1234, status: 'Vaccinated'},
    //      { name: 'Aden', image: 'https://images.unsplash.com/photo-1529088746738-c4c0a152fb2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', address: 'Tuas View' , contact: 1234, status: 'Vaccinated'},
    //    ],
    WorkersModel: WorkersModel
}