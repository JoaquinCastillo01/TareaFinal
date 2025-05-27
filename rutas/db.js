const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user:'root',
    password:'1234',
    database: 'animales',
    port: 3306
});

db.connect(err=>{
    if(err){
        console.error('Error en la conexion de la DB', err);
    }else{
        console.log('Conexion realizada de forma correcta');
    }
});

module.exports = db;