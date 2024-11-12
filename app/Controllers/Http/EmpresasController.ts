import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa'

export default class EmpresasController {
    // Obtener todas las empresas
  public async index({}: HttpContextContract) {
    const empresas = await Empresa.all()
    return empresas
  }

  // Obtener una empresa por su ID
  public async show({ params }: HttpContextContract) {
    const empresa = await Empresa.findOrFail(params.id)
    return empresa
  }

  // Crear una nueva empresa
  public async store({ request }: HttpContextContract) {
    const data = request.only(['nombre', 'direccion', 'telefono', 'correo'])
    const empresa = await Empresa.create(data)
    return empresa
  }

  // Actualizar una empresa
  public async update({ params, request }: HttpContextContract) {
    const empresa = await Empresa.findOrFail(params.id)
    const data = request.only(['nombre', 'direccion', 'telefono', 'correo'])
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
