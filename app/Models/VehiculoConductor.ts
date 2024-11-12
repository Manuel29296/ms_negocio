import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Vehiculo from "./Vehiculo";
import Conductor from "./Conductor";

export default class VehiculoConductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public vehiculo_id: number;

  @column()
  public conductor_id: number;

  @belongsTo(() => Vehiculo, {
    foreignKey: "vehiculo_id",
  }) public Vehiculo: BelongsTo<typeof Vehiculo>;

  @belongsTo(() => Conductor, {
    foreignKey: "conductor_id",
  }) public Conductor: BelongsTo<typeof Conductor>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
