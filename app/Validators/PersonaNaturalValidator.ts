import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PersonaNaturalValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string([
      rules.required(),
      rules.maxLength(255), // Limitar la longitud del nombre
    ]),
    telefono: schema.string.optional([
      rules.maxLength(15), // Limitar la longitud del teléfono
      rules.mobile(), // Validar que sea un teléfono móvil
    ]),
    correo: schema.string.optional([
      rules.maxLength(255), // Limitar la longitud del correo
      rules.email(), // Validar que sea un correo electrónico
    ]),
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre es obligatorio',
    'nombre.maxLength': 'El nombre no puede tener más de 255 caracteres',
    'telefono.maxLength': 'El teléfono no puede tener más de 15 caracteres',
    'telefono.mobile': 'El teléfono debe ser un número válido',
    'correo.maxLength': 'El correo no puede tener más de 255 caracteres',
    'correo.email': 'El correo debe ser una dirección de correo válida',
  }
}
