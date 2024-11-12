import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Turno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_inicio: DateTime

  @column()
  public fecha_fin: DateTime

  @column()
  public conductor_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
