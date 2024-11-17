import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import PersonaNatural from "App/Models/PersonaNatural";
import Cliente from "App/Models/Cliente";
import PersonaNaturalValidator from "App/Validators/PersonaNaturalValidator";
import UserService from "App/Services/User_service";

@inject([UserService])
export default class PersonaNaturalsController {
  constructor(protected userService: UserService) {}

  // Obtener todas las personas naturales (cargando cliente si aplica)
  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    const personasQuery = PersonaNatural.query().preload("cliente"); // Pre-carga la relación 'cliente'

    let personas: ModelObject[] = [];
    const metaAux: ModelObject[] = [];

    if (params.id) {
      const thePersona = await personasQuery.where("id", params.id).firstOrFail();
      personas.push(thePersona);
    } else if (page && per_page) {
      const { meta, data } = await personasQuery.paginate(page, per_page).then((res) => res.toJSON());
      metaAux.push(meta);
      personas.push(...data);
    } else {
      personas = await personasQuery;
    }

    // Obtener la información del usuario para cada PersonaNatural
    await Promise.all(
      personas.map(async (persona: PersonaNatural, index: number) => {
        try {
          const res = await this.userService.getUserById(persona.usuario_id);
          const { name, email } = res.data;
          personas[index] = {
            name,
            email,
            ...persona.toJSON(),
          };
        } catch (error) {
          // En caso de error al obtener el usuario, manejar el error (puedes dejarlo vacío si no quieres notificarlo)
        }
      })
    );

    if (metaAux.length > 0) {
      return { meta: metaAux, data: personas };
    }

    return personas;
  }

  // Crear una nueva PersonaNatural (verificando la existencia del cliente)
  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(PersonaNaturalValidator);

    // Verificar si el usuario existe en el microservicio de seguridad
    let user;
    try {
      user = await this.userService.getUserById(body.usuario_id.toString());
    } catch (error) {
      return response.status(400).send({ message: "User not found" });
    }

    // Verificar la existencia del cliente
    const cliente = await Cliente.find(body.cliente_id);
    if (!cliente) {
      return response.status(400).send({ message: "Cliente no encontrado" });
    }

    // Crear datos de la PersonaNatural
    const personaData: ModelObject = {
      usuario_id: user.data._id,
      cliente_id: body.cliente_id,
    };
    Object.keys(body).forEach(
      (key) => PersonaNatural.$hasColumn(key) && (personaData[key] = body[key])
    );

    const thePersonaNatural = await PersonaNatural.create(personaData);
    return thePersonaNatural;
  }

  // Actualizar una PersonaNatural (verificando cliente)
  public async update({ params, request, response }: HttpContextContract) {
    const thePersona = await PersonaNatural.findOrFail(params.id);
    const data = request.body();

    // Verificar la existencia del cliente si se incluye cliente_id
    if (data.cliente_id) {
      const cliente = await Cliente.find(data.cliente_id);
      if (!cliente) {
        return response.status(400).send({ message: "Cliente no encontrado" });
      }
    }

    try {
      // Actualizar el usuario asociado al conductor
      if (data.name && data.email) {
        const user = { name: data.name, email: data.email };
        await this.userService.putUser(thePersona.usuario_id, user);
      }
    } catch (error) {
      return response.status(400).send({ message: 'User not found or failed to update user' });
    }

    const newPersonaData: ModelObject = {};
    Object.keys(data).forEach(
      (key) => PersonaNatural.$hasColumn(key) && (newPersonaData[key] = data[key])
    );

    thePersona.merge(newPersonaData);
    return await thePersona.save();
  }

  // Eliminar una PersonaNatural
  public async delete({ params, response }: HttpContextContract) {
    const thePersona = await PersonaNatural.findOrFail(params.id);
    response.status(204);
    return await thePersona.delete();
  }
}


