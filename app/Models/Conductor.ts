import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Turno from './Turno'
import VehiculoConductor from './VehiculoConductor'

export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public licencia: string

  @column()
  public vehiculo_id: string

  @hasMany(() => Turno, {
    foreignKey: 'conductor_id',
  }) public turnos: HasMany<typeof Turno>

  @hasMany(() => VehiculoConductor, {
    foreignKey: 'conductor_id',
  }) public vehiculoConductor: HasMany<typeof VehiculoConductor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
