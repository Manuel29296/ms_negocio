import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Operacion from "App/Models/Operacion";
import Vehiculo from "App/Models/Vehiculo";
import axios from "axios";
import UserService from "App/Services/User_service";

@inject([UserService])
export default class RestriccionesController {
  constructor(protected userService: UserService) {}

  public async create({ request, response }: HttpContextContract) {
    const { municipio_id, descripcion } = request.body();

    // Paso 1: Obtener las operaciones en el municipio
    const operaciones = await Operacion.query()
      .where("municipio_id", municipio_id)
      .preload("vehiculo", (vehiculoQuery) => {
        vehiculoQuery.preload("propietariosVehiculos", (propietarioVehiculoQuery) => {
          propietarioVehiculoQuery.preload("propietario");
        });
      });

    if (operaciones.length === 0) {
      return response.status(404).send({ message: "No hay vehículos en operación" });
    }

    //Obtener correos únicos de los propietarios
    const correos = new Set<string>();

    for (const operacion of operaciones) {
      const vehiculo = operacion.vehiculo as Vehiculo;

      for (const propietarioVehiculo of vehiculo.propietariosVehiculos) {
        const propietario = propietarioVehiculo.propietario;

        try {
          //UserService para obtener el usuario
          const user = await this.userService.getUserById(propietario.usuario_id);
          if (user && user.data.email) {
            correos.add(user.data.email);
          }
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
        }
      }
    }

    if (correos.size === 0) {
      return response.status(404);
    }

    // Paso 3: Enviar correos a los propietarios
    const emailPromises = Array.from(correos).map(async (email) => {
      const emailData = {
        email,
        subject: "Restricción",
        body: `
          Descripción: ${descripcion}
        `,
      };

      try {
        const emailResponse = await axios.post('http://127.0.0.1:5000/send-email', emailData);
        console.log(`Correo enviado`, emailResponse.data);
      } catch (error) {
        console.error(`Error al enviar correo a ${email}:`, error);
      }
    });

    try {
      await Promise.all(emailPromises);
      return response.status(200).send({ message: "Correos enviados exitosamente." });
    } catch (error) {
      console.error("Error al procesar el envío de correos:", error);
      return response.status(500).send({ message: "Ocurrió un error al enviar los correos." });
    }
  }
}