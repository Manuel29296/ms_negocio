import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'operacions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      //relacion de n a n vehiculos con municipios

      table.integer("municipio_id").unsigned().references('id').inTable('municipios').onDelete('CASCADE')
      table.integer("vehiculo_id").unsigned().references('id').inTable('vehiculos').onDelete('CASCADE')


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
