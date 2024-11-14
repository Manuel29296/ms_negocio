import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restaurante from 'App/Models/Restaurante';
import RestauranteValidator from 'App/Validators/RestauranteValidator';

export default class RestaurantesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRestaurante: Restaurante = await Restaurante.findOrFail(params.id)
            return theRestaurante;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Restaurante.query().paginate(page, perPage)
            } else {
                return await Restaurante.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(RestauranteValidator)
        const body = request.body();
        const theRestaurante: Restaurante = await Restaurante.create(body);
        return theRestaurante;
    }

    // public async update({ params, request }: HttpContextContract) {
    //     const theRestaurante: Restaurante = await Restaurante.findOrFail(params.id);
    //     const body = request.body();
    //     theRestaurante.marca = body.marca;
    //     theRestaurante.tipo_carga = body.tipoCarga;
    //     theRestaurante.placa = body.placa;
    //     theRestaurante.capacidad = body.capacidad;
    //     return await theRestaurante.save();
    // }

    public async delete({ params, response }: HttpContextContract) {
        const theRestaurante: Restaurante = await Restaurante.findOrFail(params.id);
            response.status(204);
            return await theRestaurante.delete();
    }

}
