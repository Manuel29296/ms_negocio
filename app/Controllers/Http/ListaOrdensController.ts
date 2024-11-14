import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ListaOrden from 'App/Models/ListaOrden';
import ListaOrdenValidator from 'App/Validators/ListaOrdenValidator';

export default class ListaOrdensController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theListaOrden: ListaOrden = await ListaOrden.findOrFail(params.id)
            return theListaOrden;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                let ListaOrdens:ListaOrden[] = await ListaOrden.query().preload('lote').paginate(page, perPage)
                return ListaOrdens;
            } else {
                return await ListaOrden.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(ListaOrdenValidator)
        const body = request.body();
        const theListaOrden: ListaOrden = await ListaOrden.create(body);
        return theListaOrden;
    }

    // public async update({ params, request }: HttpContextContract) {
    //     const theListaOrden: ListaOrden = await ListaOrden.findOrFail(params.id);
    //     const body = request.body();
    //     theListaOrden.marca = body.marca;
    //     theListaOrden.tipo_carga = body.tipoCarga;
    //     theListaOrden.placa = body.placa;
    //     theListaOrden.capacidad = body.capacidad;
    //     return await theListaOrden.save();
    // }

    public async delete({ params, response }: HttpContextContract) {
        const theListaOrden: ListaOrden = await ListaOrden.findOrFail(params.id);
            response.status(204);
            return await theListaOrden.delete();
    }


}
