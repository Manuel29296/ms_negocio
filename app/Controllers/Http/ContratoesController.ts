import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contrato from 'App/Models/Contrato'

export default class ContratoesController {
    public async index({ response }: HttpContextContract) {
        const contratos = await Contrato.all()
        return response.ok(contratos)
      }
    
      public async store({ request, response }: HttpContextContract) {
        const data = request.only([
          'fecha_creacion',
          'fecha_inicio',
          'fecha_fin_estimada',
          'estado',
          'punto_origen',
          'puntos_intermedios',
          'punto_destino',
        ])
        
        const contrato = await Contrato.create(data)
        return response.created(contrato)
      }
    
      public async show({ params, response }: HttpContextContract) {
        const contrato = await Contrato.findOrFail(params.id)
        return response.ok(contrato)
      }
    
      public async update({ params, request, response }: HttpContextContract) {
        const contrato = await Contrato.findOrFail(params.id)
        const data = request.only([
          'fecha_inicio',
          'fecha_fin_estimada',
          'estado',
          'punto_origen',
          'puntos_intermedios',
          'punto_destino',
        ])
    
        contrato.merge(data)
        await contrato.save()
        return response.ok(contrato)
      }
    
      public async destroy({ params, response }: HttpContextContract) {
        const contrato = await Contrato.findOrFail(params.id)
        await contrato.delete()
        return response.noContent()
      }
}
