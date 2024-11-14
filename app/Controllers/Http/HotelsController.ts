import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel'
import HotelValidator from 'App/Validators/HotelValidator'

export default class HotelsController {
  
  // Método para buscar un hotel por ID o listar todos con paginación opcional
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theHotel: Hotel = await Hotel.findOrFail(params.id)
      return theHotel
    } else {
      const data = request.all()
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1)
        const perPage = request.input("per_page", 20)
        return await Hotel.query().paginate(page, perPage)
      } else {
        return await Hotel.query()
      }
    }
  }

  // Método para crear un hotel
  public async create({ request }: HttpContextContract) {
    await request.validate(HotelValidator)
    const body = request.body()

    // Asegúrate de asignar explícitamente servicio_id
    const theHotel = await Hotel.create({
      ...body,
      servicio_id: body.servicio_id, 
    })
    return theHotel
  }

  // Método para actualizar un hotel por ID
  public async update({ params, request }: HttpContextContract) {
    const theHotel = await Hotel.findOrFail(params.id)
    const body = request.body()

    theHotel.nombreHotel = body.nombreHotel
    theHotel.noches = body.noches
    theHotel.servicio_id = body.servicio_id // Asegúrate de asignar servicio_id también
    return await theHotel.save()
  }

  // Método para eliminar un hotel por ID
  public async delete({ params, response }: HttpContextContract) {
    const theHotel: Hotel = await Hotel.findOrFail(params.id)
    response.status(204)
    return await theHotel.delete()
  }
}
