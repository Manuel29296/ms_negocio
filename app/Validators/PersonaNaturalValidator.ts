import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PersonaNaturalValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    usuario_id: schema.string(), 
    telefono: schema.string.optional({}, [
      rules.regex(/^\d{10}$/), // Valida que el teléfono contenga exactamente 10 dígitos
    ]),
  })

  public messages: CustomMessages = {
    'usuario_id.required': 'El ID del usuario es obligatorio',
    'telefono.regex': 'El número de teléfono debe tener exactamente 10 dígitos',
  }
}


