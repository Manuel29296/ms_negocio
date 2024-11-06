import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class LoteValidator {
  public schema = schema.create({
    fecha_creacion: schema.date({
      format: 'yyyy-MM-dd',
    }),
    fecha_envio: schema.date({
      format: 'yyyy-MM-dd',
    }, [
      rules.afterField('fecha_creacion'), // fecha_envio debe ser posterior a fecha_creacion
    ]),
    estado: schema.enum(['pendiente', 'en_transito', 'entregado'] as const), // Estados permitidos
    cantidad_productos: schema.number([
      rules.range(1, 10000),
      rules.required(),
    ]),
    ruta_id: schema.number.optional(), // Valida la relación con Ruta si es opcional
  })

  public messages = {
    'fecha_creacion.date': 'La fecha de creación debe ser una fecha válida.',
    'fecha_envio.date': 'La fecha de envío debe ser una fecha válida.',
    'fecha_envio.afterField': 'La fecha de envío debe ser posterior a la fecha de creación.',
    'estado.required': 'El estado es obligatorio.',
    'estado.enum': 'El estado debe ser uno de los siguientes: pendiente, en tránsito, o entregado.',
    'cantidad_productos.required': 'La cantidad de productos es obligatoria.',
    'cantidad_productos.range': 'La cantidad de productos debe estar entre 1 y 10000.',
    'ruta_id.number': 'El ID de la ruta debe ser un número válido.',
  }
}
