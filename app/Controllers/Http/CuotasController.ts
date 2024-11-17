import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota'
import CuotaValidator from 'App/Validators/CuotaValidator'

export default class CuotasController {
  // Crear una nueva cuota
  public async store({ request, response }: HttpContextContract) {
    // Validar los datos con el validador
    const payload = await request.validate(CuotaValidator)

    // Crear la cuota con los datos validados
    const cuota = await Cuota.create(payload)

    return response.status(201).send(cuota)
  }

  // Obtener todas las cuotas
  public async index({ response }: HttpContextContract) {
    // Obtener todas las cuotas, con las relaciones de contrato y factura
    const cuotas = await Cuota.query().preload('contrato').preload('factura')
    return response.send(cuotas)
  }

  // Obtener una cuota por su ID
  public async show({ params, response }: HttpContextContract) {
    const cuota = await Cuota.query()
      .where('id', params.id)
      .preload('contrato')
      .preload('factura')
      .first()

    // Si no se encuentra la cuota, devolver un error
    if (!cuota) {
      return response.status(404).send({ message: 'Cuota no encontrada' })
    }

    return response.send(cuota)
  }

  // Actualizar una cuota
  public async update({ params, request, response }: HttpContextContract) {
    // Buscar la cuota por ID
    const cuota = await Cuota.find(params.id)

    // Si no se encuentra la cuota, devolver un error
    if (!cuota) {
      return response.status(404).send({ message: 'Cuota no encontrada' })
    }

    // Validar los datos de la cuota a actualizar
    const payload = await request.validate(CuotaValidator)

    // Actualizar los datos de la cuota
    cuota.merge(payload)
    await cuota.save()

    return response.send(cuota)
  }

  // Eliminar una cuota
  public async destroy({ params, response }: HttpContextContract) {
    // Buscar la cuota por ID
    const cuota = await Cuota.find(params.id)

    // Si no se encuentra la cuota, devolver un error
    if (!cuota) {
      return response.status(404).send({ message: 'Cuota no encontrada' })
    }

    // Eliminar la cuota
    await cuota.delete()

    return response.status(204).send({})
  }
}

