import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cuotas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.decimal('monto', 12, 2).notNullable()
      table.timestamp('fecha_pago', { useTz: true }).nullable()
      table.integer("contrato_id").unsigned().references("contratoes.id")
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
