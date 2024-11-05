import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Factura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public monto: number

  @column()
  public fecha: DateTime

  @column()
  public cuota_id: number

  @column()
  public gasto_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
