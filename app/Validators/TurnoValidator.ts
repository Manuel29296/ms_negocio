import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class TurnoValidator {
  public schema = schema.create({
    fecha_inicio: schema.date({}, [
      rules.required(),
      rules.beforeField('fecha_fin')  
    ]),

    fecha_fin: schema.date({}, [
      rules.required(),
    ]),

    conductor_id: schema.number([
      rules.required(),
      rules.exists({ table: 'conductores', column: 'id' })  // Verifica que el conductor exista en la base de datos
    ])
  })

  public messages = {
    'fecha_inicio.required': 'La fecha de inicio es obligatoria',
    'fecha_inicio.before': 'La fecha de inicio debe ser antes de la fecha de fin',
    'fecha_fin.required': 'La fecha de fin es obligatoria',
    'conductor_id.required': 'El conductor es obligatorio',
    'conductor_id.exists': 'El conductor asignado no existe en la base de datos',
  }
}
