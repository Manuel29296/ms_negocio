import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'

export default class Seguro extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public poliza: string

  @column()
  public compania: string

  @column.date()
  public fecha_inicio: DateTime

  @column.date()
  public fecha_fin: DateTime

  @column()
  public vehiculo_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Vehiculo, {
    foreignKey: "vehiculo_id",
  })
  public vehiculos: HasMany<typeof Vehiculo>;
}
