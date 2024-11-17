import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CuotasController.index')
  Route.get('/:id', 'CuotasController.show')
  Route.post('/', 'CuotasController.store')
  Route.put('/:id', 'CuotasController.update')
  Route.delete('/:id', 'CuotasController.destroy')
}).prefix('cuotas')

