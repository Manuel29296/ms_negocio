import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import PropietarioVehiculo from './PropietarioVehiculo'

export default class Propietario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public telefono : string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

    //Relación de muchos a muchos con la tabla vehículo a través de la tabla propietario_vehiculo
    @hasMany(() => PropietarioVehiculo, {
        foreignKey: 'propietario_id'  
    }) public propietariosVehiculos: HasMany<typeof PropietarioVehiculo>
    
}
