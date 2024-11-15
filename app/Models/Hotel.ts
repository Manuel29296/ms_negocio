import { DateTime } from 'luxon'
import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'

export default class Hotel extends Servicio {
  @column({ isPrimary: true })
  public id: number

  @column()
  public servicioId: number

  @column()
  public nombre_hotel: string

  @column()
  public noches: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Servicio)
  public servicio: BelongsTo<typeof Servicio>
}
