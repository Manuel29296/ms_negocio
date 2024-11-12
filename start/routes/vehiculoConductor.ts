import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehiculoConductors", "VehiculoConductorsController.find");
    Route.get("/vehiculoConductors/:id", "VehiculoConductorsController.find");
    Route.post("/vehiculoConductors", "VehiculoConductorsController.create");
    Route.put("/vehiculoConductors/:id", "VehiculoConductorsController.update");
    Route.delete("/vehiculoConductors/:id", "VehiculoConductorsController.delete");
})
