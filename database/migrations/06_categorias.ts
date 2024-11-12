import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categorias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nombre') // Nombre de la categoría (ej. Perecederos, Electrónicos)
      table.text('descripcion')  
      table.string('tipo_producto') // Tipo de producto (ej. Alimentos, Líquidos)
      table.json('requisitos_de_transporte') // Requisitos específicos para el transporte (ej. {"temperatura": "refrigerado", "manejo": "cuidadoso"})
      table.integer('parent_id').unsigned().references('id').inTable(this.tableName).onDelete('CASCADE') // Relación uno a muchos con la misma tabla
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
