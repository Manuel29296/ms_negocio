import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  @column()
  public tipo_producto: string

  @column()
  public requisitos_de_transporte: string

  @column()
    public parent_id: number | null // Permite que sea nulo si no hay categoría padre

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Categoria, {
    foreignKey: "categoria_id"
  })
  public categorias: HasMany<typeof Categoria>

  // Relación con subcategorías
  @hasMany(() => Categoria, {
    foreignKey: 'parent_id', // Esto indica que `parent_id` es la clave que conecta las subcategorías
  })
  public subcategorias: HasMany<typeof Categoria>

  // Relación con la categoría principal
  @belongsTo(() => Categoria, {
    foreignKey: 'parent_id',
  })
  public parent: BelongsTo<typeof Categoria>
}
