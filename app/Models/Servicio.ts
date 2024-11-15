import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Administrador from './Administrador'
import Gasto from './Gasto'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public descripcion: string

  @column()
  public precio: number

  @column()
  public tipo: string

  @column.date()
  public fecha: DateTime

  @hasOne(() => Administrador, {
    foreignKey: 'servicio_id',
  }) public administrador: HasOne<typeof Administrador>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
