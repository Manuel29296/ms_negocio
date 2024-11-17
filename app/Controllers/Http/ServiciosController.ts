import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Servicio from 'App/Models/Servicio';
import ServicioValidator from 'App/Validators/ServicioValidator';
import axios from 'axios';

export default class ServiciosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theServicio: Servicio = await Servicio.findOrFail(params.id)
            return theServicio;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                let servicios:Servicio[] = await Servicio.query().preload('administrador').paginate(page, perPage)
                return servicios;
            } else {
                return await Servicio.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(ServicioValidator);
        const body = request.body();
        const theServicio: Servicio = await Servicio.create(body);
    
        // Prepara los datos del servicio para enviar en el correo
        const emailData = {
            email: body.email,
            subject: 'Servicio asignado',
            body: `
                Detalles del servicio asignado:
    
                ID: ${theServicio.id}
                Descripción: ${theServicio.descripcion}
                Precio: ${theServicio.precio}
                Tipo: ${theServicio.tipo}
                Fecha: ${theServicio.fecha}
            `
        };
    
        try {
            const emailResponse = await axios.post(' http://127.0.0.1:5000/send-email', emailData);
    
            if (emailResponse.status === 200) {
                console.log('Email sent');
            } else {
                console.log('Email not sent');
            }
        } catch (error) {
            console.error(error);
        }
    }


    public async update({ params, request }: HttpContextContract) {
        const theServicio: Servicio = await Servicio.findOrFail(params.id);
        const body = request.body();
        theServicio.descripcion = body.descripcion;
        theServicio.precio = body.precio;
        theServicio.tipo = body.tipo;
        theServicio.fecha = body.fecha;
        return await theServicio.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theServicio: Servicio = await Servicio.findOrFail(params.id);
            response.status(204);
            return await theServicio.delete();
    }


}
