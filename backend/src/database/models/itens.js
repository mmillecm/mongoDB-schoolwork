const mongoose = require('../../database')

const ItensSchema = new mongoose.Schema({

    codigo: {
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String,
        required: true
    },

    preco:{
        type: Number,
        required:true
    },

    createdAt: {
        type:Date, 
        default:Date.now
    }

})

const Itens = mongoose.model('Itens', ItensSchema)

module.exports= Itens