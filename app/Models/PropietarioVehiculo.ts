import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'
import Propietario from './Propietario'

export default class PropietarioVehiculo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public propietario_id: number

  @column()
  public vehiculo_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Vehiculo, {
    foreignKey: 'vehiculo_id',
  }) public vehiculo: BelongsTo<typeof Vehiculo>

  @belongsTo(() => Propietario, {
    foreignKey: 'propietario_id',
  }) public propietario: BelongsTo<typeof Propietario>
}
