import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class DireccionValidator {
  // Esquema de validación para la creación y actualización de direcciones
  public schema = schema.create({
    direccion: schema.string({}, [
      rules.minLength(5),
      rules.maxLength(255),
    ]),
    centro_id: schema.number([rules.exists({ table: 'centros', column: 'id' })]),
    municipio_id: schema.number([rules.exists({ table: 'municipios', column: 'id' })]),
  })

  // Mensajes personalizados para validaciones
  public messages = {
    'direccion.required': 'La dirección es requerida.',
    'direccion.minLength': 'La dirección debe tener al menos 5 caracteres.',
    'direccion.maxLength': 'La dirección no puede exceder los 255 caracteres.',
    'centro_id.exists': 'El centro con este ID no existe.',
    'municipio_id.exists': 'El municipio con este ID no existe.',
  }
}
