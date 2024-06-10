const express = require('express');
const app = express();
const path = require('path')


//estático 

app.use(express.static(path.join(__dirname,'static/stylesheets/')))


// Renderiza la página de inicio
app.get('/dashboard', (req, res)  =>{
	res.sendFile(path.join(__dirname,'static/stylesheets/index.html'))
})


// Levanta el servidor

app.listen(3000, (req, res) =>{
	console.log('Iniciando...');
});

