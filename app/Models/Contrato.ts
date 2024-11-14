import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Contrato extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public fecha_creacion: DateTime

  @column.dateTime()
  public fecha_inicio: DateTime

  @column.dateTime()
  public fecha_fin_estimada: DateTime

  @column()
  public estado: string

  @column()
  public punto_origen: string

  @column()
  public puntos_intermedios: any

  @column()
  public punto_destino: string

  @column()
  public cliente_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Contrato, {
    foreignKey: "contrato_id"
  })
  public contrato: HasMany<typeof Contrato>

}
