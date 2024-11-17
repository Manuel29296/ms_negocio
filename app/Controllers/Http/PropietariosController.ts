import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import Propietario from "App/Models/Propietario";
import Conductor from "App/Models/Conductor";
import PropietarioValidator from "App/Validators/PropietarioValidator";
import UserService from "App/Services/User_service";

@inject([UserService])
export default class PropietariosController {
  constructor(protected userService: UserService) {}

  // Obtener todos los propietarios (cargando conductor si aplica)
  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    const propietariosQuery = Propietario.query().preload("conductor"); // Pre-carga la relación 'conductor'

    if (params.id) {
      const thePropietario = await propietariosQuery.where("id", params.id).firstOrFail();
      return thePropietario;
    }

    if (page && per_page) {
      const paginatedData = await propietariosQuery.paginate(page, per_page);
      return paginatedData.toJSON();
    }

    const allPropietarios = await propietariosQuery;
    return allPropietarios;
  }

  // Crear un nuevo Propietario (verificando la existencia del conductor)
  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(PropietarioValidator);

    // Verificar si el usuario existe en el microservicio de seguridad
    let user;
    try {
      user = await this.userService.getUserById(body.usuario_id.toString());
    } catch (error) {
      return response.status(400).send({ message: "User not found" });
    }

    // Verificar la existencia del conductor
    const conductor = await Conductor.find(body.conductor_id);
    if (!conductor) {
      return response.status(400).send({ message: "Conductor no encontrado" });
    }

    // Crear datos del Propietario
    const propietarioData: ModelObject = {
      usuario_id: user.data._id,
      conductorId: body.conductor_id,
    };
    Object.keys(body).forEach(
      (key) => Propietario.$hasColumn(key) && (propietarioData[key] = body[key])
    );

    const thePropietario = await Propietario.create(propietarioData);
    return thePropietario;
  }

  // Actualizar un Propietario (verificando conductor)
  public async update({ params, request, response }: HttpContextContract) {
    const thePropietario = await Propietario.findOrFail(params.id);
    const data = request.body();

    // Verificar la existencia del conductor si se incluye conductorId
    if (data.conductorId) {
      const conductor = await Conductor.find(data.conductorId);
      if (!conductor) {
        return response.status(400).send({ message: "Conductor no encontrado" });
      }
    }

    try {
      // Actualizar el usuario asociado al conductor
      if (data.name && data.email) {
        const user = { name: data.name, email: data.email };
        await this.userService.putUser(thePropietario.usuario_id, user);
      }
    } catch (error) {
      return response.status(400).send({ message: 'User not found or failed to update user' });
    }

    const newPropietarioData: ModelObject = {};
    Object.keys(data).forEach(
      (key) => Propietario.$hasColumn(key) && (newPropietarioData[key] = data[key])
    );

    thePropietario.merge(newPropietarioData);
    return await thePropietario.save();
  }

  // Eliminar un Propietario
  public async delete({ params, response }: HttpContextContract) {
    const thePropietario = await Propietario.findOrFail(params.id);
    response.status(204);
    return await thePropietario.delete();
  }
}


