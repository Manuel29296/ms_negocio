import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor';
import ConductorValidator from 'App/Validators/ConductorValidator';

export default class ConductorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theConductor: Conductor = await Conductor.findOrFail(params.id)
            return theConductor;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Conductor.query().paginate(page, perPage)
            } else {
                return await Conductor.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(ConductorValidator)
        const body = request.body();
        const theConductor: Conductor = await Conductor.create(body);
        return theConductor;
    }

    public async update({ params, request }: HttpContextContract) {
        const theConductor: Conductor = await Conductor.findOrFail(params.id);
        const body = request.body();
        theConductor.licencia = body.licencia;
        theConductor.vehiculo_id = body.vehiculo;
        return await theConductor.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theConductor: Conductor = await Conductor.findOrFail(params.id);
            response.status(204);
            return await theConductor.delete();
    }

}
