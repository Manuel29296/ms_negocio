import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ListaOrden from 'App/Models/ListaOrden'
// import ListaOrdenValidator from 'App/Validators/ListaOrdenValidator'

export default class ListaOrdenController {
  // Obtener una o todas las ListaOrden
  public async find({ params }: HttpContextContract) {
    if (params.id) {
      // Si se pasa un ID, buscar una sola ListaOrden por su ID
      const listaOrden = await ListaOrden.findOrFail(params.id)
      return listaOrden
    } else {
      // Si no se pasa un ID, devolver todas las ListaOrden
      const listaOrdens = await ListaOrden.all()
      return listaOrdens
    }
  }

  // Crear una nueva ListaOrden
  public async create({ request }: HttpContextContract) {
    // await request.validate(ListaOrdenValidator)
    const data = request.body()
    const listaOrden = await ListaOrden.create(data)
    return listaOrden
  }

  // Actualizar una ListaOrden existente
  public async update({ params, request }: HttpContextContract) {
    const listaOrden = await ListaOrden.findOrFail(params.id)
    const data = request.body()
    listaOrden.merge(data)
    await listaOrden.save()
    return listaOrden
  }

  // Eliminar una ListaOrden
  public async delete({ params }: HttpContextContract) {
    const listaOrden = await ListaOrden.findOrFail(params.id)
    await listaOrden.delete()
    return { message: 'ListaOrden deleted successfully' }
  }
}
