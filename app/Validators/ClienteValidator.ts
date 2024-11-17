import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ClienteValidator {
  public schema = schema.create({
    tipo_cliente: schema.string({}, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(50)
    ]),
    
    razon_social: schema.string({}, [
      rules.required(),
      rules.maxLength(100)
    ])
  })

  public messages = {
    'tipo_cliente.required': 'El campo tipo_cliente es obligatorio',
    'tipo_cliente.minLength': 'El tipo_cliente debe tener al menos 3 caracteres',
    'tipo_cliente.maxLength': 'El tipo_cliente no puede exceder los 50 caracteres',
    'razon_social.required': 'El campo razón social es obligatorio',
    'razon_social.maxLength': 'La razón social no puede exceder los 100 caracteres',
  }
}

