import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'

export default class Empresa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public direccion: string

  @column()
  public telefono: string | null

  @column()
  public correo: string | null

  @column()
  public clienteId: number // Referencia a cliente

  @column()
  public persona_natural_id: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relación con Cliente
  @belongsTo(() => Cliente)
  public cliente: BelongsTo<typeof Cliente>
}