const mongoose = require('mongoose');
require('dotenv').config();

const url = `mongodb+srv://janice97:${process.env.DB_PASSWORD}@cluster0.tyylkcs.mongodb.net/?retryWrites=true&w=majority`
console.log("------>",url)

mongoose.connect(url)
.then(()=>{
    console.log('Conexion a la base de datos completada')
})
.catch((error)=>{console.error(error);})