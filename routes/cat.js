const express = require('express')
const database = require('../server_db')
const router = express.Router()

router.get('/cat', function(req, res) {
  res.render('cat', { title: 'Hello World!' })
})

// Create
router.get('/add_categoria/:id',function(req, res) {
    res.render('add_categoria')
}) 

router.post('/add_categoria/:id', function(req, res) {
  database.serialize(()=> {
    database.run('INSERT INTO categorias(id, categoria) VALUES(? ?)', [req.params.id, req.params.categoria], function (err) {
      if (err) {
        return console.error(err.message)
      }

      console.log("Se ha agregado una nueva categoria")

      res.redirect('categoria')
    })
  })
})


// Read
router.get('/categoria/:id', function(req, res) {
  database.serialize(() => {
    database.each('SELECT categoria FROM categorias WHERE id = ? ', [req.params.id], function(err, row) {
      if (err) {
        return console.error(err.message)
      }

      console.log("Ver Categorias")

      res.render('categoria', {models: row})
    })
  })
})


// Update
router.get('/update_categoria/:id', function(req, res) {
  res.render('update_categoria.ejs')
})

router.post('/update_categoria/:id', function(req, res) {
  database.serialize(() => {
    database.run('UPDATE categorias SET categoria = ? WHERE id = ?', [req.params.id], function(err) {
      if (err) {
        return console.error(err.message)
      }

      console.log("Categoria actualizada correctamente")

      res.redirect('categoria')
    })
  })
})

// Delete
router.get('/delete/:id', function (req, res) { 
  database.serialize(() => {
    database.run('DELETE FROM categorias WHERE id = ?', req.params.id, function(err) {
      if (err) {
        return console.error(err.message)
      }

      console.log("Categoria Eliminada")

      res.render('categoria')
    })
  })
})


// Se finaliza la conexión de la base de datos

router.get('/close', function(req, res) {
  database.close((err) => {
    if (err) {
      return console.error('err.message')
    }
    console.log('Cerrando la conexión...')

    res.send('Conexión cerrada')
  })
})

module.exports = router;
