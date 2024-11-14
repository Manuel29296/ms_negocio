import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Lote from './Lote'

export default class ListaOrden extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Lote, {
    foreignKey: 'listaOrden_id',
  }) public lote: HasOne<typeof Lote>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
