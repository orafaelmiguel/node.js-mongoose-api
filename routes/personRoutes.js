const router = require('express').Router()
const Person = require('../models/Person')

// rotas da API

router.post('/', async (req, res) => {
    const {name, email, approved} = req.body

    if(!name) {
        res.status(422).json({
            error: 'Nome obrigatório'
        })
    }

    const person = {
        name,
        email,
        approved
    }

    try {
        await Person.create(person)
        
        res.status(201).json({
            message: 'Inserção no banco de dados completa'
        })
    } catch(error) {
        res.status(500).json({
            error: error,
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({
            _id: id
        })

        if(!person) {
            res.status(422).json({
                message: "O usuário não foi encontrado"
            })

            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

// att de dados

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {name, email, approved} = req.body

    const person = {
        name,
        email,
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({
                message: '[Usuário não foi encontrado]'
            })

            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

// fechamento de CRUD com delete de dados

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({
        _id: id
    })

    if(!person) {
        res.status(422).json({
            message: '[Usuário não foi encontrado]'
        })
    }

    try {
        
        await Person.deleteOne({
            _id: id
        })
        res.status(200).json({
            message: 'Usuário removido com sucesso'
        })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

module.exports = router
