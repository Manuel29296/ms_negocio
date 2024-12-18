import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
import ClienteValidator from 'App/Validators/ClienteValidator'

export default class ClientesController {
  // Método para obtener todos los clientes o uno específico por ID
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      // Si se proporciona un ID, devolver un cliente específico con productos y contratos
      const cliente = await Cliente.query()
        .where('id', params.id)
        .preload('productos')
        .preload('contratos')  // Cargar contratos asociados
        .firstOrFail()
      return cliente
    } else {
      // Si no se proporciona un ID, devolver todos los clientes (con paginación si es necesario)
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        const clientes = await Cliente.query()
          .preload('productos')
          .preload('contratos')  // Cargar contratos asociados
          .paginate(page, perPage)
        return clientes
      } else {
        const clientes = await Cliente.query()
          .preload('productos')
          .preload('contratos')  // Cargar contratos asociados
        return clientes
      }
    }
  }

  // Método para obtener los contratos de un cliente
  public async findContratos({ params }: HttpContextContract) {
    const cliente = await Cliente.findOrFail(params.id)  // Buscar el cliente por ID
    const contratos = await cliente.related('contratos').query()  // Obtener los contratos relacionados
    return contratos
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

