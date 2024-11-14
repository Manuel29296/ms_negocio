import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Operacion from './Operacion'

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Operacion, {
    foreignKey: 'municipio_id'
  }) public operaciones: HasMany<typeof Operacion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
