import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'EmpresasController.index') 
  Route.get('/:id', 'EmpresasController.show') 
  Route.post('/', 'EmpresasController.store') 
  Route.put('/:id', 'EmpresasController.update') 
  Route.delete('/:id', 'EmpresasController.destroy') 
}).prefix('empresas')