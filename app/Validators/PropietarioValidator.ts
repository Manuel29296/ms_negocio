import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PropietarioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    telefono: schema.string({}, [
      rules.regex(/^\+?[0-9]{7,15}$/), // Validación de teléfono (debe ser un número de entre 7 a 15 dígitos)
    ]),
    usuario_id: schema.string(), // Validamos solo que sea un string, sin la regla `exists`
    conductor_id: schema.number([rules.exists({ table: 'conductors', column: 'id' })]), // Validación de que el conductor exista
  })

  public messages = {
    'telefono.required': 'El teléfono es obligatorio',
    'telefono.regex': 'El teléfono debe tener entre 7 y 15 dígitos',
    'usuario_id.required': 'El ID del usuario es obligatorio',
    'conductor_id.required': 'El ID del conductor es obligatorio',
    'conductor_id.exists': 'El conductor con ese ID no existe',
  }
}
