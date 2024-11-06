import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import CategoriaProducto from './CategoriaProducto'

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

  // Relación de uno a muchos con ella misma
  @hasMany(() => Categoria)
  public subcategorias: HasMany<typeof Categoria>

  // Relación de muchos a muchos con Producto a través de CategoriaProducto
  @hasMany(() => CategoriaProducto, {
    foreignKey: 'categoria_id'
  })
  public categoriaProducto: HasMany<typeof CategoriaProducto>
}
