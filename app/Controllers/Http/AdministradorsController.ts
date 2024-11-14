import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrador from 'App/Models/Administrador';
import AdministradorValidator from 'App/Validators/AdministradorValidator';

export default class AdministradorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theAdministrador: Administrador = await Administrador.findOrFail(params.id)
            return theAdministrador;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Administrador.query().paginate(page, perPage)
            } else {
                return await Administrador.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(AdministradorValidator)
        const body = request.body();
        const theAdministrador: Administrador = await Administrador.create(body);
        return theAdministrador;
    }

    // public async update({ params, request }: HttpContextContract) {
    //     const theAdministrador: Administrador = await Administrador.findOrFail(params.id);
    //     const body = request.body();
    //     theAdministrador.marca = body.marca;
    //     theAdministrador.tipo_carga = body.tipoCarga;
    //     theAdministrador.placa = body.placa;
    //     theAdministrador.capacidad = body.capacidad;
    //     return await theAdministrador.save();
    // }

    public async delete({ params, response }: HttpContextContract) {
        const theAdministrador: Administrador = await Administrador.findOrFail(params.id);
            response.status(204);
            return await theAdministrador.delete();
    }

}
