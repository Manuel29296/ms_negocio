import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Operacion from './Operacion'
import Centro from './Centro'
import Direccion from './Direccion'

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public departamento_id: number

  @hasMany(() => Operacion, {
    foreignKey: 'municipio_id'
  }) public operaciones: HasMany<typeof Operacion>

  @hasMany(() => Centro, {
    foreignKey: 'municipio_id'
  }) public centros: HasMany<typeof Centro>

  @hasMany(() => Direccion, {
    foreignKey: 'municipio_id'
  }) public direcciones: HasMany<typeof Direccion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
