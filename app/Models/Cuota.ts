import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato'

export default class Cuota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public monto: number

  @column.dateTime()
  public fechaPago: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Contrato, {
    // Nombre de la clve foranea que permite la ralación
    foreignKey: 'contrato_id'
  })
  public contrato: BelongsTo<typeof Contrato>
}
