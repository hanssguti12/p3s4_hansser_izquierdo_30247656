const express = require('express')
const bd = require('../server_db')
const router = express.Router()

router.get('/prod', function(req, res) {
  res.render('prod', { title: 'Hello World!' })
})

// Create
router.get('/add/:id', function(req, res) {
  bd.serialize(()=> {
    bd.run('INSERT INTO productos(id, codigo, producto, categoria_id, existencia_actual, precio) VALUES(? ? ? ? ? ?)', [req.params.id, req.params.codigo, req.params.producto, req.params.categoria_id, req.params.existencia_actual, req.params.precio], function (err) {
      if (err) {
        return console.error(err.message)
      }

      console.log("Se ha agregado un nuevo producto")

      res.render('add')
    })
  })
}) 


// Read
router.get('/producto/:id', function(req, res) {
  bd.serialize(() => {
    bd.each('SELECT * FROM productos WHERE id = ? ', [req.params.id], function(err, row) {
      if (err) {
        return console.error(err.message)
      }

      console.log("Ver Productos")

      res.render('producto', {models: row})

    })
  })
})

// Update
router.get('/update/:id', function (req, res) {
  bd.serialize(() => {
    bd.run('UPDATE productos SET codigo = ?, producto = ?, existencia_actual = ?, precio = ? WHERE id = ?', [req.params.id], function(err) {
      if (err) {
        return console.error(err.message)
      }

      console.log("Producto actualizado correctamente")

      res.render('update')
    })
  })
})

// Delete
router.get('/delete/:id', function (req, res) { 
  bd.serialize(() => {
    bd.run('DELETE FROM categorias WHERE id = ?', req.params.id, function(err) {
      if (err) {
        return console.error(err.message)
      }

      console.log("Producto Eliminado")

      res.render('producto')
    })
  })
})



// Se finaliza la conexión de la base de datos

router.get('/close', function(req, res) {
  bd.close((err) => {
    if (err) {
      return console.error('err.message')
    }
    console.log('Cerrando la conexión...')

    res.send('Conexión cerrada')
  })
})

module.exports = router;

