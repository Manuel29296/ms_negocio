import Route from '@ioc:Adonis/Core/Route'
Route.group(() =>{
    Route.get('/categoria-productos', 'CategoriaProductosController.find')  
    Route.get('/categoria-productos/:id', 'CategoriaProductosController.find') 
    Route.post('/categoria-productos', 'CategoriaProductosController.create')   
    Route.put('/categoria-productos/:id', 'CategoriaProductosController.update') 
    Route.delete('/categoria-productos/:id', 'CategoriaProductosController.delete') 
})