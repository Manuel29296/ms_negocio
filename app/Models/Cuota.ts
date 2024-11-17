import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato'
import Factura from './Factura'

export default class Cuota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Campos adicionales de la migración
  @column()
  public card_number: string // Número de tarjeta

  @column()
  public exp_year: number // Año de expiración de la tarjeta

  @column()
  public exp_month: number // Mes de expiración de la tarjeta

  @column()
  public cvc: string // Código de seguridad

  @column()
  public name: string // Nombre del cliente

  @column()
  public last_name: string // Apellido del cliente

  @column()
  public email: string | null // Email del cliente (puede ser nulo)

  @column()
  public phone: string // Teléfono del cliente

  @column()
  public doc_number: string // Número de documento

  @column()
  public city: string // Ciudad del cliente

  @column()
  public address: string // Dirección del cliente

  @column()
  public cell_phone: string // Celular del cliente

  @column()
  public bill: string // Número de factura o referencia de pago

  @column()
  public value: number // Valor del pago

  @column.dateTime()
  public fechaPago: DateTime | null // Fecha de pago

  @column()
  public contrato_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relaciones
  @belongsTo(() => Contrato, {
    foreignKey: 'contrato_id'
  })
  public contrato: BelongsTo<typeof Contrato>

  @hasOne(() => Factura, {
    foreignKey: 'gasto_id',
  })
  public factura: HasOne<typeof Factura>
}