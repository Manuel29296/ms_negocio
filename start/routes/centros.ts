import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/centros', 'CentrosController.find')                       // Obtener todos los centros
    Route.get('/centros/:id', 'CentrosController.find')                   // Obtener un centro por ID
    Route.post('/centros', 'CentrosController.create')                    // Crear un nuevo centro
    Route.put('/centros/:id', 'CentrosController.update')                  // Actualizar un centro por ID
    Route.delete('/centros/:id', 'CentrosController.delete')              // Eliminar un centro por ID
})
