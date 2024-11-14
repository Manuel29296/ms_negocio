import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Factura from './Factura'

export default class Gasto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Factura, {
    foreignKey: 'gatos_id',
  }) public factura: HasOne<typeof Factura>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
