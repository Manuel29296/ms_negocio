import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public descripcion: string

  @column()
  public precio: number

  @column()
  public tipo: string

  @column.date()
  public fecha: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
