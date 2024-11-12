import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/cuotas', 'CuotasController.index')
  Route.post('/cuotas', 'CuotasController.store')
  Route.get('/cuotas/:id', 'CuotasController.show')
  Route.put('/cuotas/:id', 'CuotasController.update')
  Route.delete('/cuotas/:id', 'CuotasController.destroy')
}).prefix('/api')
