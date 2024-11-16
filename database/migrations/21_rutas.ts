import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rutas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('contrato_id').unsigned().references('id').inTable('contratoes').onDelete('CASCADE')
      table.integer('vehiculo_id').unsigned().references('id').inTable('vehiculos').onDelete('CASCADE')
      table.string('origen');
      table.string('destino');
      table.integer('distancia');
      table.integer('tiempo_estimado');
      table.integer('costo_estimado');
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
