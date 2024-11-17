import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class HotelValidator {
  public schema = schema.create({
    servicioId: schema.number([
      rules.required(),
      rules.exists({ table: 'servicios', column: 'id' })  // Verifica si el servicio existe en la tabla 'servicios'
    ]),

    nombre_hotel: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(100)
    ]),

    noches: schema.number([
      rules.required(),
      rules.range(1, 365)  // Supone que el número de noches debe estar entre 1 y 365
    ])
  })

  public messages = {
    'servicioId.required': 'El campo servicioId es obligatorio',
    'servicioId.exists': 'El servicioId no existe en la base de datos',
    'nombre_hotel.required': 'El nombre del hotel es obligatorio',
    'nombre_hotel.minLength': 'El nombre del hotel debe tener al menos 3 caracteres',
    'nombre_hotel.maxLength': 'El nombre del hotel no puede exceder los 100 caracteres',
    'noches.required': 'El número de noches es obligatorio',
    'noches.range': 'El número de noches debe estar entre 1 y 365',
  }
}
