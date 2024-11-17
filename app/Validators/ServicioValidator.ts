import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ServicioValidator {
  public schema = schema.create({
    descripcion: schema.string({}, [
      rules.required(),
      rules.maxLength(255)
    ]),

    precio: schema.number([
      rules.required(),
      rules.range(0, 1000000)  // Rango del precio
    ]),

    tipo: schema.string({}, [
      rules.required(),
      rules.maxLength(50)
    ]),

    fecha: schema.date({}, [
      rules.required()
    ])
  })

  public messages = {
    'descripcion.required': 'La descripción es obligatoria',
    'descripcion.maxLength': 'La descripción no puede exceder los 255 caracteres',
    'precio.required': 'El precio es obligatorio',
    'precio.range': 'El precio debe ser un valor entre 0 y 1,000,000',
    'tipo.required': 'El tipo es obligatorio',
    'tipo.maxLength': 'El tipo no puede exceder los 50 caracteres',
    'fecha.required': 'La fecha es obligatoria',
  }
}

