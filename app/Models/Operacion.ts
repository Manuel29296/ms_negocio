import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'
import Municipio from './Municipio'

export default class Operacion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public municipio_id: number

  @column()
  public vehiculo_id: number


  @belongsTo(() => Vehiculo, {
    foreignKey: 'vehiculo_id',
  }) public vehiculo: BelongsTo<typeof Vehiculo>

  @belongsTo(() => Municipio, { 
    foreignKey: 'municipio_id',
  }) public municipio: BelongsTo<typeof Municipio>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
