import Route from '@ioc:Adonis/Core/Route'
Route.group(() =>{
    Route.get('/hotels/:id?', 'HotelsController.find')
    Route.post('/hotels', 'HotelsController.create')
    Route.put('/hotels/:id', 'HotelsController.update')
    Route.delete('/hotels/:id', 'HotelsController.delete')
})