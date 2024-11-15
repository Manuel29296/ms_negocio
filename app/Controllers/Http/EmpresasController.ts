import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa'
import Cliente from 'App/Models/Cliente'  // Importamos el modelo Cliente para verificar la relación

export default class EmpresasController {
  // Obtener todas las empresas
  public async index({}: HttpContextContract) {
    const empresas = await Empresa.query().preload('cliente')  // Pre-cargamos la relación 'cliente'
    return empresas
  }

  // Obtener una empresa por su ID
  public async show({ params }: HttpContextContract) {
    const empresa = await Empresa.query().preload('cliente').where('id', params.id).firstOrFail()
    return empresa
  }

  // Crear una nueva empresa
  public async store({ request }: HttpContextContract) {
    const data = request.only(['nombre', 'direccion', 'telefono', 'correo', 'cliente_id'])

    // Verificamos que el cliente exista antes de crear la empresa
    const cliente = await Cliente.find(data.cliente_id)
    if (!cliente) {
      return { message: 'Cliente no encontrado' }
    }

    const empresa = await Empresa.create(data)
    return empresa
  }

  // Actualizar una empresa
  public async update({ params, request }: HttpContextContract) {
    const empresa = await Empresa.findOrFail(params.id)
    const data = request.only(['nombre', 'direccion', 'telefono', 'correo', 'cliente_id'])

    // Verificamos que el cliente asociado exista antes de actualizar
    if (data.cliente_id) {
      const cliente = await Cliente.find(data.cliente_id)
      if (!cliente) {
        return { message: 'Cliente no encontrado' }
      }
    }

    empresa.merge(data)
    await empresa.save()
    return empresa
  }

  // Eliminar una empresa
  public async destroy({ params }: HttpContextContract) {
    const empresa = await Empresa.findOrFail(params.id)
    await empresa.delete()
    return { message: 'Empresa eliminada correctamente' }
  }
}