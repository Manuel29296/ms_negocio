import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lote from 'App/Models/Lote'
import LoteValidator from 'App/Validators/LoteValidator'

export default class LotesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const lote = await Lote.findOrFail(params.id)
            return lote
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Lote.query().paginate(page, perPage)
            } else {
                return await Lote.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(LoteValidator)
        const body = request.body()
        const lote = await Lote.create(body)
        return lote
    }

    public async update({ params, request }: HttpContextContract) {
        const lote = await Lote.findOrFail(params.id)
        const body = request.body()

        lote.merge(body) // Usar merge para actualizar el lote
        await lote.save() // Guardar cambios
        return lote // Retornar el lote actualizado
    }

    public async delete({ params, response }: HttpContextContract) {
        const lote = await Lote.findOrFail(params.id)
        await lote.delete()
        return response.status(204) // Responder con estado 204 No Content
    }
}

