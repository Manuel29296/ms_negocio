import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categoria_productos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('producto_id').unsigned().references('id').inTable('productos').onDelete('CASCADE') 
      table.integer('categoria_id').unsigned().references('id').inTable('categorias').onDelete('CASCADE') 
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
