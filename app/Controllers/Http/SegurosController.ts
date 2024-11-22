import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Seguro from 'App/Models/Seguro';
import SeguroValidator from 'App/Validators/SeguroValidator';

export default class SegurosController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theSeguro = await Seguro.findOrFail(params.id);
            return theSeguro;
        } else {
            const data = request.all();
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1);
                const perPage = request.input('per_page', 20);
                return await Seguro.query().paginate(page, perPage);
            } else {
                return await Seguro.query();
            }
        }
    }

    public async create({ request, response }: HttpContextContract) {
        await request.validate(SeguroValidator);
        const body = request.only(['poliza', 'compania', 'fecha_inicio', 'fecha_fin', 'vehiculo_id']);
        const theSeguro = await Seguro.create(body);
        response.status(201).json(theSeguro);
        return theSeguro;
    }

    public async update({ params, request, response }: HttpContextContract) {
        const theSeguro = await Seguro.findOrFail(params.id);
        const body = request.only(['poliza', 'compania', 'vehiculo_id', 'fecha_inicio', 'fecha_fin']);
        theSeguro.merge(body);
        await theSeguro.save();
        response.status(200).json(theSeguro);
        return theSeguro;
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSeguro = await Seguro.findOrFail(params.id);
        await theSeguro.delete();
        response.status(204);
        return;
    }
}

