import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehiculo from 'App/Models/Vehiculo';
import Ws from 'App/Services/Ws';
import VehiculoValidator from 'App/Validators/VehiculoValidator';

export default class VehiculosController {
    public async find({ request, params }: HttpContextContract) {
        Ws.io.emit('notifications', { message: 'end process bioinformatic backend' })
        if (params.id) {
            let theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id)
            return theVehiculo;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Vehiculo.query().paginate(page, perPage)
            } else {
                return await Vehiculo.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(VehiculoValidator)
        const body = request.body();
        const theVehiculo: Vehiculo = await Vehiculo.create(body);
        return theVehiculo;
    }

    public async update({ params, request }: HttpContextContract) {
        const theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id);
        const body = request.body();
        theVehiculo.marca = body.marca;
        theVehiculo.tipo_carga = body.tipoCarga;
        theVehiculo.placa = body.placa;
        theVehiculo.capacidad = body.capacidad;
        return await theVehiculo.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id);
            response.status(204);
            return await theVehiculo.delete();
    }
    //Endpoint para notificar a los clientes conectados al socket
    public async notificar({ response }: HttpContextContract) {
        try {
          console.log('Enviando notificación...');
          Ws.io.emit('notifications', { message: 'end process bioinformatic backend' });
          console.log('Notificación enviada correctamente');
          return response.status(200).send({ message: 'ok' });
        } catch (error) {
          console.error('Error al enviar notificación:', error);
          return response.status(500).send({ message: 'Error interno al notificar' });
        }
      }
      
}
