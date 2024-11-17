import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Direccion from 'App/Models/Direccion'
import DireccionValidator from 'App/Validators/DireccionValidator'

export default class DireccionsController {
  // Obtener todas las direcciones o una específica por id
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const direccion = await Direccion.findOrFail(params.id)
      return direccion
    } else {
      const data = request.all()
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1)
        const perPage = request.input("per_page", 20)
        return await Direccion.query().paginate(page, perPage)
      } else {
        return await Direccion.query()
      }
    }
  }

  // Crear una nueva dirección
  public async create({ request }: HttpContextContract) {
    await request.validate(DireccionValidator)
    const body = request.body()
    const direccion = await Direccion.create(body)
    return direccion
  }

  // Actualizar una dirección existente
  public async update({ params, request }: HttpContextContract) {
    const direccion = await Direccion.findOrFail(params.id)
    const body = request.body()
    direccion.direccion = body.direccion
    direccion.centro_id = body.centro_id
    direccion.municipio_id = body.municipio_id
    return await direccion.save()
  }

  // Eliminar una dirección
  public async delete({ params, response }: HttpContextContract) {
    const direccion = await Direccion.findOrFail(params.id)
    response.status(204)
    return await direccion.delete()
  }
}

