import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Direccion from './Direccion'

export default class Centro extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Direccion, {
    foreignKey: 'centro_id',
  }) public direccion: HasOne<typeof Direccion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
