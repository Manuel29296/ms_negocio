import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Factura from 'App/Models/Factura';
import FacturaValidator from 'App/Validators/FacturaValidator';
import axios from 'axios';

export default class FacturasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theFactura: Factura = await Factura.findOrFail(params.id)
            return theFactura;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Factura.query().paginate(page, perPage)
            } else {
                return await Factura.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(FacturaValidator)
        const body = request.body();
        const theFactura: Factura = await Factura.create(body);
                // Prepara los datos del servicio para enviar en el correo
                const emailData = {
                    email: body.email,
                    subject: 'Factura',
                    body: `
                        Detalles de la factura generada: 
            
                        ID: ${theFactura.id}
                        Monto: ${theFactura.monto}
                        Fecha: ${theFactura.fecha}
                        Cuota: ${theFactura.cuota_id}
                        Gasto: ${theFactura.gasto_id}
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
        const theFactura: Factura = await Factura.findOrFail(params.id);
        const body = request.body();
        theFactura.monto = body.monto;
        return await theFactura.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theFactura: Factura = await Factura.findOrFail(params.id);
            response.status(204);
            return await theFactura.delete();
    }

}
