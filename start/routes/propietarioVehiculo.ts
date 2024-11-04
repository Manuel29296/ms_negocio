import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/propietarioVehiculos", "PropietarioVehiculosController.find");
    Route.get("/propietarioVehiculos/:id", "PropietarioVehiculosController.find");
    Route.post("/propietarioVehiculos", "PropietarioVehiculosController.create");
    Route.put("/propietarioVehiculos/:id", "PropietarioVehiculosController.update");
    Route.delete("/propietarioVehiculos/:id", "PropietarioVehiculosController.delete");
})
