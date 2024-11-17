import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/listaOrden', 'ListaOrdensController.find')
    Route.post('/listaOrden', 'ListaOrdensController.create')
    Route.get('/listaOrden/:id', 'ListaOrdensController.find')
    Route.put('/listaOrden/:id', 'ListaOrdensController.update')
    Route.delete('/listaOrden/:id', 'ListaOrdensController.delete')
})