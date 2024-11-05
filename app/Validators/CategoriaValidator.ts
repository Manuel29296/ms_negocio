import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string([
      rules.required(),
      rules.maxLength(255), // Limitar la longitud del nombre
    ]),
    descripcion: schema.string.optional([
      rules.maxLength(500), // Limitar la longitud de la descripción
    ]),
    tipo_producto: schema.string([
      rules.required(),
      rules.maxLength(255), // Limitar la longitud del tipo de producto
    ]),
    requisitos_de_transporte: schema.object().anyMembers(), // Puede ser un objeto JSON, lo que permite flexibilidad
    parent_id: schema.number.optional([
      rules.exists({ table: 'categorias', column: 'id' }) // Asegura que el parent_id sea una categoría existente, si se proporciona
    ]),
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre es obligatorio',
    'nombre.maxLength': 'El nombre no puede tener más de 255 caracteres',
    'descripcion.maxLength': 'La descripción no puede tener más de 500 caracteres',
    'tipo_producto.required': 'El tipo de producto es obligatorio',
    'tipo_producto.maxLength': 'El tipo de producto no puede tener más de 255 caracteres',
    'parent_id.exists': 'La categoría padre debe existir en la base de datos',
  }
}
