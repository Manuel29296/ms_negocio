import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Producto from './Producto'

export default class Lote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.date()
  public fecha_creacion: DateTime

  @column.date()
  public fecha_envio: DateTime

  @column()
  public estado: string 

  @column()
  public cantidad_productos: number

  @column()
  public ruta_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relación 1 a muchos con Producto
  @hasMany(() => Producto, {
    foreignKey: 'producto_id', 
  })
  public productos: HasMany<typeof Producto>
}

