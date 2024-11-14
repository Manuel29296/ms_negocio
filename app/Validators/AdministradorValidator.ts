import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AdministradorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    usuario_id: schema.string(), // Validamos solo que sea un string, sin la regla `exists`
    servicio_id: schema.number([
      rules.exists({ table: 'servicios', column: 'id' }), // Verifica que `servicio_id` exista en la tabla `servicios`
    ]),
  });

  public messages: CustomMessages = {
    'usuario_id.required': 'El ID del usuario es obligatorio',
    'servicio_id.required': 'El ID del servicio es obligatorio',
    'servicio_id.exists': 'El ID del servicio no existe en la base de datos',
  };
}
