const express = require('express');
const Itens = require('../models/itens');

const User = require('../models/user');
const Cliente = require('../models/cliente');

const router = express.Router();

router.post('/registro', async (req, res) => {
    try {
        const user = await User.create(req.body);

        return res.send({ user })
    }
    catch (err) {
        return res.status(400).send({ error: 'Erro ao Cadastrar User' })
    }
})

router.post('/itens', async (req, res) => {
    try {
        const itens = await Itens.create(req.body);
        return res.send({ itens })
    }
    catch (err) {
        return res.status(400).send({ error: 'Error ao Cadastrar Itens' })
    }
})

router.get('/users', async (req, res) => {
    try {
        const user = await User.find();
        return res.send({ user })
    }
    catch (err) {
        return res.status(400).send({ error: 'Error ao retorna' })
    }
})

router.post('/users', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password })
        if (user == null) {
            return res.status(400).send({ error: 'Verifique user e senha' })
        }
        return res.send({msg: "Login Sucesso"})
    }
    catch (err) {
        return res.status(400).send({ error: 'Verifique user e senha' })
    }
})

router.post('/cliente', async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        return res.send({ cliente })
    }
    catch (err) {
        return res.status(400).send({ error: 'Error ao Cadastrar Cliente' })
    }
})

router.get('/itens', async (req, res) => {
    try {
        const itens = await Itens.find();
        return res.send({ itens })
    }
    catch (err) {
        return res.status(400).send({ error: "Erro ao retorna Item" })
    }
})

router.get('/cliente', async (req, res) => {
    try {
        const cliente = await Cliente.find();
        return res.send({ cliente })
    }
    catch (err) {
        return res.status(400).send({ error: "Erro ao retorna Cliente" })
    }
})

router.delete('/itens/:id', async (req, res) => {
    try {
        const itens = await Itens.findOneAndDelete({ _id: req.params.id });
        return res.send({ itens })
    }
    catch (err) {
        return res.status(400).send({ err: err })
    }
})

router.delete('/cliente/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findOneAndDelete({ _id: req.params.id });
        return res.send({ cliente })
    }
    catch (err) {
        return res.status(400).send({ err: err })
    }
})


router.get('/itens/:id', async (req, res) => {
    try {
        const itens = await Itens.findById(req.params.id);
        return res.send({ itens })
    }
    catch (err) {
        return res.status(400).send({ err: err })
    }
})

router.get('/cliente/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        return res.send({ cliente })
    }
    catch (err) {
        return res.status(400).send({ err: err })
    }
})

router.put('/itens/:id', async (req, res) => {
    try {
        const itens = await Itens.findByIdAndUpdate(req.params.id, req.body);
        return res.send({ itens })
    }
    catch (err) {
        return res.status(400).send({ err: err })
    }
})

router.put('/cliente/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body);
        return res.send({ cliente })
    }
    catch (err) {
        return res.status(400).send({ err: err })
    }
})




module.exports = app => app.use('/auth', router);