import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RutaValidator {
  public schema = schema.create({
    origen: schema.string([
      rules.maxLength(100),
      rules.required(),
      rules.regex(/^[a-zA-Z\s]+$/),  // Permite solo letras y espacios
    ]),
    destino: schema.string([
      rules.maxLength(100),
      rules.required(),
      rules.regex(/^[a-zA-Z\s]+$/),
    ]),
    distancia: schema.number([
      rules.range(1, 10000), // Cambia el rango a partir de 1 para evitar distancia cero
      rules.required(),
    ]),
    tiempo_estimado: schema.number([
      rules.range(1, 24),
      rules.required(),
    ]),
    costo_estimado: schema.number([
      rules.range(0, 100000),
      rules.required(),
    ]),
    lote_id: schema.number.optional(), // Valida la relación con Lote
  })

  public messages = {
    'origen.required': 'El origen es obligatorio.',
    'origen.maxLength': 'El origen no puede exceder los 100 caracteres.',
    'origen.regex': 'El origen solo puede contener letras y espacios.',
    'destino.required': 'El destino es obligatorio.',
    'destino.maxLength': 'El destino no puede exceder los 100 caracteres.',
    'destino.regex': 'El destino solo puede contener letras y espacios.',
    'distancia.required': 'La distancia es obligatoria.',
    'distancia.range': 'La distancia debe estar entre 1 y 10000.',
    'tiempo_estimado.required': 'El tiempo estimado es obligatorio.',
    'tiempo_estimado.range': 'El tiempo estimado debe estar entre 1 y 24 horas.',
    'costo_estimado.required': 'El costo estimado es obligatorio.',
    'costo_estimado.range': 'El costo estimado debe estar entre 0 y 100000.',
    'lote_id.number': 'El ID del lote debe ser un número válido.',
  }
}

