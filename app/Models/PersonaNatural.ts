import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Empresa from './Empresa'

export default class PersonaNatural extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public telefono: string | null

  @column()
  public correo: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Empresa, {
    foreignKey: 'persona_natural_id',
  })
  public empresa: HasOne<typeof Empresa>
}

