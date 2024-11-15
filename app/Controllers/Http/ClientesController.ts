import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente';
import ClienteValidator from 'App/Validators/ClienteValidator';

export default class ClientesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCliente: Cliente = await Cliente.findOrFail(params.id)
            return theCliente;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Cliente.query().paginate(page, perPage)
            } else {
                return await Cliente.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(ClienteValidator)
        const body = request.body();
        const theCliente: Cliente = await Cliente.create(body);
        return theCliente;
    }

    // public async update({ params, request }: HttpContextContract) {
    //     const theCliente: Cliente = await Cliente.findOrFail(params.id);
    //     const body = request.body();
    //     theCliente.marca = body.marca;
    //     theCliente.tipo_carga = body.tipoCarga;
    //     theCliente.placa = body.placa;
    //     theCliente.capacidad = body.capacidad;
    //     return await theCliente.save();
    // }

    public async delete({ params, response }: HttpContextContract) {
        const theCliente: Cliente = await Cliente.findOrFail(params.id);
            response.status(204);
            return await theCliente.delete();
    }

}
