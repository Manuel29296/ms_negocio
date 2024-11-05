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

  // Añadir la relación ruta_id
  @column()
  public ruta_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relación 1 a muchos con Producto
  @hasMany(() => Producto, {
    foreignKey: 'lote_id', // Asegúrate de que esto coincida con el campo en Producto
  })
  public productos: HasMany<typeof Producto>

  // Relación muchos a 1 con Ruta
  @belongsTo(() => Ruta, {
    foreignKey: 'ruta_id', // Esto debe coincidir con el campo en Lote
  })
  public ruta: BelongsTo<typeof Ruta>
}

