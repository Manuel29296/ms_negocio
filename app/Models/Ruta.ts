import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Lote from './Lote'

export default class Ruta extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public origen: string 

  @column()
  public destino: string 

  @column()
  public distancia: number 

  @column()
  public tiempo_estimado: number 

  @column()
  public costo_estimado: number 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relación uno a muchos con Lote
  @hasMany(() => Lote, {
    foreignKey: 'ruta_id', // Debe coincidir con el campo en Lote
  })
  public lotes: HasMany<typeof Lote>
}