import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class OperacionValidator {
  public schema = schema.create({
    municipio_id: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }),
    ]),
  })

  public messages = {
    'municipio_id.exists': 'El municipio debe existir en la base de datos',
    'vehiculo_id.exists': 'El vehículo debe existir en la base de datos',
  }
}
