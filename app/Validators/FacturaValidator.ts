import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FacturaValidator {
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
    monto: schema.number([rules.range(100000, 10000000)]),
    fecha: schema.date({ format: 'yyyy-MM-dd' }, [
      rules.beforeOrEqual('today') // La fecha debe ser igual o anterior a la fecha actual
    ]),
  
    // cuota_id: schema.number([y
    //   rules.exists({ table: 'cuotas', column: 'id' }), // Debe existir un ID de cuota en la tabla 'cuotas'
    // ]),
  
    // gasto_id: schema.number([
    //   rules.exists({ table: 'gastos', column: 'id' }), // Debe existir un ID de gasto en la tabla 'gastos'
    // ]),
    
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
