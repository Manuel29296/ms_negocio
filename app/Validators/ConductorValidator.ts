import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConductorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    licencia: schema.string({}, [
      rules.regex(/^[A-Z0-9]{5,10}$/), // Valida que la licencia tenga solo letras y números (5-10 caracteres)
    ]),
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }), // Verifica que el `vehiculo_id` exista en la tabla `vehiculos`
    ]),
    usuario_id: schema.string(), // Validamos solo que sea un string, sin la regla `exists`
  })

  public messages: CustomMessages = {
    'licencia.required': 'La licencia es obligatoria',
    'licencia.regex': 'La licencia debe contener entre 5 y 10 caracteres alfanuméricos',
    'vehiculo_id.required': 'El ID del vehículo es obligatorio',
    'vehiculo_id.exists': 'El ID del vehículo no existe en la base de datos',
    'usuario_id.required': 'El ID del usuario es obligatorio',
  }
}

