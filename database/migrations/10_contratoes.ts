import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'contratoes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('fecha_creacion', { useTz: true }).defaultTo(this.now())
      table.timestamp('fecha_inicio', { useTz: true })
      table.timestamp('fecha_fin_estimada', { useTz: true })
      table.string('estado', 50).notNullable()
      table.string('punto_origen').notNullable()
      table.json('puntos_intermedios').nullable()
      table.string('punto_destino').notNullable()
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
