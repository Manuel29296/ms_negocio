import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import Conductor from "App/Models/Conductor";
import ConductorValidator from "App/Validators/ConductorValidator";
import UserService from "App/Services/User_service";

@inject([UserService])
export default class ConductorsController {
  constructor(protected userService: UserService) {}

  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    const conductors: ModelObject[] = [];
    const metaAux: ModelObject[] = [];

    if (params.id) {
      const theConductor: Conductor = await Conductor.findOrFail(params.id);
      conductors.push(theConductor);
    } else if (page && per_page) {
      const { meta, data } = await Conductor.query()
        .paginate(page, per_page)
        .then((res) => res.toJSON());

      metaAux.push(meta);
      conductors.push(...data);
    } else {
      const allConductors = await Conductor.all();
      conductors.push(...allConductors);
    }

    await Promise.all(
      conductors.map(async (conductor: Conductor, index: number) => {
        const res = await this.userService.getUserById(conductor.usuario_id);
        const { name, email } = res.data;
        conductors[index] = {
          name,
          email,
          ...conductor.toJSON(),
        };
      }),
    );

    if (metaAux.length > 0) {
      return { meta: metaAux, data: conductors };
    }

    return conductors;
  }

  public async create({ request, response }: HttpContextContract) {
    // Validar los datos del conductor
    const body = await request.validate(ConductorValidator);

    // Verificar si el usuario ya existe en el microservicio de seguridad
    let user;
    try {
      // Se intenta obtener el usuario usando el usuario_id proporcionado
      user = await this.userService.getUserById(body.usuario_id.toString());
    } catch (error) {
      return response.status(400).send({ message: "User not found" });
    }

    // Si el usuario no existe, no crear un nuevo usuario
    // Se crea el conductor asociando el usuario ya existente
    let conductorData: ModelObject = { usuario_id: user.data._id };

    // Asignar otros atributos del conductor, asegurando solo usar columnas de Conductor
    Object.keys(body).forEach(
      (key) => Conductor.$hasColumn(key) && (conductorData[key] = body[key]),
    );

    // Crear el conductor en el microservicio de negocio
    const theConductor: Conductor = await Conductor.create(conductorData);
    return theConductor;
  }

  public async update({ params, request, response }: HttpContextContract) {
    const theConductor: Conductor = await Conductor.findOrFail(params.id);
    const data = request.body();

    try {
      const user = { name: data.name, email: data.email };
      await this.userService.putUser(theConductor.usuario_id, user);
    } catch (error) {
      return response.status(400).send({ message: 'User not found' });
    }

    // Actualizar atributos propios del conductor sin afectar el usuario
    let newConductor: ModelObject = {};
    Object.keys(data).forEach(
      (key) => Conductor.$hasColumn(key) && (newConductor[key] = data[key]),
    );

    theConductor.merge(newConductor);
    return await theConductor.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theConductor: Conductor = await Conductor.findOrFail(params.id);
    response.status(204);
    return await theConductor.delete();
  }
}
