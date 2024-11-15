import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import PropietarioVehiculo from './PropietarioVehiculo'
import Gasto from './Gasto'
import Conductor from './Conductor'


export default class Propietario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public usuario_id: string
  
  @column()
  public telefono : string

  @column()
  public conductorId: number // Referencia a cliente

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relación de muchos a muchos con la tabla vehículo a través de la tabla propietario_vehiculo
  @hasMany(() => PropietarioVehiculo, {
    foreignKey: 'propietario_id'  
  }) public propietariosVehiculos: HasMany<typeof PropietarioVehiculo>

  @hasMany(() => Gasto, {
    foreignKey: 'propietario_id'
  }) public gastos: HasMany<typeof Gasto>

  @belongsTo(() => Conductor)
  public conductor: BelongsTo<typeof Conductor>
    
}
