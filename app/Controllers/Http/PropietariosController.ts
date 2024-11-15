import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Propietario from 'App/Models/Propietario';
import PropietarioValidator from 'App/Validators/PropietarioValidator';

export default class PropietariosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let thePropietario: Propietario = await Propietario.findOrFail(params.id)
            return thePropietario;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Propietario.query().paginate(page, perPage)
            } else {
                return await Propietario.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(PropietarioValidator)
        const body = request.body();
        const thePropietario: Propietario = await Propietario.create(body);
        return thePropietario;
    }

    public async update({ params, request }: HttpContextContract) {
        const thePropietario: Propietario = await Propietario.findOrFail(params.id);
        const body = request.body();
        thePropietario.nombre = body.nombre;
        thePropietario.telefono = body.telefono;
        return await thePropietario.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thePropietario: Propietario = await Propietario.findOrFail(params.id);
            response.status(204);
            return await thePropietario.delete();
    }

}
