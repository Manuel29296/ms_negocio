import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany} from "@ioc:Adonis/Lucid/Orm";
import Seguro from "./Seguro";
import PropietarioVehiculo from "./PropietarioVehiculo";
import VehiculoConductor from "./VehiculoConductor";
import Operacion from "./Operacion";

export default class Vehiculo extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public marca: string;

  @column()
  public placa: string;

  @column()
  public tipo_carga: string;

  @column()
  public capacidad: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  //Relación de muchos a muchos 
  @hasMany(() => PropietarioVehiculo, {
    foreignKey: "vehiculo_id",
  }) public propietariosVehiculos: HasMany<typeof PropietarioVehiculo>;

  @hasMany(() => VehiculoConductor, {
    foreignKey: "vehiculo_id",
  }) public vehiculosConductores: HasMany<typeof VehiculoConductor>;

  @hasMany(() => Operacion, {
    foreignKey: "vehiculo_id",
  }) public operaciones: HasMany<typeof Operacion>;
}
