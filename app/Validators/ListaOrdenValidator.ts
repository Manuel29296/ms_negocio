import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ListaOrdenValidator {
  public schema = schema.create({
    direccion_id: schema.number([rules.exists({ table: 'direccions', column: 'id' })]),
    ruta_id: schema.number([rules.exists({ table: 'rutas', column: 'id' })]),
  })

  public messages = {
    'direccion_id.exists': 'El direccion_id debe existir en la tabla direcciones',
    'ruta_id.exists': 'El ruta_id debe existir en la tabla rutas',
  }
}
