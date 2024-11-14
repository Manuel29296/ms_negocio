import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/persona-naturals', 'PersonaNaturalsController.find')            
    Route.get('/persona-naturals/:id', 'PersonaNaturalsController.find')        
    Route.post('/persona-naturals', 'PersonaNaturalsController.create')         
    Route.put('/persona-naturals/:id', 'PersonaNaturalsController.update')      
    Route.delete('/persona-naturals/:id', 'PersonaNaturalsController.delete')  
})
