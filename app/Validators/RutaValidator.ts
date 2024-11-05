import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RutaValidator {
  public schema = schema.create({
    origen: schema.string([
      rules.maxLength(100), // Limitar la longitud del origen
      rules.required(),      // Campo requerido
    ]),
    destino: schema.string([
      rules.maxLength(100), // Limitar la longitud del destino
      rules.required(),      // Campo requerido
    ]),
    distancia: schema.number([
      rules.range(0, 10000), // Rango permitido para la distancia (por ejemplo, entre 0 y 10000 km)
      rules.required(),       // Campo requerido
    ]),
    tiempo_estimado: schema.number([
      rules.range(1, 24),     // Rango permitido para el tiempo estimado (por ejemplo, entre 1 y 24 horas)
      rules.required(),       // Campo requerido
    ]),
    costo_estimado: schema.number([
      rules.range(0, 100000), // Rango permitido para el costo estimado (por ejemplo, entre 0 y 100000)
      rules.required(),       // Campo requerido
    ]),
  })

  public messages = {
    'origen.required': 'El origen es obligatorio.',
    'origen.maxLength': 'El origen no puede exceder los 100 caracteres.',
    'destino.required': 'El destino es obligatorio.',
    'destino.maxLength': 'El destino no puede exceder los 100 caracteres.',
    'distancia.required': 'La distancia es obligatoria.',
    'distancia.range': 'La distancia debe estar entre 0 y 10000.',
    'tiempo_estimado.required': 'El tiempo estimado es obligatorio.',
    'tiempo_estimado.range': 'El tiempo estimado debe estar entre 1 y 24 horas.',
    'costo_estimado.required': 'El costo estimado es obligatorio.',
    'costo_estimado.range': 'El costo estimado debe estar entre 0 y 100000.',
  }
}
