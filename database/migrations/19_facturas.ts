import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'facturas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string("email")
      table.integer("monto")
      table.date("fecha")
      table.integer("cuota_id").unsigned().references('id').inTable('cuotas').onDelete('CASCADE')
      table.integer("gasto_id").unsigned().references('id').inTable('gastos').onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
