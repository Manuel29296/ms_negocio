import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'

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
    @manyToMany(() => Vehiculo, {
      pivotTable: "propietario_vehiculo",
      pivotForeignKey: "propietario_id",
      pivotRelatedForeignKey: "vehiculo_id"
    })
    public vehiculos: ManyToMany<typeof Vehiculo>;
}
