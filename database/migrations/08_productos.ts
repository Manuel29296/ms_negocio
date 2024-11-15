import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "productos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.string("nombre");
      table.float("peso");
      table.string("dimensiones");
      table.text("descripcion");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('CASCADE')
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
