import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'centros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.string("nombre")
      table.string("telefono")
      table.integer("municipio_id").unsigned().references('id').inTable('municipios').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
