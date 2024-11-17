import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CuotaValidator {
  public schema = schema.create({
    card_number: schema.string({}, [
      rules.regex(/^\d{16}$/), // Valida que sean 16 dígitos
      rules.required()
    ]),
    exp_year: schema.number([
      rules.range(2024, 2100), // Año de expiración dentro de un rango lógico
      rules.required()
    ]),
    exp_month: schema.number([
      rules.range(1, 12), // Mes válido
      rules.required()
    ]),
    cvc: schema.string({}, [
      rules.regex(/^\d{3,4}$/), // CVC de 3 o 4 dígitos
      rules.required()
    ]),
    name: schema.string({}, [
      rules.minLength(2),
      rules.maxLength(50),
      rules.required()
    ]),
    last_name: schema.string({}, [
      rules.minLength(2),
      rules.maxLength(50),
      rules.required()
    ]),
    email: schema.string.optional({}, [
      rules.email() // Formato de correo válido
    ]),
    phone: schema.string({}, [
      rules.regex(/^\d{7,15}$/), // Longitud razonable para números de teléfono
      rules.required()
    ]),
    doc_number: schema.string({}, [
      rules.regex(/^\w{6,20}$/), // Documento de 6 a 20 caracteres alfanuméricos
      rules.required()
    ]),
    city: schema.string({}, [
      rules.minLength(2),
      rules.maxLength(100),
      rules.required()
    ]),
    address: schema.string({}, [
      rules.minLength(5),
      rules.maxLength(255),
      rules.required()
    ]),
    cell_phone: schema.string({}, [
      rules.regex(/^\d{7,15}$/), // Longitud razonable para celulares
      rules.required()
    ]),
    bill: schema.string({}, [
      rules.minLength(5),
      rules.maxLength(50),
      rules.required()
    ]),
    value: schema.number([
      rules.unsigned(), // Valor debe ser positivo
      rules.required()
    ]),
    fechaPago: schema.date.optional(),
    contrato_id: schema.number([
      rules.exists({ table: 'contratoes', column: 'id' }), // Valida que el contrato exista
      rules.required()
    ])
  })

  public messages = {
    'card_number.required': 'El número de tarjeta es obligatorio',
    'card_number.regex': 'El número de tarjeta debe tener 16 dígitos',
    'exp_year.required': 'El año de expiración es obligatorio',
    'exp_year.range': 'El año de expiración debe estar entre 2024 y 2100',
    'exp_month.required': 'El mes de expiración es obligatorio',
    'exp_month.range': 'El mes de expiración debe estar entre 1 y 12',
    'cvc.required': 'El código de seguridad es obligatorio',
    'cvc.regex': 'El código de seguridad debe tener 3 o 4 dígitos',
    'name.required': 'El nombre es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 2 caracteres',
    'name.maxLength': 'El nombre no debe exceder los 50 caracteres',
    'last_name.required': 'El apellido es obligatorio',
    'last_name.minLength': 'El apellido debe tener al menos 2 caracteres',
    'last_name.maxLength': 'El apellido no debe exceder los 50 caracteres',
    'email.email': 'El email debe tener un formato válido',
    'phone.required': 'El teléfono es obligatorio',
    'phone.regex': 'El teléfono debe tener entre 7 y 15 dígitos',
    'doc_number.required': 'El número de documento es obligatorio',
    'doc_number.regex': 'El número de documento debe tener entre 6 y 20 caracteres',
    'city.required': 'La ciudad es obligatoria',
    'city.minLength': 'La ciudad debe tener al menos 2 caracteres',
    'city.maxLength': 'La ciudad no debe exceder los 100 caracteres',
    'address.required': 'La dirección es obligatoria',
    'address.minLength': 'La dirección debe tener al menos 5 caracteres',
    'address.maxLength': 'La dirección no debe exceder los 255 caracteres',
    'cell_phone.required': 'El celular es obligatorio',
    'cell_phone.regex': 'El celular debe tener entre 7 y 15 dígitos',
    'bill.required': 'La factura es obligatoria',
    'bill.minLength': 'La factura debe tener al menos 5 caracteres',
    'bill.maxLength': 'La factura no debe exceder los 50 caracteres',
    'value.required': 'El valor del pago es obligatorio',
    'value.unsigned': 'El valor debe ser positivo',
    'fechaPago.date': 'La fecha de pago debe ser una fecha válida',
    'contrato_id.required': 'El contrato asociado es obligatorio',
    'contrato_id.exists': 'El contrato asociado no existe en la base de datos',
  }
}
