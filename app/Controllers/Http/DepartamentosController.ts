import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departamento from 'App/Models/Departamento'
import DepartamentoValidator from 'App/Validators/DepartamentoValidator'

export default class DepartamentosController {
  // Obtener todos los departamentos o uno por id
  public async find({ params, request }: HttpContextContract) {
    if (params.id) {
      const departamento = await Departamento.findOrFail(params.id)
      return departamento
    } else {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      const departamentos = await Departamento.query().preload('municipios').paginate(page, perPage)
      return departamentos
    }
  }

  // Crear un nuevo departamento
  public async create({ request }: HttpContextContract) {
    await request.validate(DepartamentoValidator)
    const body = request.body()
    const departamento = await Departamento.create(body)
    return departamento
  }

  // Actualizar un departamento existente
  public async update({ params, request }: HttpContextContract) {
    const departamento = await Departamento.findOrFail(params.id)
    const body = request.body()
    departamento.nombre = body.nombre
    await departamento.save()
    return departamento
  }

  // Eliminar un departamento
  public async delete({ params, response }: HttpContextContract) {
    const departamento = await Departamento.findOrFail(params.id)
    await departamento.delete()
    response.status(204)
  }
}

