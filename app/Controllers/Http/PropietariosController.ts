import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import Propietario from "App/Models/Propietario";
import PropietarioValidator from "App/Validators/PropietarioValidator";
import UserService from "App/Services/User_service";

@inject([UserService])
export default class PropietariosController {
  constructor(protected userService: UserService) {}

  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    const propietarios: ModelObject[] = [];
    const metaAux: ModelObject[] = [];

    if (params.id) {
      const thePropietario: Propietario = await Propietario.findOrFail(params.id);
      propietarios.push(thePropietario);
    } else if (page && per_page) {
      const { meta, data } = await Propietario.query()
        .paginate(page, per_page)
        .then((res) => res.toJSON());

      metaAux.push(meta);
      propietarios.push(...data);
    } else {
      const allPropietarios = await Propietario.all();
      propietarios.push(...allPropietarios);
    }

    await Promise.all(
      propietarios.map(async (propietario: Propietario, index: number) => {
        const res = await this.userService.getUserById(propietario.usuario_id);
        const { name, email } = res.data;
        propietarios[index] = {
          name,
          email,
          ...propietario.toJSON(),
        };
      }),
    );

    if (metaAux.length > 0) {
      return { meta: metaAux, data: propietarios };
    }

    return propietarios;
  }

  public async create({ request, response }: HttpContextContract) {
    // Validar los datos del propietario
    const body = await request.validate(PropietarioValidator);

    // Verificar si el usuario ya existe en el microservicio de seguridad
    let user;
    try {
      // Se intenta obtener el usuario usando el usuario_id proporcionado
      user = await this.userService.getUserById(body.usuario_id.toString());
    } catch (error) {
      return response.status(400).send({ message: "User not found" });
    }

    // Si el usuario no existe, no crear un nuevo usuario
    // Se crea el propietario asociando el usuario ya existente
    let propietarioData: ModelObject = { usuario_id: user.data._id };

    // Asignar otros atributos del propietario, asegurando solo usar columnas de Propietario
    Object.keys(body).forEach(
      (key) => Propietario.$hasColumn(key) && (propietarioData[key] = body[key]),
    );

    // Crear el propietario en el microservicio de negocio
    const thePropietario: Propietario = await Propietario.create(propietarioData);
    return thePropietario;
  }

  public async update({ params, request, response }: HttpContextContract) {
    const thePropietario: Propietario = await Propietario.findOrFail(params.id);
    const data = request.body();

    try {
      const user = { name: data.name, email: data.email };
      await this.userService.putUser(thePropietario.usuario_id, user);
    } catch (error) {
      return response.status(400).send({ message: "User not found" });
    }

    // Actualizar atributos propios del propietario sin afectar el usuario
    let newPropietario: ModelObject = {};
    Object.keys(data).forEach(
      (key) => Propietario.$hasColumn(key) && (newPropietario[key] = data[key]),
    );

    thePropietario.merge(newPropietario);
    return await thePropietario.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const thePropietario: Propietario = await Propietario.findOrFail(params.id);
    response.status(204);
    return await thePropietario.delete();
  }
}
