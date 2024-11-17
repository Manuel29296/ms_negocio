import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class VehiculoConductorValidator {
  public schema = schema.create({
    vehiculo_id: schema.number([
      rules.required(),
      rules.exists({ table: 'vehiculos', column: 'id' })  // Verifica que el vehículo exista en la base de datos
    ]),

    conductor_id: schema.number([
      rules.required(),
      rules.exists({ table: 'conductores', column: 'id' })  // Verifica que el conductor exista en la base de datos
    ])
  })

  public messages = {
    'vehiculo_id.required': 'El vehículo es obligatorio',
    'vehiculo_id.exists': 'El vehículo asignado no existe en la base de datos',
    'conductor_id.required': 'El conductor es obligatorio',
    'conductor_id.exists': 'El conductor asignado no existe en la base de datos',
  }
}
