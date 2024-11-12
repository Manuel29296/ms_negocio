import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota'

export default class CuotasController {
  public async index({ response }: HttpContextContract) {
    const cuotas = await Cuota.all()
    return response.ok(cuotas)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['monto', 'fechaPago', 'contrato_id'])
    const cuota = await Cuota.create(data)
    return response.created(cuota)
  }

  public async show({ params, response }: HttpContextContract) {
    const cuota = await Cuota.findOrFail(params.id)
    return response.ok(cuota)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const cuota = await Cuota.findOrFail(params.id)
    const data = request.only(['monto', 'fechaPago'])

    cuota.merge(data)
    await cuota.save()
    return response.ok(cuota)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const cuota = await Cuota.findOrFail(params.id)
    await cuota.delete()
    return response.noContent()
  }
}
