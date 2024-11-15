import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Factura from './Factura'
import Servicio from './Servicio'
import Conductor from './Conductor'

export default class Gasto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public servicio_id: number

  @column()
  public conductore_id: number

  @column()
  public propietario_id: number

  @hasOne(() => Factura, {
    foreignKey: 'gatos_id',
  }) public factura: HasOne<typeof Factura>

  @belongsTo(() => Servicio, {
    foreignKey: 'servicio_id',
  }) public servicio: BelongsTo<typeof Servicio>

  @belongsTo(() => Conductor, {
    foreignKey: 'conductor_id',
  }) public conductor: BelongsTo<typeof Conductor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
