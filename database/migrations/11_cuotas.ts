import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cuotas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // table.integer('contrato_id').unsigned().references('id').inTable('contratoes').onDelete('CASCADE')
      table.integer('contrato_id')

      // Campos adicionales
      table.string('card_number')  // Número de tarjeta (16 dígitos)
      table.integer('exp_year')        // Año de expiración de la tarjeta
      table.integer('exp_month')       // Mes de expiración de la tarjeta
      table.string('cvc', 3)           // Código de seguridad de la tarjeta
      table.string('name')             // Nombre del cliente
      table.string('last_name')        // Apellido del cliente
      table.string('email') // Email del cliente (puede ser nulo)
      table.string('phone')        // Teléfono del cliente
      table.string('doc_number')       // Número de documento
      table.string('city')             // Ciudad del cliente
      table.string('address')          // Dirección del cliente
      table.string('cell_phone')   // Celular del cliente
      table.string('bill')             // Número de factura o referencia de pago
      table.integer('value')          // Valor del pago
      
      // Timestamps
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}