import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PropietarioVehiculo from "App/Models/PropietarioVehiculo";
import PropietarioVehiculoValidator from 'App/Validators/PropietarioVehiculoValidator';

export default class PropietarioVehiculosController {    public async find({ request, params }: HttpContextContract) {
    if (params.id) {
        let thePropietarioVehiculo: PropietarioVehiculo = await PropietarioVehiculo.findOrFail(params.id)
        await thePropietarioVehiculo.load("propietario")
        await thePropietarioVehiculo.load("vehiculo")
        return thePropietarioVehiculo;
    } else {
        const data = request.all()
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await PropietarioVehiculo.query().paginate(page, perPage)
        } else {
            return await PropietarioVehiculo.query()
        }

    }
    


}
public async create({ request }: HttpContextContract) {
    await request.validate(PropietarioVehiculoValidator)
    const body = request.body();
    const thePropietarioVehiculo: PropietarioVehiculo = await PropietarioVehiculo.create(body);
    return thePropietarioVehiculo;
}

public async update({ params, request }: HttpContextContract) {
    const thePropietarioVehiculo: PropietarioVehiculo = await PropietarioVehiculo.findOrFail(params.id);
    const body = request.body();
    thePropietarioVehiculo.propietario_id = body.propietario_id;
    thePropietarioVehiculo.vehiculo_id = body.vehiculo_id
    return await thePropietarioVehiculo.save();
}

public async delete({ params, response }: HttpContextContract) {
    const thePropietarioVehiculo: PropietarioVehiculo = await PropietarioVehiculo.findOrFail(params.id);
        response.status(204);
        return await thePropietarioVehiculo.delete();
}}
