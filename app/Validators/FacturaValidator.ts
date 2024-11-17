import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class FacturaValidator {
  public schema = schema.create({
    monto: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.range(0.01, 999999.99)
    ]),

    fecha: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss'
    }, [
      rules.required()
    ]),

    cuota_id: schema.number([
      rules.required(),
      rules.unsigned()
    ]),

    gasto_id: schema.number([
      rules.required(),
      rules.unsigned()
    ])
  })

  public messages = {
    'monto.required': 'El campo monto es obligatorio',
    'monto.unsigned': 'El monto debe ser un número positivo',
    'monto.range': 'El monto debe estar entre 0.01 y 999999.99',
    'fecha.required': 'El campo fecha es obligatorio',
    'fecha.date': 'La fecha debe tener el formato válido (yyyy-MM-dd HH:mm:ss)',
    'cuota_id.required': 'El campo cuota_id es obligatorio',
    'cuota_id.unsigned': 'El campo cuota_id debe ser un número positivo',
    'gasto_id.required': 'El campo gasto_id es obligatorio',
    'gasto_id.unsigned': 'El campo gasto_id debe ser un número positivo',
  }
}
