import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Turno from 'App/Models/Turno';
import TurnoValidator from 'App/Validators/TurnoValidator';

export default class TurnosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTurno: Turno = await Turno.findOrFail(params.id)
            return theTurno;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Turno.query().paginate(page, perPage)
            } else {
                return await Turno.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(TurnoValidator)
        const body = request.body();
        const theTurno: Turno = await Turno.create(body);
        return theTurno;
    }

    public async update({ params, request }: HttpContextContract) {
        const theTurno: Turno = await Turno.findOrFail(params.id);
        const body = request.body();
        theTurno.fecha_inicio = body.turnos
        theTurno.fecha_fin = body.fecha_fin
        theTurno.conductor_id = body.conductor_id
        return await theTurno.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTurno: Turno = await Turno.findOrFail(params.id);
            response.status(204);
            return await theTurno.delete();
    }

}
