import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RestauranteValidator {
  // Validación para crear y actualizar un restaurante
  public schema = schema.create({
    nombre_restaurante: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(100),
    ]),
    servicio_id: schema.number([
      rules.exists({ table: 'servicios', column: 'id' }) // Aseguramos que el `servicioId` exista en la tabla 'servicios'
    ])
  })

  public messages = {
    'nombre_restaurante.required': 'El nombre del restaurante es obligatorio.',
    'nombre_restaurante.minLength': 'El nombre del restaurante debe tener al menos 3 caracteres.',
    'nombre_restaurante.maxLength': 'El nombre del restaurante no puede exceder los 100 caracteres.',
    'servicio_id.required': 'El ID del servicio es obligatorio.',
    'servicio_id.exists': 'El servicio especificado no existe.',
  }
}
