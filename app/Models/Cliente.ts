import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato'
import Producto from './Producto'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipo_cliente: string

  @column()
  public razon_social: string | null

  @hasMany(() => Contrato, {
    foreignKey: 'cliente_id'
  }) public contratos: HasMany<typeof Contrato>

  @hasMany(() => Producto, {
    foreignKey: 'cliente_id'
  }) public productos: HasMany<typeof Producto>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
