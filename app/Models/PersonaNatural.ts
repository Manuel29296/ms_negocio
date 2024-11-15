import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Empresa from './Empresa'
import Cliente from './Cliente'

export default class PersonaNatural extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public usuario_id: string

  @column()
  public telefono: string | null

  @column()
  public clienteId: number // Referencia a cliente

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Empresa, {
    foreignKey: 'persona_natural_id',
  })
  public empresa: HasOne<typeof Empresa>

  @belongsTo(() => Cliente)
  public cliente: BelongsTo<typeof Cliente>
}

