import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PropietarioVehiculoValidator {
  public schema = schema.create({
    propietario_id: schema.number([
      rules.required(),
      rules.exists({ table: 'propietarios', column: 'id' })  // Verifica que el propietario exista
    ]),

    vehiculo_id: schema.number([
      rules.required(),
      rules.exists({ table: 'vehiculos', column: 'id' })  // Verifica que el vehículo exista
    ])
  })

  public messages = {
    'propietario_id.required': 'El campo propietario_id es obligatorio',
    'propietario_id.exists': 'El propietario con este ID no existe',
    'vehiculo_id.required': 'El campo vehiculo_id es obligatorio',
    'vehiculo_id.exists': 'El vehículo con este ID no existe',
  }
}
