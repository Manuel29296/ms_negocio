import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import PersonaNatural from "App/Models/PersonaNatural";
import PersonaNaturalValidator from "App/Validators/PersonaNaturalValidator";
import UserService from "App/Services/User_service";

@inject([UserService])
export default class PersonaNaturalsController {
  constructor(protected userService: UserService) {}

  // Método para obtener personas naturales (por id, paginadas o todas)
  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    const personas: ModelObject[] = [];
    const metaAux: ModelObject[] = [];

    if (params.id) {
      const thePersona: PersonaNatural = await PersonaNatural.findOrFail(params.id);
      personas.push(thePersona);
    } else if (page && per_page) {
      const { meta, data } = await PersonaNatural.query()
        .paginate(page, per_page)
        .then((res) => res.toJSON());

      metaAux.push(meta);
      personas.push(...data);
    } else {
      const allPersonas = await PersonaNatural.all();
      personas.push(...allPersonas);
    }

    await Promise.all(
      personas.map(async (persona: PersonaNatural, index: number) => {
        const res = await this.userService.getUserById(persona.usuario_id);
        const { name, email } = res.data;
        personas[index] = {
          name,
          email,
          ...persona.toJSON(),
        };
      })
    );

    if (metaAux.length > 0) {
      return { meta: metaAux, data: personas };
    }

    return personas;
  }

  // Método para crear una nueva PersonaNatural
  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(PersonaNaturalValidator);

    // Verificar si el usuario existe en el microservicio de seguridad
    let user;
    try {
      user = await this.userService.getUserById(body.usuario_id.toString());
    } catch (error) {
      return response.status(400).send({ message: "User not found" });
    }

    // Crear datos de la persona natural
    let personaData: ModelObject = { usuario_id: user.data._id };
    Object.keys(body).forEach(
      (key) => PersonaNatural.$hasColumn(key) && (personaData[key] = body[key])
    );

    // Crear la PersonaNatural en la base de datos
    const thePersonaNatural: PersonaNatural = await PersonaNatural.create(personaData);
    return thePersonaNatural;
  }

  // Método para actualizar una PersonaNatural
  public async update({ params, request, response }: HttpContextContract) {
    const thePersona: PersonaNatural = await PersonaNatural.findOrFail(params.id);
    const data = request.body();

    try {
      const user = { name: data.name, email: data.email };
      await this.userService.putUser(thePersona.usuario_id, user);
    } catch (error) {
      return response.status(400).send({ message: "User not found" });
    }

    let newPersonaData: ModelObject = {};
    Object.keys(data).forEach(
      (key) => PersonaNatural.$hasColumn(key) && (newPersonaData[key] = data[key])
    );

    thePersona.merge(newPersonaData);
    return await thePersona.save();
  }

  // Método para eliminar una PersonaNatural
  public async delete({ params, response }: HttpContextContract) {
    const thePersona: PersonaNatural = await PersonaNatural.findOrFail(params.id);
    response.status(204);
    return await thePersona.delete();
  }
}
