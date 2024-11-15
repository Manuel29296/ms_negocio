import { DateTime } from 'luxon'
import { column } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'

export default class Hotel extends Servicio {
  @column({ isPrimary: true })
  public id: number
  @column()
  public servicio_id: number

  @column()
  public nombreHotel: string

  @column()
  public noches: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
