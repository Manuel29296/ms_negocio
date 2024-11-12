import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsuarioValidator {
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
    nombre: schema.string({}, [
      rules.alpha({ allow: ['space'] }), // Solo permite letras y espacios
      rules.maxLength(50), // Limita el nombre a 50 caracteres
    ]),
    email: schema.string({}, [
      rules.email(), // Verifica que el formato sea un email válido
      rules.unique({ table: 'usuarios', column: 'email' }), // Asegura que el email sea único en la tabla
    ]),
    password: schema.string({}, [
      rules.minLength(8), // La contraseña debe tener al menos 8 caracteres
      rules.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/), // Asegura que tenga letras y números
    ]),
    telefono: schema.string.optional({}, [
      rules.mobile({ locale: ['es-CO'] }), // Asegura que sea un número móvil colombiano válido
      
    ]),
    rol: schema.enum(['admin', 'usuario', 'cliente'] as const), // Restringe los valores posibles para el rol
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
