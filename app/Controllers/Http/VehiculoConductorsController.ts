import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehiculoConductor from 'App/Models/VehiculoConductor';
import VehiculoConductorValidator from 'App/Validators/VehiculoConductorValidator';

export default class VehiculoConductorsController {    public async find({ request, params }: HttpContextContract) {
    if (params.id) {
        let theVehiculoConductor: VehiculoConductor = await VehiculoConductor.findOrFail(params.id)
        await theVehiculoConductor.load("Conductor")
        await theVehiculoConductor.load("Vehiculo")
        return theVehiculoConductor;
    } else {
        const data = request.all()
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await VehiculoConductor.query().paginate(page, perPage)
        } else {
            return await VehiculoConductor.query()
        }

    }
    


}
public async create({ request }: HttpContextContract) {
    await request.validate(VehiculoConductorValidator)
    const body = request.body();
    const theVehiculoConductor: VehiculoConductor = await VehiculoConductor.create(body);
    return theVehiculoConductor;
}

public async update({ params, request }: HttpContextContract) {
    const theVehiculoConductor: VehiculoConductor = await VehiculoConductor.findOrFail(params.id);
    const body = request.body();
    theVehiculoConductor.conductor_id = body.conductor_id_id;
    theVehiculoConductor.vehiculo_id = body.vehiculo_id
    return await theVehiculoConductor.save();
}

public async delete({ params, response }: HttpContextContract) {
    const theVehiculoConductor: VehiculoConductor = await VehiculoConductor.findOrFail(params.id);
        response.status(204);
        return await theVehiculoConductor.delete();
}}

