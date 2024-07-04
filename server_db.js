const sqlite3 = require('sqlite3').verbose()

// Conexión y creación de las tablas a la Base de Datos

let db = new sqlite3.Database('sqlite3.db.', (err) => {
	if (err) {
		return console.error('Error de conexión', err.message)
	}

	console.log('Conexión exitosa a la Base de Datos')

	// Creación Tabla Categoría
	db.run(`CREATE TABLE IF NOT EXISTS categorias(id INTEGER PRIMARY KEY AUTOINCREMENT, categoria TEXT)`, (err) => {
		if (err) {
			return console.error('No se pudo crear la Tabla categorias', err.message)
		}

		console.log('Tabla categorias creada exitosamente')

	})

	// Creación Tabla Producto
	db.run(`CREATE TABLE IF NOT EXISTS productos(id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT, producto TEXT, categoria_id INTEGER, existencia_actual INTEGER, precio REAL, FOREIGN KEY (categoria_id) REFERENCES categorias(id) )`, (err) => {
		if (err) {
			return console.error('No se pudo crear la Tabla categorias', err.message)
		}

		console.log('Tabla categorias creada exitosamente')
	})

})


