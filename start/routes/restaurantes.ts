import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/restaurantes', 'RestaurantesController.find')
  Route.get('/restaurantes/:id', 'RestaurantesController.find')
  Route.post('/restaurantes', 'RestaurantesController.create')
  Route.delete('/restaurantes/:id', 'RestaurantesController.delete')
})
