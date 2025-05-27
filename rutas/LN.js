const express = require('express');
const db = require('./db')
const router = express.Router();

//Mostrar lista de mascotas
router.get('/', (req, res) => {
    const consultaDB = 'SELECT * FROM mascotas';
    db.query(consultaDB, (err, results) => {
        if (err) {
            console.error('Error al recuperar datos de la DB', err);
            res.send('Error, no se recuperan los datos de la DB');
        } else {
            res.render('index', { mascotas: results });
        }
    });
});

//Modulo para agregar nuevos registros
router.post('/add',(req, res)=>{
    const {nombre, edad, especie, raza}=req.body;
    const insertarRegistro='INSERT INTO mascotas (nombre, edad, especie, raza) VALUES (?,?,?,?)';
    db.query(insertarRegistro,[nombre, edad, especie, raza], (err)=>{
        if(err){
            console.error('Error al agregar mascota:', err);
            res.send('Error');
        }else{
            res.redirect('/');
        }
   });
});

//Modulo para editar registro
router.get('/editar/:id', (req, res) => {
    const {id} = req.params;
    const buscarMascotaID = 'SELECT * FROM mascotas WHERE id = ?';

    db.query(buscarMascotaID, [id], (err, results) => {
        if (err) {
            console.error('Error en la DB', err);
        } else {
            res.render('editar',{user:results[0]});
        }
    });
});

router.post('/update/:id',(req,res)=>{
    const {id} = req.params;
    const {nombre, edad, especie, raza} = req.body;

    const query = "UPDATE mascotas SET nombre = ?, edad = ?, especie = ?, raza = ? WHERE id = ?";
    db.query(query,[nombre, edad, especie, raza, id],(err)=>{
        if(err){
            console.error('error',err);
        }else{
            res.redirect('/');
        }
    });
});

//Eliminar registro
router.get('/delete/:id',(req,res)=>{
    const {id} = req.params;
    const eliminarMascotaId ='DELETE FROM mascotas WHERE id = ?';
    db.query(eliminarMascotaId,[id],(err)=>{
        if(err){
            console.error('Error al eliminar en la DB', err);
        }else{
            res.redirect('/');
        }
    });
});

//pagina principal
router.get("/",(req, res)=>{
    res.render('index');
});

//pagina agregar registro
router.get("/agregar",(req, res)=>{
    res.render('agregar');
});

//pagina editar registro
router.get("/editar",(req, res)=>{
    res.render('editar');
});

module.exports=router;