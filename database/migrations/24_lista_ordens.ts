import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'lista_ordens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      //Referencia a Dirección y a ruta
      table.integer("direccion_id").unsigned().references('id').inTable('direccions').onDelete('CASCADE')
      table.integer("ruta_id").unsigned().references('id').inTable('rutas').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
