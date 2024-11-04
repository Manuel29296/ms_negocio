import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SeguroValidator {
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
    poliza: schema.string([
      rules.alphaNum(),  // Asegura que la póliza tenga solo letras y números
      rules.maxLength(20),  // Máximo de 20 caracteres
      rules.unique({ table: 'seguros', column: 'poliza' }),  // La póliza debe ser única en la tabla seguros
    ]),
  
    compania: schema.string([
      rules.alpha({ allow: ['space'] }),  // Solo permite letras y espacios
      rules.maxLength(100),  // Longitud máxima de 100 caracteres
    ]),
  
    fecha_inicio: schema.date({}, [
      rules.beforeField('fecha_fin'),  // La fecha de inicio debe ser antes de la fecha de fin
    ]),
  
    fecha_fin: schema.date({}, [
      rules.afterField('fecha_inicio'),  // La fecha de fin debe ser después de la fecha de inicio
    ]),

    vehiculo_id: schema.number([
      rules.exists({ table: "vehiculos", column: "id" }), // Verifica que el ID del vehículo exista en la tabla vehiculos
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
  public messages: CustomMessages = {}
}
