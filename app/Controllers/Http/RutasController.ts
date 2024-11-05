import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ruta from 'App/Models/Ruta'
import RutaValidator from 'App/Validators/RutaValidator'

export default class RutasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const ruta = await Ruta.findOrFail(params.id)
            return ruta
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Ruta.query().paginate(page, perPage)
            } else {
                return await Ruta.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(RutaValidator)
        const body = request.body()
        const ruta = await Ruta.create(body)
        return ruta
    }

    public async update({ params, request }: HttpContextContract) {
        const ruta = await Ruta.findOrFail(params.id)
        const body = request.body()

        ruta.merge(body) // Usar merge para actualizar la ruta
        await ruta.save() // Guardar cambios
        return ruta // Retornar la ruta actualizada
    }

    public async delete({ params, response }: HttpContextContract) {
        const ruta = await Ruta.findOrFail(params.id)
        await ruta.delete()
        return response.status(204) // Responder con estado 204 No Content
    }
}

