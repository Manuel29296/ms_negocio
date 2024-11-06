import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import CategoriaProducto from './CategoriaProducto'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => CategoriaProducto, {
    foreignKey: "producto_id"
  })
  public categoriaProductos: HasMany<typeof CategoriaProducto>
}
