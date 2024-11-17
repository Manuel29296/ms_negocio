import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota'
import CuotaValidator from 'App/Validators/CuotaValidator'
import axios from 'axios';

export default class CuotasController {
  // Crear una nueva cuota
  public async store({ request, response }: HttpContextContract) {
    await request.validate(CuotaValidator);

    // Crear la cuota en la base de datos
    const body = request.body();
    const theCuota = await Cuota.create(body);

    // Preparar datos para el pago
    const paymentData = {
      card_number: body.card_number,
      exp_year: body.exp_year,
      exp_month: body.exp_month,
      cvc: body.cvc,
      name: body.name,
      last_name: body.last_name,
      email: body.email,
      phone: body.phone,
      doc_number: body.doc_number,
      city: body.city,
      address: body.address,
      cell_phone: body.cell_phone,
      bill: `Cuota-${theCuota.id}`, // Identificador único para el pago
      value: body.value,
    };

    try {
      // Enviar solicitud al microservicio de pagos
      const paymentResponse = await axios.post(
        'http://127.0.0.1:5001/payment',
        paymentData
      );

      // Manejar la respuesta del microservicio de pagos
      if (paymentResponse.status === 200) {
        await theCuota.save();
        return response.status(201).json({
          message: 'Cuota creada y pago procesado exitosamente',
          cuota: theCuota,
          payment: paymentResponse.data,
        });
      } else {
        // El pago falló

        await theCuota.save();
        return response.status(500).json({
          message: 'Cuota creada, pero el pago falló',
          cuota: theCuota,
          payment: paymentResponse.data,
        });
      }
    } catch (error) {
      // Manejar errores del microservicio de pagos
      return response.status(500).json({
        message: 'Error al procesar el pago',
        error: {
          message: error.message,
          stack: error.stack,
          response: error.response ? error.response.data : null, // Muestra la respuesta completa si está disponible
        },
      });
    }    
  }

  // Obtener todas las cuotas
  public async index({ response }: HttpContextContract) {
    // Obtener todas las cuotas, con las relaciones de contrato y factura
    const cuotas = await Cuota.query().preload('contrato').preload('factura')
    return response.send(cuotas)
  }

  // Obtener una cuota por su ID
  public async show({ params, response }: HttpContextContract) {
    const cuota = await Cuota.query()
      .where('id', params.id)
      .preload('contrato')
      .preload('factura')
      .first()

    // Si no se encuentra la cuota, devolver un error
    if (!cuota) {
      return response.status(404).send({ message: 'Cuota no encontrada' })
    }

    return response.send(cuota)
  }

  // Actualizar una cuota
  public async update({ params, request, response }: HttpContextContract) {
    // Buscar la cuota por ID
    const cuota = await Cuota.find(params.id)

    // Si no se encuentra la cuota, devolver un error
    if (!cuota) {
      return response.status(404).send({ message: 'Cuota no encontrada' })
    }

    // Validar los datos de la cuota a actualizar
    const payload = await request.validate(CuotaValidator)

    // Actualizar los datos de la cuota
    cuota.merge(payload)
    await cuota.save()

    return response.send(cuota)
  }

  // Eliminar una cuota
  public async destroy({ params, response }: HttpContextContract) {
    // Buscar la cuota por ID
    const cuota = await Cuota.find(params.id)

    // Si no se encuentra la cuota, devolver un error
    if (!cuota) {
      return response.status(404).send({ message: 'Cuota no encontrada' })
    }

    // Eliminar la cuota
    await cuota.delete()

    return response.status(204).send({})
  }
}

