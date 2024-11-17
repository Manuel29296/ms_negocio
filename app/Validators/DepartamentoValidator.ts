// app/Validators/DepartamentoValidator.ts
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class DepartamentoValidator {
  public schema = schema.create({
    nombre: schema.string({}, [
      rules.maxLength(255), 
      rules.unique({ table: 'departamentos', column: 'nombre' }) // Asegura que el nombre sea único
    ]),
  })

  public messages = {
    'nombre.required': 'El nombre del departamento es obligatorio.',
    'nombre.maxLength': 'El nombre no puede tener más de 255 caracteres.',
    'nombre.unique': 'Ya existe un departamento con este nombre.',
  }
}
