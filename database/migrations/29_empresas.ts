import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'empresas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('CASCADE')
      table.string('nombre', 255).notNullable()
      table.string('direccion', 255).notNullable()
      table.string('telefono', 15).nullable()
      table.string('correo', 255).nullable()

      table.integer('persona_natural_id').unsigned().nullable().references('id').inTable('persona_naturals')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
