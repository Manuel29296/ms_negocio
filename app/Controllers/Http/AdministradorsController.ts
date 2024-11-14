import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import Administrador from "App/Models/Administrador";
import AdministradorValidator from "App/Validators/AdministradorValidator";
import UserService from "App/Services/User_service";

@inject([UserService])
export default class AdministradorsController {
  constructor(protected userService: UserService) {}

  // Obtener administradores
  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    const administradores: ModelObject[] = [];
    const metaAux: ModelObject[] = [];

    if (params.id) {
      const theAdministrador: Administrador = await Administrador.findOrFail(params.id);
      administradores.push(theAdministrador);
    } else if (page && per_page) {
      const { meta, data } = await Administrador.query()
        .paginate(page, per_page)
        .then((res) => res.toJSON());

      metaAux.push(meta);
      administradores.push(...data);
    } else {
      const allAdministradores = await Administrador.all();
      administradores.push(...allAdministradores);
    }

    await Promise.all(
      administradores.map(async (administrador: Administrador, index: number) => {
        const res = await this.userService.getUserById(administrador.usuario_id);
        const { name, email } = res.data;
        administradores[index] = {
          name,
          email,
          ...administrador.toJSON(),
        };
      }),
    );

    if (metaAux.length > 0) {
      return { meta: metaAux, data: administradores };
    }

    return administradores;
  }

  // Crear nuevo administrador asociado a un usuario existente
  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(AdministradorValidator);

    // Verificar si el usuario existe en el microservicio de seguridad
    let user;
    try {
      user = await this.userService.getUserById(body.usuario_id.toString());
    } catch (error) {
      return response.status(400).send({ message: "User not found" });
    }

    // Crear el administrador asociado al usuario ya existente
    let administradorData: ModelObject = { usuario_id: user.data._id };
    Object.keys(body).forEach(
      (key) => Administrador.$hasColumn(key) && (administradorData[key] = body[key]),
    );

    const theAdministrador: Administrador = await Administrador.create(administradorData);
    return theAdministrador;
  }

  // Actualizar administrador y usuario asociado
  public async update({ params, request, response }: HttpContextContract) {
    const theAdministrador: Administrador = await Administrador.findOrFail(params.id);
    const data = request.body();

    try {
      const user = { name: data.name, email: data.email };
      await this.userService.putUser(theAdministrador.usuario_id, user);
    } catch (error) {
      return response.status(400).send({ message: 'User not found' });
    }

    // Actualizar atributos propios del administrador sin afectar el usuario
    let newAdministrador: ModelObject = {};
    Object.keys(data).forEach(
      (key) => Administrador.$hasColumn(key) && (newAdministrador[key] = data[key]),
    );

    theAdministrador.merge(newAdministrador);
    return await theAdministrador.save();
  }

  // Eliminar administrador
  public async delete({ params, response }: HttpContextContract) {
    const theAdministrador: Administrador = await Administrador.findOrFail(params.id);
    response.status(204);
    return await theAdministrador.delete();
  }
}
