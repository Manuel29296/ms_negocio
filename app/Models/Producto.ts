import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Categoria from './Categoria'

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

  @manyToMany(() => Categoria, {
    pivotTable: 'categoria_productos',
    pivotForeignKey: "categoria_id",
    pivotRelatedForeignKey: "producto_id"
  })
  public categorias: ManyToMany<typeof Categoria>
}
