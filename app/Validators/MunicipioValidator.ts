import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class MunicipioValidator {
  public schema = schema.create({
    nombre: schema.string({}, [
      rules.maxLength(255), // Limitar el tamaño del nombre
    ]),
    departamento_id: schema.number([
      rules.exists({ table: 'departamentos', column: 'id' }) // Validar que el departamento exista
    ])
  })

  public messages = {
    'nombre.required': 'El nombre del municipio es obligatorio',
    'departamento_id.required': 'El ID del departamento es obligatorio',
    'departamento_id.exists': 'El departamento seleccionado no existe'
  }
}
