import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/operaciones', 'OperacionsController.index')
  Route.get('/operaciones/:id', 'OperacionsController.show') 
  Route.post('/operaciones', 'OperacionsController.store') 
  Route.put('/operaciones/:id', 'OperacionsController.update') 
  Route.delete('/operaciones/:id', 'OperacionsController.destroy') 
})

