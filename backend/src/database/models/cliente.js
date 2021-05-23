const mongoose = require('../../database')


const ClienteSchema = new mongoose.Schema({

    name: {
        type: String,
        required:true
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    telefone: {
        type: String,
        required: true,
    }
})

const Cliente = mongoose.model('Cliente', ClienteSchema)

module.exports= Cliente