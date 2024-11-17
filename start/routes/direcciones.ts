import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/direcciones', 'DireccionsController.find')
  Route.get('/direcciones/:id', 'DireccionsController.find')
  Route.post('/direcciones', 'DireccionsController.create')
  Route.put('/direcciones/:id', 'DireccionsController.update')
  Route.delete('/direcciones/:id', 'DireccionsController.delete')
})
