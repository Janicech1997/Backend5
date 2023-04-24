const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('./db/mongodb')
const users = require("./apis/users");
const apiRoutes = require('./apis/index')
const bodyParser = require('body-parser');


app.use(cors())
//app.use(express.json())
app.use(bodyParser.json());
app.use('/api/v1', apiRoutes)


app.get('/', (req,res)=>{
    res.send('Servidor vivo')
})

const PUERTO = process.env.PUERTO || 5000

app.use('/users', users)

app.listen(PUERTO, ()=>{
    console.log(`Servidor conectado en puerto ${PUERTO}`)
})

