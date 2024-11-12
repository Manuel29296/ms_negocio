import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContratoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha_creacion: schema.date({ format: 'yyyy-MM-dd' }, [rules.required()]), // Fecha de creación del contrato
    fecha_inicio: schema.date({ format: 'yyyy-MM-dd' }, [rules.required()]), // Fecha de inicio del contrato
    fecha_fin_estimada: schema.date({ format: 'yyyy-MM-dd' }, [rules.required()]), // Fecha estimada de fin del contrato
    estado: schema.string([ // El estado del contrato (por ejemplo: 'activo', 'finalizado', etc.)
      rules.required(),
      rules.maxLength(255), 
    ]),
    punto_origen: schema.string([ // El punto de origen del transporte
      rules.required(),
      rules.maxLength(255), 
    ]),
    puntos_intermedios: schema.object.optional().anyMembers(), // Puede ser un objeto JSON
    punto_destino: schema.string([ // El punto de destino del transporte
      rules.required(),
      rules.maxLength(255), 
    ]),
  })

  public messages: CustomMessages = {
    'fecha_creacion.required': 'La fecha de creación es obligatoria',
    'fecha_inicio.required': 'La fecha de inicio es obligatoria',
    'fecha_fin_estimada.required': 'La fecha de fin estimada es obligatoria',
    'estado.required': 'El estado del contrato es obligatorio',
    'estado.maxLength': 'El estado del contrato no puede tener más de 255 caracteres',
    'punto_origen.required': 'El punto de origen es obligatorio',
    'punto_origen.maxLength': 'El punto de origen no puede tener más de 255 caracteres',
    'punto_destino.required': 'El punto de destino es obligatorio',
    'punto_destino.maxLength': 'El punto de destino no puede tener más de 255 caracteres',
  }
}

