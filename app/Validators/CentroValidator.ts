import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class CentroValidator {
  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    telefono: schema.string({ trim: true }, [
      rules.mobile(),
      rules.maxLength(15),
    ]),
    municipio_id: schema.number(),
  })

  public messages = {
    'nombre.required': 'El nombre del centro es obligatorio',
    'telefono.required': 'El teléfono es obligatorio',
    'municipio_id.required': 'El ID del municipio es obligatorio',
  }
}

