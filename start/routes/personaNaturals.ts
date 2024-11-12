import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', 'PersonaNaturalsController.index') 
    Route.get('/:id', 'PersonaNaturalsController.show') 
    Route.post('/', 'PersonaNaturalsController.store') 
    Route.put('/:id', 'PersonaNaturalsController.update') 
    Route.delete('/:id', 'PersonaNaturalsController.destroy') 
  }).prefix('persona-naturals')