import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'seguros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string("poliza")
      table.string("compania")
      table.date("fecha_inicio")
      table.date("fecha_fin")
      table.integer("vehiculo_id").unsigned().references("vehiculos.id")
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
