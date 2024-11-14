import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class HotelValidator {
  public schema = schema.create({
    nombreHotel: schema.string({}, [
      rules.maxLength(255), // Limitar la longitud del nombre del hotel
      rules.required(),
    ]),
    noches: schema.number([
      rules.range(1, 365), // Validar que las noches estén en un rango razonable
      rules.required(),
    ]),
    servicio_id: schema.number([
      rules.exists({ table: 'servicios', column: 'id' }), // Validar que el servicio_id exista en la tabla 'servicios'
      rules.required(),
    ]),
  })

  public messages = {
    'nombreHotel.required': 'El nombre del hotel es obligatorio.',
    'nombreHotel.maxLength': 'El nombre del hotel no puede exceder los 255 caracteres.',
    'noches.required': 'El número de noches es obligatorio.',
    'noches.range': 'El número de noches debe estar entre 1 y 365.',
    'servicio_id.required': 'El ID del servicio es obligatorio.',
    'servicio_id.exists': 'El servicio relacionado no existe en la base de datos.',
  }
}

