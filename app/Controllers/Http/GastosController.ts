import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gasto from 'App/Models/Gasto';
import GastoValidator from 'App/Validators/GastoValidator';

export default class GastosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGasto: Gasto = await Gasto.findOrFail(params.id)
            return theGasto;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                let gastos:Gasto[] = await Gasto.query().preload('factura').paginate(page, perPage)
                return gastos;
            } else {
                return await Gasto.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(GastoValidator)
        const body = request.body();
        const theGasto: Gasto = await Gasto.create(body);
        return theGasto;
    }

    // public async update({ params, request }: HttpContextContract) {
    //     const theGasto: Gasto = await Gasto.findOrFail(params.id);
    //     const body = request.body();
    //     theGasto.marca = body.marca;
    //     theGasto.tipo_carga = body.tipoCarga;
    //     theGasto.placa = body.placa;
    //     theGasto.capacidad = body.capacidad;
    //     return await theGasto.save();
    // }

    public async delete({ params, response }: HttpContextContract) {
        const theGasto: Gasto = await Gasto.findOrFail(params.id);
            response.status(204);
            return await theGasto.delete();
    }


}
