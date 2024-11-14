import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Direccion from 'App/Models/Direccion';
import DireccionValidator from 'App/Validators/DireccionValidator';

export default class DireccionsController {    public async find({ request, params }: HttpContextContract) {
    if (params.id) {
        let theDireccion: Direccion = await Direccion.findOrFail(params.id)
        return theDireccion;
    } else {
        const data = request.all()
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Direccion.query().paginate(page, perPage)
        } else {
            return await Direccion.query()
        }

    }

}
public async create({ request }: HttpContextContract) {
    await request.validate(DireccionValidator)
    const body = request.body();
    const theDireccion: Direccion = await Direccion.create(body);
    return theDireccion;
}

// public async update({ params, request }: HttpContextContract) {
//     const theDireccion: Direccion = await Direccion.findOrFail(params.id);
//     const body = request.body();
//     theDireccion.monto = body.name;
//     return await theDireccion.save();
// }

public async delete({ params, response }: HttpContextContract) {
    const theDireccion: Direccion = await Direccion.findOrFail(params.id);
        response.status(204);
        return await theDireccion.delete();
}
}
