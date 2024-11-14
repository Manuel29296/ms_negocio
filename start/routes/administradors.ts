import Route from '@ioc:Adonis/Core/Route'
Route.group(() =>{
    Route.get('/administradors', 'AdministradorsController.find')  
    Route.get('/administradors/:id', 'AdministradorsController.find') 
    Route.post('/administradors', 'AdministradorsController.create')   
    Route.put('/administradors/:id', 'AdministradorsController.update') 
    Route.delete('/administradors/:id', 'AdministradorsController.delete') 
})