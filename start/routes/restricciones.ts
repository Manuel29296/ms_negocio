import Route from '@ioc:Adonis/Core/Route'
Route.group(() =>{               
    Route.post('/restricciones', 'RestriccionesController.create')                                  
    Route.delete('/restricciones/:id', 'RestriccionesController.delete')
})