import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class EmpresaValidator {
  public schema = schema.create({
    nombre: schema.string([
      rules.required(),
      rules.maxLength(255),
    ]),
    direccion: schema.string([
      rules.required(),
      rules.maxLength(255),
    ]),
    telefono: schema.string.optional([
      rules.regex(/^[0-9]{10}$/), // Valida que el teléfono tenga 10 dígitos
    ]),
    correo: schema.string.optional([
      rules.email(),
      rules.maxLength(255),
    ]),
    persona_natural_id: schema.number.optional([
      rules.exists({ table: 'persona_naturals', column: 'id' }), // Asegura que el id de persona_natural exista
    ]),
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre de la empresa es obligatorio.',
    'nombre.maxLength': 'El nombre de la empresa no puede superar los 255 caracteres.',
    'direccion.required': 'La dirección de la empresa es obligatoria.',
    'direccion.maxLength': 'La dirección de la empresa no puede superar los 255 caracteres.',
    'telefono.regex': 'El teléfono debe tener 10 dígitos.',
    'correo.email': 'El correo electrónico debe ser válido.',
    'correo.maxLength': 'El correo electrónico no puede superar los 255 caracteres.',
    'persona_natural_id.exists': 'El id de la persona natural no existe en la base de datos.',
  }
}
