import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehiculoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    marca: schema.string({}, [
      rules.alpha({ allow: ['space'] }),  // Acepta solo letras y espacios
      rules.maxLength(50),  // Longitud máxima de 50 caracteres para la marca
    ]),
  
    placa: schema.string({}, [
      rules.regex(/^[A-Z]{3}\d{3,4}$/),  // Valida que la placa tenga el formato colombiano (3 letras y 3 o 4 números)
      rules.unique({ table: 'vehiculos', column: 'placa' }),  // La placa debe ser única en la tabla de vehículos
    ]),
  
    tipo_carga: schema.string({}, [
      rules.alpha({ allow: ['space', 'underscore'] }),  // Acepta letras, espacios y guiones bajos
      rules.maxLength(50),  // Máximo 50 caracteres para el tipo de carga
    ]),
  
    capacidad: schema.number([rules.range(1, 100000)]),  // Capacidad debe estar en un rango válido
  })

  public messages: CustomMessages = {
    'marca.required': 'La marca es obligatoria',
    'marca.alpha': 'La marca solo puede contener letras y espacios',
    'marca.maxLength': 'La marca no puede exceder los 50 caracteres',

    'placa.required': 'La placa es obligatoria',
    'placa.regex': 'La placa debe tener el formato válido (3 letras seguidas de 3 o 4 números)',
    'placa.unique': 'La placa ya está registrada en la base de datos',

    'tipo_carga.required': 'El tipo de carga es obligatorio',
    'tipo_carga.alpha': 'El tipo de carga solo puede contener letras, espacios o guiones bajos',
    'tipo_carga.maxLength': 'El tipo de carga no puede exceder los 50 caracteres',

    'capacidad.required': 'La capacidad es obligatoria',
    'capacidad.range': 'La capacidad debe estar entre 1 y 100,000',
  }
}
