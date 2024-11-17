import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operacion from 'App/Models/Operacion'
import OperacionValidator from 'App/Validators/OperacionValidator'

export default class OperationsController {

  // Obtener todas las operaciones
  public async index({ request }: HttpContextContract) {
    const { page, per_page } = request.only(['page', 'per_page'])
    const operationsQuery = Operacion.query().preload('vehiculo').preload('municipio')

    // Paginar resultados si se pasa la opción de paginación
    if (page && per_page) {
      return operationsQuery.paginate(page, per_page)
    }

    // Si no se pasa la paginación, devolver todas las operaciones
    return operationsQuery
  }

  // Obtener una operación por su ID
  public async show({ params }: HttpContextContract) {
    const operation = await Operacion.find(params.id)
    
    if (!operation) {
      return { message: 'Operación no encontrada' }
    }

    await operation.load('vehiculo')
    await operation.load('municipio')

    return operation
  }

  // Crear una nueva operación
  public async store({ request }: HttpContextContract) {
    // Validar los datos antes de crear
    const data = await request.validate(OperacionValidator)
    
    // Crear y guardar la nueva operación
    const operation = await Operacion.create(data)

    return operation
  }

  // Actualizar una operación
  public async update({ params, request }: HttpContextContract) {
    const operation = await Operacion.find(params.id)

    if (!operation) {
      return { message: 'Operación no encontrada' }
    }

    const data = request.only(['municipio_id', 'vehiculo_id'])
    operation.merge(data)

    await operation.save()

    return operation
  }

  // Eliminar una operación
  public async destroy({ params }: HttpContextContract) {
    const operation = await Operacion.find(params.id)

    if (!operation) {
      return { message: 'Operación no encontrada' }
    }

    await operation.delete()

    return { message: 'Operación eliminada con éxito' }
  }
}