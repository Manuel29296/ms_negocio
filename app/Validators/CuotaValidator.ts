import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CuotaValidator {
  public schema = schema.create({
    monto: schema.number(),
    fechaPago: schema.date.optional(),
    contrato_id: schema.number([rules.exists({ table: 'contratoes', column: 'id' })]),
  })

  public messages = {
    'monto.required': 'El monto es obligatorio',
    'monto.number': 'El monto debe ser un número',
    'fechaPago.date': 'La fecha de pago debe ser una fecha válida',
    'contrato_id.required': 'El contrato asociado es obligatorio',
    'contrato_id.exists': 'El contrato asociado no existe en la base de datos',
  }
}

