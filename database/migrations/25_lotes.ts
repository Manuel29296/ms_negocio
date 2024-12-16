import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'lotes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.date('fecha_creacion')  
      table.date('fecha_envio')                      
      table.string('estado')  // Estado del lote (ej. "Pendiente", "En tránsito", "Entregado")
      table.integer('cantidad_productos') 
      table.integer('producto_id').unsigned().references('id').inTable('productos').onDelete('CASCADE') 
      table.integer('ruta_id').unsigned().references('id').inTable('rutas').onDelete('CASCADE')
      table.integer("listaOrden_id").unsigned().references('id').inTable('lista_ordens').onDelete('CASCADE')
      table.string('origen') // Coordenadas de origen del mapa
      table.string('destino') // Coordenadas de destino del mapa
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
