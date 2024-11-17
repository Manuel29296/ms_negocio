import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Centro from 'App/Models/Centro'
import CentroValidator from 'App/Validators/CentroValidator'

export default class CentrosController {
    // Obtener todos los centros o uno por ID
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const centro: Centro = await Centro.findOrFail(params.id)
            return centro
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Centro.query().preload('direccion').paginate(page, perPage)
            } else {
                return await Centro.query().preload('direccion')
            }
        }
    }

    // Crear un nuevo centro
    public async create({ request }: HttpContextContract) {
        await request.validate(CentroValidator)
        const body = request.body()
        const centro = await Centro.create(body)
        return centro
    }

    // Actualizar un centro existente
    public async update({ params, request }: HttpContextContract) {
        const centro: Centro = await Centro.findOrFail(params.id)
        const body = request.body()
        centro.nombre = body.nombre
        centro.telefono = body.telefono
        centro.municipio_id = body.municipio_id
        return await centro.save()
    }

    // Eliminar un centro
    public async delete({ params, response }: HttpContextContract) {
        const centro: Centro = await Centro.findOrFail(params.id)
        response.status(204)
        return await centro.delete()
    }
}

