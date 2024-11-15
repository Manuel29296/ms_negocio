import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restaurante from 'App/Models/Restaurante'
import RestauranteValidator from 'App/Validators/RestauranteValidator'

export default class RestaurantesController {
  
  // Método para buscar un restaurante por ID o listar todos con paginación opcional
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theRestaurante: Restaurante = await Restaurante.query().preload('servicio').where('id', params.id).firstOrFail()
      return theRestaurante
    } else {
      const data = request.all()
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1)
        const perPage = request.input("per_page", 20)
        return await Restaurante.query().preload('servicio').paginate(page, perPage)
      } else {
        return await Restaurante.query().preload('servicio')
      }
    }
  }

  // Método para crear un restaurante
  public async create({ request }: HttpContextContract) {
    await request.validate(RestauranteValidator)
    const body = request.body()
    const theRestaurante: Restaurante = await Restaurante.create(body)
    return theRestaurante
  }

  // Método para eliminar un restaurante por ID
  public async delete({ params, response }: HttpContextContract) {
    const theRestaurante: Restaurante = await Restaurante.findOrFail(params.id)
    response.status(204)
    return await theRestaurante.delete()
  }
}

