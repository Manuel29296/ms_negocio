import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/contratos', 'ContratosController.index')
  Route.post('/contratos', 'ContratosController.store')
  Route.get('/contratos/:id', 'ContratosController.show')
  Route.put('/contratos/:id', 'ContratosController.update')
  Route.delete('/contratos/:id', 'ContratosController.destroy')
}).prefix('/api')
