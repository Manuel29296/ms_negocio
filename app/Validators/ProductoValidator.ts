import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ProductoValidator {
  public schema = schema.create({
    nombre: schema.string([
      rules.maxLength(100), // Limitar la longitud del nombre
      rules.required(),      // Campo requerido
    ]),
    peso: schema.number([
      rules.range(0, 1000), // Rango permitido para el peso (por ejemplo, entre 0 y 1000 kg)
      rules.required(),      // Campo requerido
    ]),
    dimensiones: schema.string([
      rules.maxLength(50), // Limitar la longitud de dimensiones
      rules.required(),     // Campo requerido
    ]),
    descripcion: schema.string.optional([
      rules.maxLength(255), // Limitar la longitud de la descripción
    ]),
  })

  public messages = {
    'nombre.required': 'El nombre del producto es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 100 caracteres.',
    'peso.required': 'El peso del producto es obligatorio.',
    'peso.range': 'El peso debe estar entre 0 y 1000.',
    'dimensiones.required': 'Las dimensiones son obligatorias.',
    'dimensiones.maxLength': 'Las dimensiones no pueden exceder los 50 caracteres.',
    'descripcion.maxLength': 'La descripción no puede exceder los 255 caracteres.',
  }
}
