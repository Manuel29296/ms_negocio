import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/contratos', 'ContratoesController.index')
  Route.post('/contratos', 'ContratoesController.create')
  Route.get('/contratos/:id', 'ContratoesController.find')
  Route.put('/contratos/:id', 'ContratoesController.update')
  Route.delete('/contratos/:id', 'ContratoesController.delete')
})
