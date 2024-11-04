import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehiculoValidator {
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
    marca: schema.string({}, [
      rules.alpha({ allow: ['space'] }),  // Acepta solo letras y espacios
      rules.maxLength(50),  // Longitud máxima de 50 caracteres para la marca
    ]),
  
    placa: schema.string({}, [
      rules.regex(/^[A-Z]{3}\d{3,4}$/),  // Valida que la placa tenga el formato colombiano (3 letras y 3 o 4 números)
      rules.unique({ table: 'vehiculos', column: 'placa' }),  // La placa debe ser única en la tabla de vehículos
    ]),
  
    tipo_carga: schema.string({}, [
      rules.alpha({ allow: ['space', 'underscore'] }),  // Acepta letras, espacios y guiones bajos
      rules.maxLength(50),  // Máximo 50 caracteres para el tipo de carga
    ]),
  
    capacidad: schema.number([
      rules.range(1, 100000),  // Capacidad debe estar en un rango válido (ejemplo: entre 1 y 100,000 kilogramos)
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
