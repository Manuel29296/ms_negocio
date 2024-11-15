import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PersonaNatural from 'App/Models/PersonaNatural'

export default class PersonaNaturalsController {
    // Obtener todas las personas naturales
  public async index({}: HttpContextContract) {
    const personasNaturales = await PersonaNatural.all()
    return personasNaturales
  }

  // Obtener una persona natural por su ID
  public async show({ params }: HttpContextContract) {
    const personaNatural = await PersonaNatural.findOrFail(params.id)
    return personaNatural
  }

  // Crear una nueva persona natural
  public async store({ request }: HttpContextContract) {
    const data = request.only(['nombre', 'telefono', 'correo'])
    const personaNatural = await PersonaNatural.create(data)
    return personaNatural
  }

  // Actualizar una persona natural
  public async update({ params, request }: HttpContextContract) {
    const personaNatural = await PersonaNatural.findOrFail(params.id)
    const data = request.only(['nombre', 'telefono', 'correo'])
    personaNatural.merge(data)
    await personaNatural.save()
    return personaNatural
  }

  // Eliminar una persona natural
  public async destroy({ params }: HttpContextContract) {
    const personaNatural = await PersonaNatural.findOrFail(params.id)
    await personaNatural.delete()
    return { message: 'Persona natural eliminada correctamente' }
  }
}
