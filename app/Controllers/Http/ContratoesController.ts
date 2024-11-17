import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contrato from 'App/Models/Contrato'
import ContratoValidator from 'App/Validators/ContratoValidator'

export default class ContratosController {
  // Obtener todos los contratos o un contrato específico
  public async find({ params, request }: HttpContextContract) {
    const { page, per_page } = request.qs() // Obtener paginación desde query string

    if (params.id) {
      const contrato = await Contrato.findOrFail(params.id)
      return contrato
    }

    if (page && per_page) {
      const paginatedContratos = await Contrato.query().paginate(page, per_page)
      return paginatedContratos.toJSON()
    }

    const allContratos = await Contrato.all()
    return allContratos
  }

  // Crear un nuevo contrato
  public async create({ request, response }: HttpContextContract) {
    // Validar los datos con ContratoValidator
    const data = await request.validate(ContratoValidator)

    // Crear el contrato
    const contrato = await Contrato.create(data)
    return response.status(201).send(contrato)
  }

  // Actualizar un contrato
  public async update({ params, request }: HttpContextContract) {
    const contrato = await Contrato.findOrFail(params.id)

    // Validar los datos con ContratoValidator
    const data = await request.validate(ContratoValidator)

    // Actualizar el contrato
    contrato.merge(data)
    await contrato.save()
    return contrato
  }

  // Eliminar un contrato
  public async delete({ params, response }: HttpContextContract) {
    const contrato = await Contrato.findOrFail(params.id)
    await contrato.delete()
    return response.status(204).send({})
  }
}


