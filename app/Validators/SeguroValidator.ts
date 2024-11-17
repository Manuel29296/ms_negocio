import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class SeguroValidator {
  public schema = schema.create({
    poliza: schema.string({}, [
      rules.required(),
      rules.maxLength(50)
    ]),

    compania: schema.string({}, [
      rules.required(),
      rules.maxLength(100)
    ]),

    fecha_inicio: schema.date({}, [
      rules.required()
    ]),

    fecha_fin: schema.date({}, [
      rules.required(),
      rules.afterField('fecha_inicio')
    ]),

    vehiculo_id: schema.number([
      rules.required(),
      rules.exists({ table: 'vehiculos', column: 'id' })
    ])
  })

  public messages = {
    'poliza.required': 'El campo poliza es obligatorio',
    'poliza.maxLength': 'El campo poliza no puede exceder los 50 caracteres',
    'compania.required': 'El campo compania es obligatorio',
    'compania.maxLength': 'El campo compania no puede exceder los 100 caracteres',
    'fecha_inicio.required': 'El campo fecha_inicio es obligatorio',
    'fecha_fin.required': 'El campo fecha_fin es obligatorio',
    'fecha_fin.after': 'La fecha de fin debe ser posterior a la fecha de inicio',
    'vehiculo_id.required': 'El campo vehiculo_id es obligatorio',
    'vehiculo_id.exists': 'El vehículo con este ID no existe',
  }
}
