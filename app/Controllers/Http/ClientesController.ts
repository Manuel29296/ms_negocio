import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
import ClienteValidator from 'App/Validators/ClienteValidator'

export default class ClientesController {
  // Método para obtener todos los clientes o uno específico por ID
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      // Si se proporciona un ID, devolver un cliente específico
      const cliente = await Cliente.findOrFail(params.id)
      return cliente
    } else {
      // Si no se proporciona un ID, devolver todos los clientes (con paginación si es necesario)
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Cliente.query().paginate(page, perPage)
      } else {
        return await Cliente.query()
      }
    }
  }

  // Método para crear un nuevo cliente
  public async create({ request }: HttpContextContract) {
    await request.validate(ClienteValidator) // Validar los datos de entrada
    const body = request.body()
    const cliente = await Cliente.create(body) // Crear el cliente en la base de datos
    return cliente
  }

  // Método para actualizar un cliente existente
  public async update({ params, request }: HttpContextContract) {
    const cliente = await Cliente.findOrFail(params.id) // Buscar el cliente por ID
    const body = request.body()

    // Actualizar los atributos
    cliente.tipo_cliente = body.tipo_cliente
    cliente.razon_social = body.razon_social

    await cliente.save() // Guardar cambios
    return cliente
  }

  // Método para eliminar un cliente
  public async delete({ params }: HttpContextContract) {
    const cliente = await Cliente.findOrFail(params.id) // Buscar el cliente por ID
    await cliente.delete() // Eliminar el cliente de la base de datos
    return { message: 'Cliente eliminado correctamente' }
  }
}
