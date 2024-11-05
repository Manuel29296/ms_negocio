import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriaProductoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    producto_id: schema.number([
      rules.exists({ table: 'productos', column: 'id' }) // Asegura que el producto exista
    ]),
    categoria_id: schema.number([
      rules.exists({ table: 'categorias', column: 'id' }) // Asegura que la categoría exista
    ]),
  })

  public messages: CustomMessages = {
    'producto_id.exists': 'El producto seleccionado no existe.',
    'categoria_id.exists': 'La categoría seleccionada no existe.',
  }
}