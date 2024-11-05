import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class LoteValidator {
  public schema = schema.create({
    fecha_creacion: schema.date({
      format: 'yyyy-MM-dd', // Formato de fecha esperado
    }),
    fecha_envio: schema.date({
      format: 'yyyy-MM-dd', // Formato de fecha esperado
    }),
    estado: schema.string([
      rules.maxLength(50), // Limitar la longitud del estado
      rules.required()      // Campo requerido
    ]),
    cantidad_productos: schema.number([
      rules.range(1, 10000), // Rango permitido para cantidad de productos
      rules.required()        // Campo requerido
    ]),
  })

  public messages = {
    'fecha_creacion.date': 'La fecha de creación debe ser una fecha válida.',
    'fecha_envio.date': 'La fecha de envío debe ser una fecha válida.',
    'estado.required': 'El estado es obligatorio.',
    'estado.maxLength': 'El estado no puede exceder los 50 caracteres.',
    'cantidad_productos.required': 'La cantidad de productos es obligatoria.',
    'cantidad_productos.range': 'La cantidad de productos debe estar entre 1 y 10000.',
  }
}
