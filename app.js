const express= require('express');
const path = require('path');
const routes = require('./rutas/LN');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.static(path.join(__dirname,"public")));
app.use('/', routes);

const port = 3911;

app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`);
});
