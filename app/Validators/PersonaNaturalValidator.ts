import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class PersonaNaturalValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    usuario_id: schema.string({}, [
      rules.required(),
      rules.regex(/^[a-fA-F0-9]{24}$/), // Asegura que sea un ObjectId válido (MongoDB)
    ]),
    cliente_id: schema.number([
      rules.required(),
      rules.exists({ table: 'clientes', column: 'id' }), // Verifica que el cliente exista en la tabla
    ]),
    telefono: schema.string.optional({}, [
      rules.regex(/^\d{10}$/), // Valida que el teléfono contenga exactamente 10 dígitos
    ]),
  });

  public messages: CustomMessages = {
    'usuario_id.required': 'El ID del usuario es obligatorio',
    'usuario_id.regex': 'El ID del usuario debe ser un ObjectId válido',
    'cliente_id.required': 'El ID del cliente es obligatorio',
    'cliente_id.exists': 'El cliente especificado no existe',
    'telefono.regex': 'El número de teléfono debe tener exactamente 10 dígitos',
  };
}

