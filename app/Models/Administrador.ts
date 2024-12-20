import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Administrador extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public usuario_id: string

  @column()
  public servicio_id : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
