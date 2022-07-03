require('dotenv').config()

express = require('express')
const app = express()
const mongoose = require('mongoose')
const personRouter = require('./routes/personRoutes')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use('/person', personRouter)

// leitura JSON com middleware

app.get('/', (req, res) => {
    res.json({
        message: 'Express',
    })
})

// Conexão banco de dados

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.wjdxcye.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('Conexão com banco de dados estabelecida.')
    app.listen(3333)
})
.catch((err) => {console.dir(err)})