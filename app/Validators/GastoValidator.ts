import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class GastoValidator {
  public schema = schema.create({
    servicio_id: schema.number([
      rules.required(),
      rules.exists({ table: 'servicios', column: 'id' })  // Verifica si el servicio existe en la tabla 'servicios'
    ]),

    conductor_id: schema.number([
      rules.required(),
      rules.exists({ table: 'conductors', column: 'id' })  // Verifica si el conductor existe en la tabla 'conductores'
    ]),

    propietario_id: schema.number([
      rules.required(),
      rules.exists({ table: 'propietarios', column: 'id' })  // Verifica si el propietario existe en la tabla 'propietarios'
    ]),
  })

  public messages = {
    'servicio_id.required': 'El campo servicio_id es obligatorio',
    'servicio_id.exists': 'El servicio_id no existe en la base de datos',
    'conductor_id.required': 'El campo conductor_id es obligatorio',
    'conductor_id.exists': 'El conductor_id no existe en la base de datos',
    'propietario_id.required': 'El campo propietario_id es obligatorio',
    'propietario_id.exists': 'El propietario_id no existe en la base de datos',
  }
}
