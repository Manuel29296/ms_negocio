import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/propietarios", "PropietariosController.find");
    Route.get("/propietarios/:id", "PropietariosController.find");
    Route.post("/propietarios", "PropietariosController.create");
    Route.put("/propietarios/:id", "PropietariosController.update");
    Route.delete("/propietarios/:id", "PropietariosController.delete");
})
