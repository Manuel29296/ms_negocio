import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Producto from './Producto'
import Ruta from './Ruta'

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
  public producto_id: number

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

  @belongsTo(() =>  Ruta, {
    foreignKey: 'ruta_id' 
  })
  public ruta: BelongsTo<typeof Ruta>
}

