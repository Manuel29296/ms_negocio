import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestriccioneValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({

    descripcion: schema.string({}, [
      rules.required(),
      rules.maxLength(255)
    ]),

    fecha_inicio: schema.date({}, [
      rules.required()
    ]),

    fecha_fin: schema.date({}, [
      rules.required(),
      rules.afterField('fecha_inicio')
    ]),

    municipio_id: schema.number([
      rules.exists({ table: 'municipios', column: 'id' })
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    "descripcion.required": "La descripción es obligatoria",
    "descripcion.maxLength": "La descripción no puede exceder los 255 caracteres",
    "fecha_inicio.required": "La fecha de inicio es obligatoria",
    "fecha_fin.required": "La fecha de fin es obligatoria",
    "fecha_fin.after": "La fecha de fin debe ser despues de la fecha de inicio",
    'departamento_id.required': 'El ID del departamento es obligatorio',
    'departamento_id.exists': 'El departamento seleccionado no existe'
  }
}
