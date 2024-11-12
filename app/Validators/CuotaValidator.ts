import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CuotaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    monto: schema.number([rules.required(), rules.unsigned()]), // Monto debe ser un número positivo
    fechaPago: schema.date.optional(), // Fecha de pago es opcional
    contrato_id: schema.number([ // Relación con el contrato, debe existir
      rules.required(),
      rules.exists({ table: 'contratoes', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'monto.required': 'El monto es obligatorio',
    'monto.unsigned': 'El monto debe ser un número positivo',
    'contrato_id.required': 'El contrato es obligatorio',
    'contrato_id.exists': 'El contrato especificado no existe en la base de datos',
  }
}
