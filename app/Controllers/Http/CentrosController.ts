import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Centro from 'App/Models/Centro';
import CentroValidator from 'App/Validators/CentroValidator';

export default class CentrosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCentro: Centro = await Centro.findOrFail(params.id)
            return theCentro;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                let Centros:Centro[] = await Centro.query().preload('direccion').paginate(page, perPage)
                return Centros;
            } else {
                return await Centro.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(CentroValidator)
        const body = request.body();
        const theCentro: Centro = await Centro.create(body);
        return theCentro;
    }

    // public async update({ params, request }: HttpContextContract) {
    //     const theCentro: Centro = await Centro.findOrFail(params.id);
    //     const body = request.body();
    //     theCentro.marca = body.marca;
    //     theCentro.tipo_carga = body.tipoCarga;
    //     theCentro.placa = body.placa;
    //     theCentro.capacidad = body.capacidad;
    //     return await theCentro.save();
    // }

    public async delete({ params, response }: HttpContextContract) {
        const theCentro: Centro = await Centro.findOrFail(params.id);
            response.status(204);
            return await theCentro.delete();
    }

}
