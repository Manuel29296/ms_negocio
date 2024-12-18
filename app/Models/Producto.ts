import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import CategoriaProducto from './CategoriaProducto'
import Lote from './Lote'

export default class Producto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public peso: number

  @column()
  public dimensiones: string

  @column()
  public descripcion: string

  @column()
  public cliente_id: number

  @column()
  public lote_id: number // Clave foránea que conecta el producto con un lote

  @belongsTo(() => Lote, {
    foreignKey: 'lote_id',
  })
  public lote: BelongsTo<typeof Lote>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => CategoriaProducto, {
    foreignKey: "producto_id"
  })
  public categoriaProductos: HasMany<typeof CategoriaProducto>
}
