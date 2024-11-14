import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/clientes/:id?', 'ClientesController.find') // Buscar cliente por ID o listar todos
    Route.post('/clientes', 'ClientesController.create') // Crear un nuevo cliente
    Route.put('/clientes/:id', 'ClientesController.update') // Actualizar un cliente existente
    Route.delete('/clientes/:id', 'ClientesController.delete') // Eliminar un cliente
})
