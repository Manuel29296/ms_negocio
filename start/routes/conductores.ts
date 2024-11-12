import Route from '@ioc:Adonis/Core/Route'
Route.group(() =>{
    Route.get('/conductors', 'ConductorsController.find')                      
    Route.get('/conductors/:id', 'ConductorsController.find')                  
    Route.post('/conductors', 'ConductorsController.create')                    
    Route.put('/conductors/:id', 'ConductorsController.update')                 
    Route.delete('/conductors/:id', 'ConductorsController.delete')
})