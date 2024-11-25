import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'

export default class Restriccione extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descripcion: string

  @column.date()
  public fecha_inicio: DateTime

  @column.date()
  public fecha_fin: DateTime

  @column()
  public municipio_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Municipio, {
    foreignKey: 'municipio_id'
  })
  public municipio: BelongsTo<typeof Municipio>
}
